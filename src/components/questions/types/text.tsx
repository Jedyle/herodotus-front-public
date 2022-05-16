import { QuestionBodyProps, QuestionInterface } from '../props';
import InputQuestionFactory from './input';

const checkSingleAnswer = (answer: string, expected: string) => {
  return answer.trim().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "") === expected.trim().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
}

const isTextCorrect = (answer : string, expectedAnswer : Array<string>) => {
  // expectedAnswer is a list of possible answers
  // for example : Octavian, Octavianus
  for (let possibleAnswer of expectedAnswer){
    console.log(possibleAnswer);
    if (checkSingleAnswer(answer, possibleAnswer)){
      return true;
    }
  }
  return false;
}


const displayCorrectAnswer = (question : QuestionInterface) => (question.answer[0]);

const TextQuestion: React.FC<QuestionBodyProps> = InputQuestionFactory(isTextCorrect, displayCorrectAnswer)

export { isTextCorrect };
export default TextQuestion;
