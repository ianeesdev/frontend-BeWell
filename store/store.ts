import { configureStore } from "@reduxjs/toolkit";

export function makeStore() {
    return configureStore({
        reducer: {
        // Add the generated reducer as a specific top-level slice
        },
    });
}

export const store = makeStore();

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;