import { useState } from 'react';
import { QuestionBodyProps} from '../props';
import { IonList, IonItem, IonLabel, IonText } from '@ionic/react';

const isChoiceCorrect = (answer : number, expectedAnswer : any) => (answer === parseInt(expectedAnswer))

const MultipleChoiceQuestion: React.FC<QuestionBodyProps> = ({question, userAnswer, setUserAnswer, isValidated}) => {

  const realAnswer: string = question.answer_choices[parseInt(question.answer)]
  
  return (
    <IonList>
      {question.answer_choices.map((choice: string, index: number) => (
	<IonItem
	  key={index}
	  button={!isValidated}
	  onClick={() => {if (!isValidated){setUserAnswer(index);}}}
	  color={isValidated ? (
	    isChoiceCorrect(index, question.answer) ? "success"
	    : isChoiceCorrect(index, userAnswer) && !isChoiceCorrect(userAnswer, question.answer) ? "danger"
	    : ""
	  ) : isChoiceCorrect(userAnswer, index) ? "medium" : ""}
	>
	  <IonLabel className="ion-text-wrap">
	    {choice}
	  </IonLabel>
	</IonItem>
      ))}
    {isValidated ? (
      isChoiceCorrect(userAnswer, question.answer) ? <p className="ion-text-center"><IonText color="success">Correct !</IonText></p> : <p className="ion-text-center"><IonText color="danger">Correct answer was {realAnswer} !</IonText></p>
    ) : ""}	    
    </IonList>
  );
}

export { isChoiceCorrect };
export default MultipleChoiceQuestion;
