import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faChessPawn} from "@fortawesome/free-solid-svg-icons";

import "./Pawn.css";

const Pawn = (props) => {
    return (
        <div>
            <FontAwesomeIcon 
                style={{
                    color: props.color,
                    stroke: props.outline
                }} className="pawn" icon={faChessPawn} />
        </div>
    );
}

export default Pawn;