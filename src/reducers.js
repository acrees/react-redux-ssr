import { Map, List } from 'immutable';
import { combineReducers } from 'redux';

const initialState = Map();

export default function root(state = initialState, action) {
  return state;
}
