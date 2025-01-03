import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isDarkMode: false, // قيمة افتراضية مؤقتة أثناء SSR
};

const darkModeSlice = createSlice({
    name: "darkMode",
    initialState,
    reducers: {
        setDarkMode: (state, action) => {
            state.isDarkMode = action.payload;
        },
        toggleDarkMode: (state) => {
            state.isDarkMode = !state.isDarkMode;
            if (typeof window !== "undefined") {
                localStorage.setItem("darkMode", state.isDarkMode);
            }
        },
    },
});

export const { toggleDarkMode, setDarkMode } = darkModeSlice.actions;
export default darkModeSlice.reducer;
