import { useState } from 'react';

import { useIonViewWillEnter, useIonAlert, IonButtons, IonContent, IonHeader, IonMenuButton, IonBackButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';

import { useParams, useHistory } from 'react-router-dom';

import { getNewReviewSession, validateSession } from '../../services/api';

import ReviewSession from '../../components/reviewSession';

const ReviewNewSession: React.FC = () => {

  const [questions, setQuestions] = useState([]);
  const [present] = useIonAlert();
  const history = useHistory();
  
  useIonViewWillEnter(() => {
    console.log("ENTER")
    getNewReviewSession().then((response: any) => {
      setQuestions(response.data);
    })
  })

  const onReviewIsOver = () => {
    validateSession(questions.map((question) => (question.id))).then(() => {
      present({
	message: "You have successfully completed this session!",
	buttons: [
	  {text: "Continue", handler: () => history.replace("/page/explore")}
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
          <IonTitle>Review Time !</IonTitle>
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

export default ReviewNewSession;
