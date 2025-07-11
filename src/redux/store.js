import { createStore, applyMiddleware } from 'redux';
import { searchReducer } from './reducer';
import { createEpicMiddleware } from 'redux-observable';
import { rootEpic } from './epics';

const epicMiddleware = createEpicMiddleware();

export const store = createStore(searchReducer, applyMiddleware(epicMiddleware));

epicMiddleware.run(rootEpic);
