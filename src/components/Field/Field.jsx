import React from 'react';

import "./Field.css";

const Field = (props) => {
    return (
        <div className='field' data-position-x={props.x} data-position-y={props.y}>
            
        </div>
    );
}

export default Field;