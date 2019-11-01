import { Action } from '@ngrx/store';

export const EDIT_TITLE  = '[Post] Edit';


export class EditText implements Action {
  readonly type = EDIT_TITLE;

  /// user a constructor to send a payload with the action
  constructor(public payload: string) {}
}

export type All
  = EditText;
