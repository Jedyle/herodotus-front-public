import { useState } from 'react';

import { useIonViewWillEnter, useIonViewDidLeave, useIonAlert, IonPage } from '@ionic/react';

import {  useHistory } from 'react-router-dom';

import { getNewReviewSession, validateRevision } from 'services/api';

import ReviewSession from 'components/reviewSession';

const ReviewNewSession: React.FC = () => {

  const [questions, setQuestions] = useState([]);
  const [present] = useIonAlert();
  const history = useHistory();
  
  useIonViewWillEnter(() => {
    getNewReviewSession().then((response: any) => {
      setQuestions(response.data);
    }).catch(() => {})
  })

  useIonViewDidLeave(() => {
    setQuestions([]);
  })

  const onReviewIsOver = () => {
    present({
      message: "You have successfully completed this session!",
      buttons: [
	{text: "Continue", handler: () => history.replace("/page/explore")}
      ]
    })
  }

  const onQuestionIsValidated = (questionId: number, firstAnswerWasCorrect: boolean) => {
    validateRevision(questionId, firstAnswerWasCorrect);
  }
  
  return (
    <IonPage>
      {questions.length > 0 ? (
	<ReviewSession
	  questions={questions}
	  onReviewIsOver={onReviewIsOver}
	  onQuestionIsValidated={onQuestionIsValidated}
	/>
      ): <div>You have nothing to review yet. Start <a href="/">exploring</a> !</div>
      }
    </IonPage>
  );
}

export default ReviewNewSession;
