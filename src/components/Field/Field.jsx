import React from 'react';
import { useSelector } from 'react-redux';
import Pawn from '../Pawn/Pawn';

import "./Field.css";

const Field = (props) => {

    const turn = useSelector(state => state.game.turn);

    return (
        <div {...props.droppableProvided.droppableProps} ref={props.droppableProvided.innerRef} className='field' data-position-x={props.x} data-position-y={props.y}>
            {props.pawn.apperance && <Pawn shouldDisable={props.pawn.player !== turn} id={props.pawnId} idx={props.idx} color={props.pawn.color} outline={props.pawn.outline} />}
            {props.droppableProvided.placeholder}
        </div>
    );
}

export default Field;