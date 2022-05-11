import { createSlice } from "@reduxjs/toolkit";

const gameSlice = createSlice({
    name: "game",
    initialState: {
        turn: "",
        tempNumber: null,
    },
    reducers: {
        setTurn(state, action) {
            const randomNumber = Math.floor((Math.random() + 1) * 2);
            state.tempNumber = randomNumber;
            state.turn = randomNumber % 2 === 0 ? "white" : "black";
        },
        
        changeTurn(state, action) {
            state.tempNumber += 1;
            state.turn = state.tempNumber % 2 === 0 ? "white" : "black";
        },
    }
})

export default gameSlice;