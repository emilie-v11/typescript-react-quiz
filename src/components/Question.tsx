import { IQuestion } from '../utilities/interfaces';
import { Action } from '../utilities/types';
import Options from './Options';

interface QuestionProps {
  question: IQuestion;
  dispatch: React.Dispatch<Action>;
  answer: number;
}

const Question = ({ question, dispatch, answer }: QuestionProps) => {
  return (
    <div>
      <h4>{question.question}</h4>
      <Options
        question={question}
        dispatch={dispatch}
        answer={answer}
      />
    </div>
  );
};

export default Question;
