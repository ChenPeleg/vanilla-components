import {ActionType} from './ActionType.ts';

export type AppAction =
    |   { type: ActionType ; payload: any; }

