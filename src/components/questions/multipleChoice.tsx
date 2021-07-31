import { useState } from 'react';
import { QuestionBodyProps} from './props';
import { IonList, IonItem, IonLabel } from '@ionic/react';

const isChoiceCorrect = (answer : number, expectedAnswer : any) => (answer === parseInt(expectedAnswer))

const MultipleChoiceQuestion: React.FC<QuestionBodyProps> = ({question, userAnswer, setUserAnswer, isValidated}) => {

  return (
    <IonList>
      {question.answer_choices.map((choice: string, index: number) => (
	<IonItem
	  button={!isValidated}
	  onClick={() => {if (!isValidated){setUserAnswer(index);}}}
	  color={isValidated ? (
	    isChoiceCorrect(index, question.answer) ? "success"
	    : isChoiceCorrect(index, userAnswer) && !isChoiceCorrect(userAnswer, question.answer) ? "danger"
	    : ""
	  ) : isChoiceCorrect(userAnswer, index) ? "medium" : ""}
	>
	  <IonLabel>
	    {choice}
	  </IonLabel>
	</IonItem>
      ))}
    </IonList>
  );
}

export { isChoiceCorrect };
export default MultipleChoiceQuestion;
