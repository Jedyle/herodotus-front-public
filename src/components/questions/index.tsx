import { useState } from 'react';
import { IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonButton } from '@ionic/react';
import MultipleChoiceQuestion, { isChoiceCorrect } from './types/multipleChoice';
import NumberQuestion, { isNumberCorrect } from './types/number';
import TextQuestion, {isTextCorrect } from './types/text';

import { QuestionProps } from './props';

const questionTypesMapping : any = {
  choice: {
    bodyComponent: MultipleChoiceQuestion,
    isCorrectFunction: isChoiceCorrect
  },
  number: {
    bodyComponent: NumberQuestion,
    isCorrectFunction: isNumberCorrect
  },
  text: {
    bodyComponent: TextQuestion,
    isCorrectFunction: isTextCorrect
  }
}
const Question: React.FC<QuestionProps> = ({question, onTriggerNextButton}) => {

  const [userAnswer, setUserAnswer] = useState<any>(null);
  const [isValidated, setIsValidated] = useState<boolean>(false);

  const BodyComponent = questionTypesMapping[question.answer_type].bodyComponent;
  const isCorrectFunction = questionTypesMapping[question.answer_type].isCorrectFunction;
  
  return (
    <IonCard style={{'display': 'flex', 'flexFlow': 'column', "height": 'calc(100% - 44px)'}}>
      <div
	style={{
	  "flex": "1 1 auto",
	  "background": `url(${question.photo}) no-repeat center center fixed`,
	  "backgroundSize": "cover"
	}}	
      >
      </div>
      <div style={{"flex": "0 0 auto"}}>
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
	    <IonButton
	      expand="block"
	      color="secondary"
	      disabled={userAnswer === null}
	      onClick={() => {if (userAnswer !== null){setIsValidated(true)}}}
	    >VALIDATE</IonButton>
	  ) : <IonButton
		color="light"
		expand="block"
		onClick={() => {onTriggerNextButton && onTriggerNextButton(isCorrectFunction(userAnswer, question.answer)) }}
	      >Next</IonButton>
	  }	
	</IonCardContent>
      </div>
    </IonCard>
  );
}

export default Question;
