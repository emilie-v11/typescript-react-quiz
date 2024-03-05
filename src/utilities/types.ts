import { IQuestion } from './interfaces';

export type Status = 'loading' | 'error' | 'ready' | 'active' | 'finished';

export type Action =
  | { type: 'DATA_RECEIVED'; payload: IQuestion[] }
  | { type: 'NEW_ANSWER'; payload: number }
  | { type: 'DATA_FAILED' | 'START' | 'NEXT_QUESTION' | 'FINISH' | 'RESTART' | 'TICK'};
