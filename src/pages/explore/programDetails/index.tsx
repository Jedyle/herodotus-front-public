import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useIonViewWillEnter, IonList, IonItem, IonLabel, IonIcon } from '@ionic/react';

import { checkmarkOutline, checkmarkSharp } from 'ionicons/icons';

import { getLessons, retrieveCategory, retrieveProgram } from 'services/api';
import { displayLessonLink } from 'services/links';

import Page from 'pages/Page';

interface LessonInterface {
  id: number,
  name: string,
  slug: string,
}

interface UserProgramInterface {
  user: string,
  lessons_done: Array<LessonInterface>,
  lessons_available: Array<LessonInterface>
}

interface ProgramInterface {
  name: string,
  slug: string,
  description: string,
  lessons: Array<LessonInterface>
  user_program: UserProgramInterface|null
}

interface ProgramExplorerProps {
  program: ProgramInterface
}


const userHasValidatedLesson = (user_program: UserProgramInterface, lesson: LessonInterface) => {
  return user_program && (user_program.lessons_done.map((lesson: LessonInterface) => lesson.id).includes(lesson.id))
}

const userHasAccessToLesson = (user_program: UserProgramInterface, lesson: LessonInterface, index: number) => {
  return user_program ? (user_program.lessons_available.map((lesson: LessonInterface) => lesson.id).includes(lesson.id)) : index === 0;
}

const ProgramExplorer: React.FC<ProgramExplorerProps> = ({program}) => {
  return program && (
    <IonList>
      {program.lessons.map((lesson: LessonInterface, index: number) => (
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
	<ProgramExplorer program={program} />
      }
    />
  )
}

export default DisplayProgram;

