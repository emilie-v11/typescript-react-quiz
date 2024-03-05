import { useEffect, useReducer } from 'react';
import { State } from './utilities/interfaces';
import { Action } from './utilities/types';
import Header from './components/Header';
import Main from './components/Main';
import Loader from './components/Loader';
import ErrorComponent from './components/ErrorComponent';
import StartScreen from './components/StartScreen';
import Question from './components/Question';
import NextButton from './components/NextButton';
import ProgressBar from './components/Progress';
import FinishScreen from './components/FinishScreen';
import Timer from './components/Timer';
import Footer from './components/Footer';

const SECS_PER_QUESTION = 30;

const initialState: State = {
  questions: [],
  status: 'loading',
  index: 0,
  answer: null,
  points: 0,
  highscore: 0,
  secondsRemaining: 10,
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'DATA_RECEIVED':
      return { ...state, questions: action.payload, status: 'ready' };
    case 'DATA_FAILED':
      return { ...state, status: 'error' };
    case 'START':
      return {
        ...state,
        status: 'active',
        secondsRemaining: state.questions.length * SECS_PER_QUESTION,
      };
    case 'NEW_ANSWER':
      const currentQuestion = state.questions.at(state.index);
      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === currentQuestion?.correctOption
            ? state.points + currentQuestion.points
            : state.points,
      };
    case 'NEXT_QUESTION':
      return {
        ...state,
        index: state.index + 1,
        answer: null,
      };
    case 'FINISH':
      return {
        ...state,
        status: 'finished',
        highscore:
          state.points > state.highscore ? state.points : state.highscore,
      };
    case 'RESTART':
      return {
        ...initialState,
        status: 'ready',
        questions: state.questions,
        highscore: state.highscore,
      };
    case 'TICK':
      return {
        ...state,
        secondsRemaining: state.secondsRemaining - 1,
        status: state.secondsRemaining === 0 ? 'finished' : state.status,
        highscore:
          state.points > state.highscore ? state.points : state.highscore,
      };
    default:
      throw new Error('Unknown action type');
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const {
    questions,
    status,
    index,
    answer,
    points,
    highscore,
    secondsRemaining,
  } = state;

  const numQuestions = questions.length;
  const maxPossiblePoints = questions.reduce(
    (acc, question) => acc + question.points,
    0,
  );

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('http://localhost:8000/questions');
        const data = await response.json();
        dispatch({ type: 'DATA_RECEIVED', payload: data });
      } catch (error) {
        console.error('Error fetching data: ', error);
        dispatch({ type: 'DATA_FAILED' });
      }
    }
    fetchData();
  }, []);

  return (
    <div className="app">
      <Header />
      <Main>
        {status === 'loading' && <Loader />}
        {status === 'error' && <ErrorComponent />}
        {status === 'ready' && (
          <StartScreen
            numQuestions={numQuestions}
            dispatch={dispatch}
          />
        )}
        {status === 'active' && (
          <>
            <ProgressBar
              index={index}
              numQuestions={numQuestions}
              points={points}
              maxPossiblePoints={maxPossiblePoints}
              answer={answer}
            />
            <Question
              question={questions[index]}
              dispatch={dispatch}
              answer={answer as number}
            />
            <Footer>
              <Timer
                dispatch={dispatch}
                secondsRemaining={secondsRemaining}
              />
              <NextButton
                dispatch={dispatch}
                answer={answer as number}
                index={index}
                numQuestions={numQuestions}
              />
            </Footer>
          </>
        )}
        {status === 'finished' && (
          <FinishScreen
            points={points}
            maxPossiblePoints={maxPossiblePoints}
            highscore={highscore}
            dispatch={dispatch}
          />
        )}
      </Main>
    </div>
  );
}

export default App;
