import React, { useEffect } from 'react';
import { Droppable } from 'react-beautiful-dnd';
import { DragDropContext } from 'react-beautiful-dnd';
import { useDispatch, useSelector } from 'react-redux';

import { boardActions } from '../../store';
import {checkMovePossibility, checkTakeoverPossibility} from '../../utils/moveDetection';
import Field from '../Field/Field';

import "./Board.css";

const Board = (props) => {

    const dispatch = useDispatch();
    const board = useSelector(state => state.board);

    useEffect(() => {
        if(board.fields.length === 0) {
            dispatch(boardActions.createBoard());
        }
    }, [board, dispatch]);

    const onDragEndHandler = (result) => {
        if(!result.destination) return;
    
        const [xDest, yDest] = result.destination.droppableId.split("-");
        // const [xSrc, ySrc] = result.source.droppableId.split("-");
        const sourceCoordinates = result.source.droppableId.split("-");
        const destinationField = board.fields.find(f => f.x === +xDest && f.y === +yDest);

        const isMovePossible = checkMovePossibility(destinationField, sourceCoordinates, "white");

        if(!isMovePossible) return;

        console.log("MOŻNA GRAĆ DALEJ");
    }

    const onDragStartHandler = (start) => {
        const [xSrc, ySrc] = start.source.droppableId.split("-");
        const sourceField = board.fields.find(f => f.x === +xSrc && f.y === +ySrc);

        const isTakeoverPossible = checkTakeoverPossibility(sourceField, board.fields, "white");
        // const isTakeoverPossibleB = checkTakeoverPossibility(sourceField, board.fields, "black");

        if(!isTakeoverPossible) return;
        // if(!isTakeoverPossibleB) return;

       
        console.log("START DRAGGIN: ", start);
    }  

    return (
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
    );
}

export default Board;