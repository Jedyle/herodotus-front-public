import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useIonViewWillEnter } from '@ionic/react';
import { retrieveLesson } from 'services/api';
import { LessonInterface } from 'interfaces/lessons';

import Page from 'pages/Page';
import LessonDisplay from 'components/lessonDisplay';

const Lesson: React.FC = () => {

    const obj: { programSlug: string, lessonSlug: string } = useParams();
    const lessonSlug = obj['lessonSlug'];
    const programSlug = obj['programSlug'];

    const [lesson, setLesson] = useState<LessonInterface | null>(null);

    useIonViewWillEnter(() => {
        retrieveLesson(programSlug, lessonSlug).then((response: any) => {
            setLesson(response.data)
        }).catch(() => { })
    })

    return (
        <Page
            key={"lesson" + lessonSlug}
            name={lesson?.name}
            content={
                lesson && <LessonDisplay lesson={lesson} />
            }
        />
    )
}

export default Lesson;

