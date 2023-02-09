import { configureStore } from '@reduxjs/toolkit'
import rootReducer from './rootReducer'
import reduxLogger from 'redux-logger'
import reduxThunk from 'redux-thunk'
//import monitorReducerEnhancer from '../enhancers/monitorReducers';

//import reducer from './reducers'
// the combined reducer from the index.ts

//import middleware from './middleware'
// applied middleware from the index.ts (thunk and logger)

//const store = createStore(reducer, middleware)
//const store = configureStore({ reducer: () => ({}), middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger).concat(thunk), enhancer: monitorReducerEnhancer });
const store = configureStore({
	reducer: rootReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(reduxLogger).concat(reduxThunk),
})
//const store = configureStore({ reducer: () => ({}), middleware: [...getDefaultMiddleware(), reduxLogger] });

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store