interface QuestionInterface {
  id: number;
  question: string;
  answer_type: string;
  answer_choices: string[];
  answer: string;
  answer_details: string;
  level: string;
  photo: string;
  lesson: string;
}

interface QuestionBodyProps {
  question: QuestionInterface;
  userAnswer: any;
  setUserAnswer: (userAnswer: any) => void;
  isValidated: any;
}

interface QuestionProps {
  question: QuestionInterface;
  onTriggerNextButton?: (isAnswerCorrect: boolean) => void;
}

export type {QuestionInterface, QuestionBodyProps, QuestionProps};
