import { createSlice } from "@reduxjs/toolkit";

const playerSlice = createSlice({
    name: "player",
    initialState: {
        color: "",
        canMove: false,
        pawns: [],
    },
    reducers: {

    }
})

export default playerSlice;