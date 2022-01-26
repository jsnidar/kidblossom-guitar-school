import { configureStore } from "@reduxjs/toolkit";

import usersReducer from "./features/user/usersSlice";

const store = configureStore({
  reducer: {
    user: usersReducer,
  },
});

export default store;
