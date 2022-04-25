import React from 'react';
import Pawn from '../Pawn/Pawn';

import "./Field.css";

const Field = (props) => {

    // const fieldRef = useRef(null);

    // const movePawnHandler = () => {
    //     const {positionX, positionY} = fieldRef.current.dataset;

    //     const pawnPosition = {
    //         x: positionX,
    //         y: positionY
    //     }
        
    //     props.onMove(pawnPosition);
    // }

    return (
        <div {...props.droppableProvided.droppableProps} ref={props.droppableProvided.innerRef} className='field' data-position-x={props.x} data-position-y={props.y}>
            {props.pawn.apperance && <Pawn id={props.pawnId} idx={props.idx} color={props.pawn.color} outline={props.pawn.outline} />}
            {props.droppableProvided.placeholder}
        </div>
    );
}

export default Field;