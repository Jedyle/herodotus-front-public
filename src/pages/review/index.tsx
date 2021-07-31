import { useState } from 'react';

import { useIonViewWillEnter, useIonAlert, IonButtons, IonContent, IonHeader, IonMenuButton, IonBackButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';

import { useParams, useHistory } from 'react-router-dom';

import { retrieveLesson, getQuestions, validateLesson } from '../../services/api';

import ReviewSession from '../../components/reviewSession';

interface LessonParams {
  periodSlug: string;
  categorySlug: string;
  lessonSlug: string;
}

const ReviewLesson: React.FC<any> = () => {

  const {periodSlug, categorySlug, lessonSlug} = useParams<LessonParams>();
  const [lesson, setLesson] = useState({name: null, article: "", slug: ""});
  const [questions, setQuestions] = useState([]);
  const [present] = useIonAlert();
  const history = useHistory();
  
  useIonViewWillEnter(() => {
    getQuestions(periodSlug, categorySlug, lessonSlug).then((response: any) => {
      setQuestions(response.data);
    })
    retrieveLesson(periodSlug, categorySlug, lessonSlug).then((response: any) => {
      setLesson(response.data);
    })
  })

  const onReviewIsOver = () => {
    validateLesson(lesson.slug).then(() => {
      present({
	message: "You have successfully validated this lesson!",
	buttons: [
	  {text: "Continue", handler: (d) => history.push("/page/explore")}
	]
      })
    })
  }
  
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>{lesson.name}</IonTitle>
	  <IonButtons slot="end">
	    <IonBackButton />
          </IonButtons>
        </IonToolbar>
      </IonHeader>            
      <IonContent fullscreen>
	{questions.length > 0 &&
	 (
	   <ReviewSession
	     questions={questions}
	     onReviewIsOver={onReviewIsOver}
	   />
	 )
	}
      </IonContent>
    </IonPage>
  );
}

export default ReviewLesson;
