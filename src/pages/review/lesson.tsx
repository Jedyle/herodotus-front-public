import { useState } from 'react';

import { useIonViewWillEnter, useIonAlert, IonPage } from '@ionic/react';

import { useParams, useHistory } from 'react-router-dom';

import { retrieveLesson, getQuestions, validateLesson } from 'services/api';

import ReviewSession from 'components/reviewSession'
import { LessonInterface } from 'interfaces/lessons';

const ReviewLesson: React.FC = () => {

    const obj: { programSlug: string, lessonSlug: string } = useParams();
    const lessonSlug = obj['lessonSlug'];
    const programSlug = obj['programSlug'];
    const [lesson, setLesson] = useState<LessonInterface | null>(null);
    const [questions, setQuestions] = useState([]);
    const [present] = useIonAlert();
    const history = useHistory();

    useIonViewWillEnter(() => {
        getQuestions(programSlug, lessonSlug).then((response: any) => {
            setQuestions(response.data);
        }).catch(() => { })
        retrieveLesson(programSlug, lessonSlug).then((response: any) => {
            setLesson(response.data);
        }).catch(() => { })
    })

    const onReviewIsOver = () => {
        validateLesson(lesson.slug).then(() => {
            present({
                message: "You have successfully validated this lesson!",
                buttons: [
                    { text: "Continue", handler: () => history.replace("/page/explore") }
                ]
            })
        }).catch(() => { })
    }

    return (
        <IonPage>
            {questions.length > 0 ? (
                <ReviewSession
                    questions={questions}
                    onReviewIsOver={onReviewIsOver}
                />
            ) : <div>You have nothing to review yet. Start <a href="/">exploring </a> !</div>
            }
        </IonPage>
    );
}

export default ReviewLesson;
