import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/auth.slice";
import categoryReducer from "./slices/category.slice"

const appStore = configureStore({
    reducer:{
        auth:authReducer,
        category:categoryReducer
    }
});

export default appStore;

// ✅ Export these types for global use
export type RootState = ReturnType<typeof appStore.getState>;
export type AppDispatch = typeof appStore.dispatch;