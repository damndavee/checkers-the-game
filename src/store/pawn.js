import { createSlice } from "@reduxjs/toolkit";

const pawnSlice = createSlice({
    name: "pawn",
    initialState: {
        color: "",
        position: {
            x: 0,
            y: 0
        },
        canDrag: false,
        canMove: false,
        canBeUpgraded: false
    },
    reducers: {
        setColor(state, action) {},
        movePawn(state, action) {},
    }
})

export default pawnSlice;