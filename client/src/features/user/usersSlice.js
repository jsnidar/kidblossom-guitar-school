import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuid } from "uuid";

const usersSlice = createSlice({
  name: "users",
  initialState: {
    entities: [],
  },
  reducers: {
    // create reducer methods
    userAdded(state, action) {
      state.entities.push({id: uuid(), name: action.payload});
    },
    userRemoved(state, action) {
      state.entities = state.entities.filter( user => user.id !== action.payload)
    }
  },
});

// export the action creators
export const { userAdded, userRemoved } = usersSlice.actions;

export default usersSlice.reducer;
