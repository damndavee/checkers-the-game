import React, { useEffect, useState } from 'react';
import { Droppable } from 'react-beautiful-dnd';
import { DragDropContext } from 'react-beautiful-dnd';
import { useDispatch, useSelector } from 'react-redux';

import { boardActions, gameActions } from '../../store';

import Field from '../Field/Field';

import "./Board.css";

const Board = (props) => {
    const dispatch = useDispatch();

    const [canTakeoverHappen, setCanTakeoverHappen] = useState(false);

    const board = useSelector(state => state.board);
    const turn = useSelector(state => state.game.turn);

    useEffect(() => {
        if(board.fields.length === 0) {
            dispatch(boardActions.createBoard());
            dispatch(gameActions.setTurn());
        }
    }, [board, dispatch]);

    const checkMove = (destination, source) => {

        const {index: indexDest, x: xDest, y: yDest, pawn} = destination;
        const {index: indexSrc, x: xSrc, y: ySrc} = source;

        // check whether takoever can happen or not.
        // create an extra case for takeover -> that creates a window to simplefy the existing code = no need to duplicate the same code for different case

        switch(true) {
            case indexDest === indexSrc: {
                return "YOU CANNOT ENTER FIELD THAT YOU ARE OCCUPYING";
            }

            case pawn.apperance: {
                return "YOU ARE APPROACHING A FIELD THAT IS ALREADY OCCUPIED!";
            }

            // refactor cases for detecting takeovers -> there is a code duplication
            case (turn === "white" && canTakeoverHappen && (yDest === ySrc + 2 && (xDest === xSrc + 2 || xDest === xSrc - 2))): {
                const takeoverSide = checkTakeoverSide(xDest, xSrc);
                const {index, field} = getTakeoveredField(xDest, yDest, takeoverSide);

                if(!field.pawn) return "CANNOT TAKEOVER THE FIELD";
                
                dispatch(boardActions.takeover({index}));

                return "WHITE DESTINATION FIELD AFTER TAKEOVER";
            }

            case (turn === "black" && canTakeoverHappen && (yDest === ySrc - 2 && (xDest === xSrc + 2 || xDest === xSrc - 2))): {
                // const takeoverSide = checkTakeoverSide(xDest, xSrc);
                // const fieldsToTakeover = getTakeoveredField(xDest, yDest, takeoverSide);

                // console.log("FIELD TO BEING TAKEOVER: ", fieldsToTakeover);
                // console.log("TAKEOVER SIDE", takeoverSide);
                return "BLACK DESTINATION FIELD AFTER TAKEOVER";
            }

            case (turn === "white" && !(yDest === ySrc + 1 && (xDest === xSrc + 1 || xDest === xSrc -1))): {
                return "WHITE MOVE IS NOT ALLOWED!"
            }

            case (turn === "black" && !(yDest === ySrc - 1 && (xDest === xSrc + 1 || xDest === xSrc -1))): {
                return "BLACK MOVE IS NOT ALLOWED!";
            }

            default: {
                return "MOVE IS POSSIBLE!";
            }
        }
    }

    const checkTakeoverSide = (destX, srcX) => destX ===  srcX - 2 ? "left" : "right";

    const getTakeoveredField = (destX, destY, side) => {
        const yAxisIndex = turn === "white" ? -1 : 1;
        const sideIndex = side === "left" ? 1 : -1;
        
        return {
            index:  board.fields.findIndex(({x, y}) => x === destX + sideIndex && y === destY + yAxisIndex),
            field:  board.fields.find(({x, y}) => x === destX + sideIndex && y === destY + yAxisIndex)
        };
    }

    const checkTakeover = (source) => {
        const {fields} = board;

        const yAxisIndex = turn === "white" ? 1 : -1;

        const fieldsToTakeover = fields.filter(({x, y}) => (x === source.x - 1 || x === source.x + 1) && y === source.y + yAxisIndex);
        const pawns = fieldsToTakeover.map(field => field.pawn);

        if(!pawns.some(pawn => pawn.player)) return setCanTakeoverHappen(false);

        setCanTakeoverHappen(true);
    }

    const onDragEndHandler = (result) => {
        if(!result.destination) return;

        const {source, destination} = result;
        const {fields} = board;

        const [srcX, srcY] = source.droppableId.split("-").map(coord => +coord);
        const [destX, destY] = destination.droppableId.split("-").map(coord => +coord);

        const destinationFieldIndex = fields.findIndex(({x, y}) => x === destX && y === destY);
        const destinationField = {...fields[destinationFieldIndex], index: destination.index};

        const sourceFieldIndex = fields.findIndex(({x, y}) => x === srcX && y === srcY);
        const sourceField = {...fields[sourceFieldIndex], index: source.index};

        const move = checkMove(destinationField, sourceField)

        console.log(move);

        // const isMovePossible = checkMovePossibility(destinationField, {xSrc, ySrc}, turn, board.fields);

        // if(!isMovePossible) return;

        dispatch(boardActions.movePawn({
            destination: destinationField,
            sourceIndex: sourceFieldIndex, 
            destinationIndex: destinationFieldIndex, 
            pawn: sourceField.pawn
        }));
        dispatch(gameActions.changeTurn());

        setCanTakeoverHappen(false);

        // console.log("MOŻNA GRAĆ DALEJ");
    }

    const onDragStartHandler = (start) => {
        const [xSrc, ySrc] = start.source.droppableId.split("-");
        const sourceField = board.fields.find(f => f.x === +xSrc && f.y === +ySrc);

        checkTakeover(sourceField);


    }  

    return (
        <React.Fragment>
            <div>
                {turn}
            </div>
            <DragDropContext onDragEnd={onDragEndHandler} onDragStart={onDragStartHandler} >
                <div className='board'>
                    {board.fields.map((field, index) => {
                        const fieldId = `${field.x}-${field.y}`;
                        const pawnId = `${field.x}${field.y}`

                        return (
                            <Droppable droppableId={fieldId} key={fieldId}>
                                {(droppableProvided) => (
                                    <Field pawnId={pawnId} idx={index} key={fieldId} x={field.x} y={field.y} pawn={field.pawn} droppableProvided={droppableProvided} />
                                    )}
                            </Droppable>
                        )
                    })}
                </div>
            </DragDropContext>
        </React.Fragment>
    );
}

export default Board;