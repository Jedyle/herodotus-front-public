import { useRef, useEffect } from 'react';

import { QuestionBodyProps} from '../props';
import { IonList, IonItem, IonInput, IonIcon, IonText } from '@ionic/react';

import { chevronDownCircleOutline, closeCircleOutline } from 'ionicons/icons';
import './input.css';

const InputQuestionFactory = (isCorrectFunction: (answer: any, expectedAnswer: any) => boolean) => {

  const InputQuestion: React.FC<QuestionBodyProps> = ({question, userAnswer, setUserAnswer, isValidated}) => {

    const inputRef = useRef<any>(null);
    const isUserAnswerCorrect : boolean = userAnswer !== null && isCorrectFunction(userAnswer, question.answer);

    useEffect(() => {
      setTimeout(() => inputRef.current.setFocus(), 100);
    })
    
    return (
      <IonList>
	<IonItem className={
	isValidated ? isUserAnswerCorrect ? "success" : "danger" : ""}
		 lines="none"
	>
	  {isValidated &&
	   (
	     isUserAnswerCorrect ?
	     (
	       <IonIcon
		 ios={chevronDownCircleOutline}
		 md={chevronDownCircleOutline}
		 size="large"
		 className="success"
	       ></IonIcon>
	     ) : (
	       <IonIcon
		 ios={closeCircleOutline}
		 md={closeCircleOutline}
		 size="large"
		 className="danger"
	       ></IonIcon>
	     )
	   )
	  }
	  <IonInput
	    ref={(ref) => inputRef.current = ref}
	    disabled={isValidated}
	    value={userAnswer}
	    placeholder="Enter Answer"
	    onIonChange={(e => setUserAnswer(e.detail.value))}>
	  </IonInput>
	</IonItem>
	{isValidated && !isUserAnswerCorrect ?
	 (
	   <p className="ion-text-center" style={{'marginTop': '5px'}}>
	     <IonText color="danger">
	       The answer was {question.answer}
	     </IonText>
	   </p>
	 ) : ""
	}
      </IonList>    
    );
  }

  return InputQuestion
  
}

export default InputQuestionFactory;
