import { createSlice } from "@reduxjs/toolkit";

const playerSlice = createSlice({
    name: "player",
    initialState: {
        color: "",
        canMove: false,
        pawns: [],
    },
    reducers: {
        createPlayer(state, action) {
            state.color = action.payload.color;
            state.pawns = action.payload.pawns;
        }
    }
})

export default playerSlice;