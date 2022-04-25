import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faChessPawn} from "@fortawesome/free-solid-svg-icons";

import "./Pawn.css";
import { Draggable } from 'react-beautiful-dnd';


const Pawn = (props) => {

    const move = (e) => {
        console.log(e.target.parentNode.parentNode);
    }

    return (
        <Draggable draggableId={props.id} index={props.idx} key={props.id}>
            {(provided) => (
                <div  
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                ref={provided.innerRef} >
                    <FontAwesomeIcon onClick={move}
                   
                    style={{
                        fontSize: "2.5rem",
                        color: props.color,
                        stroke: props.outline
                    }} className="pawn" icon={faChessPawn} />
                </div>
            )}
            
        </Draggable>
    );
}

export default Pawn;