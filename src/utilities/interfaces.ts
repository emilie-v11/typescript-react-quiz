import { Status } from './types';

export interface IQuestion {
  id: string;
  question: string;
  options: string[];
  correctOption: number;
  points: number;
}

export interface State {
  questions: IQuestion[];
  status: Status;
  index: number;
  answer: number | null;
  points: number;
  highscore: number;
  secondsRemaining: number;
}
