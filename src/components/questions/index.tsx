import { useState } from 'react';
import { IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonItem, IonLabel } from '@ionic/react';

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

  const [userAnswer, setUserAnswer] = useState<number | null>(null);

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
	{question.answer_choices.map((choice: string, index: number) => (
	  <IonItem
	    button={userAnswer === null}
	    onClick={() => {if (userAnswer === null ){setUserAnswer(index);}}}
	    color={
	    (userAnswer !== null && (answer === index)) ?
	    "success" :
	    (
	      (userAnswer === index && userAnswer != answer) ? "danger" : ""
	    )
	    }
	  >
	    <IonLabel>
	      {choice}
	    </IonLabel>
	  </IonItem>
	))}
      </IonCardContent>
    </IonCard>
  );
}

export default Question;
