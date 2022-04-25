import { createSlice } from "@reduxjs/toolkit";

const boardSlice = createSlice({
    name: "board",
    initialState: {
        players: [],
        fields: [],
        size: 10,
        initialPawnPosiitons: {
            white: [],
            black: []
        }
    },
    reducers: {
        createBoard() {},
    }
})

export default boardSlice;