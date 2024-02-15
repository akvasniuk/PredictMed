import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    diseaseSection: [],
};

const diseaseSlice = createSlice({
    name: "disease",
    initialState,
    reducers: {
        setDiseaseSection: (state, action) => {
            state.diseaseSection = action.payload;
        },
    },
});

export const {
    setDiseaseSection,
} = diseaseSlice.actions;

export default diseaseSlice.reducer;
