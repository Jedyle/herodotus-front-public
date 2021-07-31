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

interface QuestionBodyProps {
  question: QuestionInterface;
  userAnswer: any;
  setUserAnswer: (userAnswer: any) => void;
  isValidated: any;
}

interface QuestionProps {
  question: QuestionInterface
}

export type {QuestionInterface, QuestionBodyProps, QuestionProps};
