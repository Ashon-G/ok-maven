import { configureStore } from '@reduxjs/toolkit';
import boardReducer from './boardSlice';
import listsReducer from './listsSlice';
import cardsReducer from './cardsSlice';
import throttle from 'lodash.throttle';

const store = configureStore({
  reducer: {
    board: boardReducer,
    listsById: listsReducer,
    cardsById: cardsReducer
  }
});

store.subscribe(
  throttle(() => {
    const state = store.getState();
    localStorage.setItem('trello-state', JSON.stringify(state));
  }, 1000)
);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;