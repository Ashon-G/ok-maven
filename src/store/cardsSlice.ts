import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Card {
  _id: string;
  text: string;
}

interface CardsState {
  [key: string]: Card;
}

const initialState: CardsState = {};

export const cardsSlice = createSlice({
  name: 'cards',
  initialState,
  reducers: {
    addCard: (state, action: PayloadAction<{ cardId: string; cardText: string }>) => {
      const { cardId, cardText } = action.payload;
      state[cardId] = { _id: cardId, text: cardText };
    },
    changeCardText: (state, action: PayloadAction<{ cardId: string; cardText: string }>) => {
      const { cardId, cardText } = action.payload;
      state[cardId].text = cardText;
    },
    deleteCard: (state, action: PayloadAction<{ cardId: string }>) => {
      delete state[action.payload.cardId];
    }
  }
});

export const { addCard, changeCardText, deleteCard } = cardsSlice.actions;
export default cardsSlice.reducer;