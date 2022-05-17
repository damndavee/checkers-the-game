import { createSlice } from "@reduxjs/toolkit";

const boardSlice = createSlice({
    name: "board",
    initialState: {
        players: [],
        fields: [],
        takeoverBin: [],
        size: 10,
    },
    reducers: {
        // create board -> empty board 10x10
        // attach pawns -> attach pawns to board (by color)
        // create players -> push pawns for players array
        // makeMove -> move pawn accross the board

        createBoard(state, action) {  
            for(let i = 0; i < state.size; i++) {
                for(let j = 0; j < state.size; j++) {
                    state.fields.push({x: j, y: i, pawn: false});
                    
                    const pawnIndex = state.fields.findIndex(p => p.x === j && p.y === i);

                    if(i >= 0 && i <= 2) {
                        if((i % 2 === 1 && j % 2 === 0) || (i % 2 === 0 && j % 2 === 1)) {
                            state.fields[pawnIndex].pawn = {
                                apperance: true,
                                color: "#fff",
                                outline: "#000",
                                player: "white",
                                x: i,
                                y: j

                            };
                        }
                    }        

                    if(i >= 7 && i <= 9) {
                        if((i % 2 === 1 && j % 2 === 0) || (i % 2 === 0 && j % 2 === 1)) {
                            state.fields[pawnIndex].pawn = {
                                apperance: true,
                                color: "#000",
                                outline: "#fff",
                                player: "black",
                                x: i,
                                y: j
                            };
                        }
                    }        
                }
            }
        },

        attachPawns(state, action) {
            
        },

        createPlayers(state, action) {

        },

        takeover(state, action) {

            state.takeoverBin.push(state.fields[action.payload.index]);
            state.fields[action.payload.index].pawn = false;
            // 1. take field that should be takeoverd
            // 2. change the pawn state to false
        },

        movePawn(state, action) {
            const {destination, sourceIndex, destinationIndex} = action.payload;

            state.fields[sourceIndex].pawn = false;
            state.fields[destinationIndex].pawn = {
                ...action.payload.pawn,
                x: destination.x,
                y: destination.y
            };
        }
    }
})

export default boardSlice;