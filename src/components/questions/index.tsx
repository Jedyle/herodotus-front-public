import { useState } from 'react';
import { IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonText, IonButton } from '@ionic/react';
import MultipleChoiceQuestion, {isChoiceCorrect} from './multipleChoice';

import { QuestionProps, QuestionBodyProps } from './props';

const questionTypesMapping : any = {
  choice: {
    bodyComponent: MultipleChoiceQuestion,
    isCorrectFunction: isChoiceCorrect
  }
}
const Question: React.FC<QuestionProps> = ({question}) => {

  const [userAnswer, setUserAnswer] = useState<any>(null);
  const [isValidated, setIsValidated] = useState<boolean>(false);

  const BodyComponent = questionTypesMapping[question.answer_type].bodyComponent;
  const isCorrect = questionTypesMapping[question.answer_type].isCorrectFunction;
  
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
	{isValidated ? (
	  isCorrect(userAnswer, question.answer) ? <p><IonText color="success">Correct !</IonText></p> : <p><IonText color="danger">Incorrect !</IonText></p>
	) : ""}	
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
