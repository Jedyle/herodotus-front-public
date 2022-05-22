import { useState } from 'react';

import { QuestionInterface } from 'components/questions/props';
import Question from 'components/questions';

interface ReviewSessionProps {
  questions: QuestionInterface[];
  onReviewIsOver?: () => void;
  onQuestionIsValidated?: (questionId: number, firstAnswerWasCorrect: boolean) => void;
}

interface QuestionsState {
  answered: QuestionInterface[];
  notAnswered: QuestionInterface[];
  current: QuestionInterface;
  index: number;
  wrongAnswers: number[]; 
}

const ReviewSession: React.FC<ReviewSessionProps> = ({questions, onQuestionIsValidated, onReviewIsOver}) => {

  // FIFO structures
  const [questionsState, setQuestionsState] = useState<QuestionsState>({
    answered: [],
    notAnswered: questions.slice(1),
    current: questions[0],
    index: 0,
    // we keep the list of errors to send it to the backend (it changes the revision interval)
    wrongAnswers: []
  })

  const onTriggerNextButton = (isAnswerCorrect : boolean) => {
    let { answered, notAnswered, current, index, wrongAnswers } = questionsState;
    if (isAnswerCorrect){
      answered.push(current);
      onQuestionIsValidated && onQuestionIsValidated(current.id, !wrongAnswers.includes(current.id));
    }
    else {
      notAnswered.push(current);
      wrongAnswers.push(current.id)
    }
    current = notAnswered.length !== 0 ? notAnswered.shift() : null;
    if (current === null){
      onReviewIsOver && onReviewIsOver();
    }
    setQuestionsState({
      answered: answered,
      notAnswered: notAnswered,
      current: current,
      index: index+1,
      wrongAnswers: wrongAnswers
    })
  }
  
  return (questionsState.current ?
	  <Question
	    key={questionsState.index}
	    question={questionsState.current}
	    onTriggerNextButton={onTriggerNextButton}
	  /> : (<div></div>)    
  );
};

export default ReviewSession;
