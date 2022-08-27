import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useIonViewWillEnter, IonList, IonItem, IonLabel, IonIcon } from '@ionic/react';

import { checkmarkOutline, checkmarkSharp } from 'ionicons/icons';

import { getAuthData } from 'services/auth';
import { retrieveProgram } from 'services/api';
import { displayLessonLink } from 'services/links';
import { ShortLessonInterface, UserProgramInterface, ProgramInterface } from 'interfaces/lessons';

import Page from 'pages/Page';

interface LessonsExplorerProps {
  program: ProgramInterface
}


const userHasValidatedLesson = (user_program: UserProgramInterface, lesson: ShortLessonInterface) => {
  return user_program && (user_program.lessons_done.map((lesson: ShortLessonInterface) => lesson.id).includes(lesson.id))
}

const userHasAccessToLesson = (user_program: UserProgramInterface, lesson: ShortLessonInterface, index: number) => {
  return user_program ? (user_program.lessons_available.map((lesson: ShortLessonInterface) => lesson.id).includes(lesson.id)) : index === 0;
}

const LessonsExplorer: React.FC<LessonsExplorerProps> = ({program}) => {
  return program && (
    <IonList>
      {program.lessons.map((lesson: ShortLessonInterface, index: number) => (
	<IonItem
	  disabled={!userHasAccessToLesson(program.user_program, lesson, index)}
	  routerLink={displayLessonLink(program.slug, lesson.slug)} key={lesson.slug}>
	  <IonIcon
	    slot="start"
	    ios={userHasValidatedLesson(program.user_program, lesson) ? checkmarkOutline : null}
	    md={userHasValidatedLesson(program.user_program, lesson) ? checkmarkSharp : null}
	  />
	  <IonLabel>{lesson.name}</IonLabel>
	</IonItem>
      ))}
    </IonList>
  )
}

const DisplayProgram: React.FC =  () => {
 
  const obj: {programSlug: string} = useParams();
  const programSlug = obj['programSlug'];

  const [program, setProgram] = useState<ProgramInterface|null>(null);
  
  useIonViewWillEnter(() => {
    retrieveProgram(programSlug).then((response: any) => {
      setProgram(response.data);
    }).catch(() => {})    
  })
  
  return (
    <Page
      name={program?.name}
      content={
	<LessonsExplorer program={program} />
      }
    />
  )
}

export default DisplayProgram;

