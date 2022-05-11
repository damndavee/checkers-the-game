import React, { useEffect } from 'react';
import { Droppable } from 'react-beautiful-dnd';
import { DragDropContext } from 'react-beautiful-dnd';
import { useDispatch, useSelector } from 'react-redux';

import { boardActions, gameActions } from '../../store';
import {checkMovePossibility, checkTakeoverPossibility} from '../../utils/moveDetection';
import Field from '../Field/Field';

import "./Board.css";

const Board = (props) => {

    const dispatch = useDispatch();
    const board = useSelector(state => state.board);
    const turn = useSelector(state => state.game.turn);

    // const turn = "white";

    useEffect(() => {
        if(board.fields.length === 0) {
            dispatch(boardActions.createBoard());
            dispatch(gameActions.setTurn());
        }
    }, [board, dispatch]);

    const onDragEndHandler = (result) => {
        if(!result.destination) return;
    
        const [xDest, yDest] = result.destination.droppableId.split("-");
        const [xSrc, ySrc] = result.source.droppableId.split("-");

        const destinationFieldIndex = board.fields.findIndex(f => f.x === +xDest && f.y === +yDest);
        const sourceFieldIndex = board.fields.findIndex(f => f.x === +xSrc && f.y === +ySrc);
        
        const destinationField = board.fields[destinationFieldIndex];
        const sourceField = board.fields[sourceFieldIndex];

        const isMovePossible = checkMovePossibility(destinationField, xSrc, ySrc, turn);

        if(!isMovePossible) return;

        dispatch(boardActions.movePawn({sourceIndex: sourceFieldIndex, destinationIndex: destinationFieldIndex, pawn: sourceField.pawn}));
        dispatch(gameActions.changeTurn());

        // console.log("MOŻNA GRAĆ DALEJ");
    }

    const onDragStartHandler = (start) => {
        const [xSrc, ySrc] = start.source.droppableId.split("-");
        const sourceField = board.fields.find(f => f.x === +xSrc && f.y === +ySrc);

        const isTakeoverPossible = checkTakeoverPossibility(sourceField, board.fields, turn);
        // const isTakeoverPossibleB = checkTakeoverPossibility(sourceField, board.fields, "black");
        
        console.log(isTakeoverPossible);

        // if(!isTakeoverPossible) return;

        // console.log("START DRAGGIN: ", start);

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