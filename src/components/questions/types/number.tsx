import { QuestionBodyProps} from '../props';
import InputQuestionFactory from './input';

const isNumberCorrect = (answer : any, expectedAnswer : any) => (
  Math.abs(parseInt(answer)) === Math.abs(parseInt(expectedAnswer))
)

const NumberQuestion: React.FC<QuestionBodyProps> = InputQuestionFactory(isNumberCorrect)

export { isNumberCorrect };
export default NumberQuestion;
