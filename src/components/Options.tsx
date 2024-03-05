import { IQuestion } from '../utilities/interfaces';
import { Action } from '../utilities/types';

interface OptionsProps {
  question: IQuestion;
  dispatch: React.Dispatch<Action>;
  answer: number;
}

const Options = ({ question, dispatch, answer }: OptionsProps) => {
  const hasAnswered = answer !== null;
  return (
    <div className="options">
      {question.options.map((option, index) => (
        <button
          className={`btn btn-option ${index === answer ? 'answer' : ''} ${
            hasAnswered
              ? index === question.correctOption
                ? 'correct'
                : 'wrong'
              : ''
          }`}
          key={option}
          disabled={hasAnswered}
          onClick={() => dispatch({ type: 'NEW_ANSWER', payload: index })}
        >
          {option}
        </button>
      ))}
    </div>
  );
};

export default Options;
