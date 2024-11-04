import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface List {
  _id: string;
  title: string;
  cards: string[];
}

interface ListsState {
  [key: string]: List;
}

const initialState: ListsState = {};

export const listsSlice = createSlice({
  name: 'lists',
  initialState,
  reducers: {
    addList: (state, action: PayloadAction<{ listId: string; listTitle: string }>) => {
      const { listId, listTitle } = action.payload;
      state[listId] = { _id: listId, title: listTitle, cards: [] };
    },
    changeListTitle: (state, action: PayloadAction<{ listId: string; listTitle: string }>) => {
      const { listId, listTitle } = action.payload;
      state[listId].title = listTitle;
    },
    deleteList: (state, action: PayloadAction<{ listId: string }>) => {
      delete state[action.payload.listId];
    },
    addCardToList: (state, action: PayloadAction<{ listId: string; cardId: string }>) => {
      state[action.payload.listId].cards.push(action.payload.cardId);
    },
    moveCard: (state, action: PayloadAction<{
      sourceListId: string;
      destListId: string;
      oldCardIndex: number;
      newCardIndex: number;
    }>) => {
      const { sourceListId, destListId, oldCardIndex, newCardIndex } = action.payload;
      const sourceCards = Array.from(state[sourceListId].cards);
      const [removedCard] = sourceCards.splice(oldCardIndex, 1);
      
      if (sourceListId === destListId) {
        sourceCards.splice(newCardIndex, 0, removedCard);
        state[sourceListId].cards = sourceCards;
      } else {
        state[sourceListId].cards = sourceCards;
        const destinationCards = Array.from(state[destListId].cards);
        destinationCards.splice(newCardIndex, 0, removedCard);
        state[destListId].cards = destinationCards;
      }
    }
  }
});

export const { addList, changeListTitle, deleteList, addCardToList, moveCard } = listsSlice.actions;
export default listsSlice.reducer;