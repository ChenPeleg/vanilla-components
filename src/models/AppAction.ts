import {AppActionType} from '../store/app-action-type.ts';

export type AppAction =
    |   { type: AppActionType ; payload: any; }

