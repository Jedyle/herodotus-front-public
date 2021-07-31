import { useState } from 'react';
import { IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonList, IonItem, IonLabel, IonButton } from '@ionic/react';

interface QuestionInterface {
  id: number;
  question: string;
  answer_type: string;
  answer_choices: string[];
  answer: string;
  answer_details: string;
  level: string;
  photo: string;
  lesson: number;
}

interface QuestionProps {
  question: QuestionInterface
}

const Question: React.FC<QuestionProps> = ({question}) => {

  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isValidated, setIsValidated] = useState<boolean>(false);

  const answer = parseInt(question.answer)
  
  return (
    <IonCard>
      <img src={question.photo} />
      <IonCardHeader>
	<IonCardTitle>
	  {question.question}
	</IonCardTitle>
      </IonCardHeader>
      <IonCardContent>
	<IonList>
	  {question.answer_choices.map((choice: string, index: number) => (
	    <IonItem
	      button={!isValidated}
	      onClick={() => {if (!isValidated){setSelectedAnswer(index);}}}
	      color={isValidated ? (
		answer == index ? "success"
		: selectedAnswer == index && selectedAnswer !== answer ? "danger"
		: ""
	      ) : selectedAnswer == index ? "medium" : ""}
	    >
	      <IonLabel>
		{choice}
	      </IonLabel>
	    </IonItem>
	  ))}
	</IonList>
	{!isValidated ? (
	  selectedAnswer !== null ?
	  (
	    <IonButton
	      expand="block"
	      color="secondary"
	      onClick={() => {if (selectedAnswer !== null){setIsValidated(true)}}}
	    >VALIDATE</IonButton>
	  ) : ""
	) : <IonButton color="light" expand="block">Next</IonButton>
	}
      </IonCardContent>
    </IonCard>
  );
}

export default Question;
