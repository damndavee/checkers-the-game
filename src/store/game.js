import { createSlice } from "@reduxjs/toolkit";

const gameSlice = createSlice({
    name: "game",
    initialState: {
        turn: "",
    },
    reducers: {
        setTurn(state, action) {},
        changeTurn(state, action) {},
    }
})

export default gameSlice;