import { QuestionBodyProps} from '../props';
import InputQuestionFactory from './input';

const isTextCorrect = (answer : string, expectedAnswer : string) => (
  answer.trim().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "") === expectedAnswer.trim().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
)

const TextQuestion: React.FC<QuestionBodyProps> = InputQuestionFactory(isTextCorrect)

export { isTextCorrect };
export default TextQuestion;
