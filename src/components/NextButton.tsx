import { Action } from '../utilities/types';

interface NextButtonProps {
  dispatch: React.Dispatch<Action>;
  answer: number;
  index: number;
  numQuestions: number;
}

const NextButton = ({
  dispatch,
  answer,
  index,
  numQuestions,
}: NextButtonProps) => {
  if (answer === null) return null;

  if (index < numQuestions - 1) {
    return (
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: 'NEXT_QUESTION' })}
      >
        Next
      </button>
    );
  }
  if (index === numQuestions - 1) {
    return (
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: 'FINISH' })}
      >
        Finish
      </button>
    );
  }
  return null;
};

export default NextButton;
