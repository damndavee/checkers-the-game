import React, { useEffect } from 'react';

import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

import {boardActions} from "../../store";

import Field from '../Field/Field';

import "./Board.css";

const Board = (props) => {

    const dispatch = useDispatch();
    const board = useSelector(state => state.board);

    useEffect(() => {
        if(board.fields.length === 0) {
            dispatch(boardActions.createBoard());
        }
    }, [board, dispatch])

    return (
        <div className="board">
            {board.fields.map(field => <Field x={field.x} y={field.y} pawn={field.pawn} />)}
        </div>
    );
}

export default Board;