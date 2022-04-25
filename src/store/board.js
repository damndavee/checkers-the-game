import { createSlice } from "@reduxjs/toolkit";

const boardSlice = createSlice({
    name: "board",
    initialState: {
        players: [],
        fields: [],
        size: 10,
        initialPawnPositions: {
            whitePlayer: [],
            blackPlayer: []
        }
    },
    reducers: {
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
                                outline: "#000"
                            };
                            state.initialPawnPositions.whitePlayer.push({x: j, y: i});
                        }
                    }        

                    if(i >= 7 && i <= 9) {
                        if((i % 2 === 1 && j % 2 === 0) || (i % 2 === 0 && j % 2 === 1)) {
                            state.fields[pawnIndex].pawn = {
                                apperance: true,
                                color: "#000",
                                outline: "#fff"
                            };
                            state.initialPawnPositions.blackPlayer.push({x: j, y: i});
                        }
                    }        
                }
            }

        }
    }
})

export default boardSlice;