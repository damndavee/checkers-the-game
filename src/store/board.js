import { createSlice } from "@reduxjs/toolkit";

const boardSlice = createSlice({
    name: "board",
    initialState: {
        players: [],
        fields: [],
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
                                player: "white"
                            };
                        }
                    }        

                    if(i >= 7 && i <= 9) {
                        if((i % 2 === 1 && j % 2 === 0) || (i % 2 === 0 && j % 2 === 1)) {
                            state.fields[pawnIndex].pawn = {
                                apperance: true,
                                color: "#000",
                                outline: "#fff",
                                player: "black"
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

        movePawn(state, action) {
            state.fields[action.payload.sourceIndex].pawn = false;
            state.fields[action.payload.destinationIndex].pawn = action.payload.pawn;
        }
    }
})

export default boardSlice;