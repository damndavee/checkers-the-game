import { configureStore } from "@reduxjs/toolkit";

import boardSlice from "./board";
import gameSlice from "./game";
import pawnSlice from "./pawn";
import playerSlice from "./player";

const store = configureStore({
    reducer: {
        board: boardSlice.reducer,
        game: gameSlice.reducer,
        pawn: pawnSlice.reducer,
        player: playerSlice.reducer
    }
})

export const boardActions = boardSlice.actions;
export const gameActions = gameSlice.actions;
export const pawnActions = pawnSlice.actions;
export const playerActions = playerSlice.actions;

export default store;