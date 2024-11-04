import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { supabase } from '@/integrations/supabase/client';

interface BoardState {
  lists: string[];
}

const initialState: BoardState = {
  lists: []
};

export const boardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {
    addList: (state, action: PayloadAction<{ listId: string }>) => {
      state.lists.push(action.payload.listId);
    },
    moveList: (state, action: PayloadAction<{ oldListIndex: number; newListIndex: number }>) => {
      const { oldListIndex, newListIndex } = action.payload;
      const newLists = Array.from(state.lists);
      const [removedList] = newLists.splice(oldListIndex, 1);
      newLists.splice(newListIndex, 0, removedList);
      state.lists = newLists;
    },
    deleteList: (state, action: PayloadAction<{ listId: string }>) => {
      state.lists = state.lists.filter(id => id !== action.payload.listId);
    }
  }
});

export const { addList, moveList, deleteList } = boardSlice.actions;
export default boardSlice.reducer;