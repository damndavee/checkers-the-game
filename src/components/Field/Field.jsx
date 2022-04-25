import React from 'react';

import Pawn from '../Pawn/Pawn';

import "./Field.css";

const Field = (props) => {
    return (
        <div className='field' data-position-x={props.x} data-position-y={props.y}>
            {props.pawn.apperance && <Pawn color={props.pawn.color} outline={props.pawn.outline} />}
        </div>
    );
}

export default Field;