import { useState } from 'react';

import { QuestionInterface } from 'components/questions/props';
import Question from 'components/questions';

interface ReviewSessionProps {
  questions: QuestionInterface[];
  onReviewIsOver?: () => void;
}

interface QuestionsState {
  answered: QuestionInterface[];
  notAnswered: QuestionInterface[];
  current: QuestionInterface;
  index: number;
}

const ReviewSession: React.FC<ReviewSessionProps> = ({questions, onReviewIsOver}) => {

  // FIFO structures
  const [questionsState, setQuestionsState] = useState<QuestionsState>({
    answered: [],
    notAnswered: questions.slice(1),
    current: questions[0],
    index: 0
  })

  const onTriggerNextButton = (isAnswerCorrect : boolean) => {
    let { answered, notAnswered, current, index } = questionsState;
    if (isAnswerCorrect){
      answered.push(current);
    }
    else {
      notAnswered.push(current);
    }
    current = notAnswered.length !== 0 ? notAnswered.shift() : null;
    if (current === null){
      onReviewIsOver && onReviewIsOver();
    }
    setQuestionsState({
      answered: answered,
      notAnswered: notAnswered,
      current: current,
      index: index+1
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
