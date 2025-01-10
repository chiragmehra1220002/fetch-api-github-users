import { configureStore } from "@reduxjs/toolkit";
import { gitUser } from "./features/gitUserSlice";

export const store = configureStore({
  reducer: {
    gitUser: gitUser.reducer, 
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;