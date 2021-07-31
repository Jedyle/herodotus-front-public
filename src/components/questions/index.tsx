import { useState } from 'react';
import { IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonText, IonButton } from '@ionic/react';
import MultipleChoiceQuestion from './types/multipleChoice';
import NumberQuestion from './types/number';
import TextQuestion from './types/text';

import { QuestionProps } from './props';

const questionTypesMapping : any = {
  choice: {
    bodyComponent: MultipleChoiceQuestion,
  },
  number: {
    bodyComponent: NumberQuestion,
  },
  text: {
    bodyComponent: TextQuestion
  }
}
const Question: React.FC<QuestionProps> = ({question}) => {

  const [userAnswer, setUserAnswer] = useState<any>(null);
  const [isValidated, setIsValidated] = useState<boolean>(false);

  const BodyComponent = questionTypesMapping[question.answer_type].bodyComponent;
  
  return (
    <IonCard>
      <img src={question.photo} />
      <IonCardHeader>
	<IonCardTitle>
	  {question.question}
	</IonCardTitle>
      </IonCardHeader>
      <IonCardContent>
	<BodyComponent
	question={question}
	userAnswer={userAnswer}
	setUserAnswer={setUserAnswer}
	isValidated={isValidated}
	/>

	{isValidated && (
	  <p className="ion-text-center">
	    <div dangerouslySetInnerHTML={{__html: question.answer_details}}></div>
	    <br/>
	  </p>
	)}
	
	{!isValidated ? (
	  userAnswer !== null ?
	  (
	    <IonButton
	      expand="block"
	      color="secondary"
	      onClick={() => {if (userAnswer !== null){setIsValidated(true)}}}
	    >VALIDATE</IonButton>
	  ) : ""
	) : <IonButton color="light" expand="block">Next</IonButton>
	}	
      </IonCardContent>
    </IonCard>
  );
}

export default Question;
