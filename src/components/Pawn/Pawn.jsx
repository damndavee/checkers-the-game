import React from 'react';

import { Draggable } from 'react-beautiful-dnd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faChessPawn} from "@fortawesome/free-solid-svg-icons";

import "./Pawn.css";

const Pawn = (props) => {
    return (
        <Draggable isDragDisabled={props.shouldDisable} draggableId={props.id} index={props.idx} key={props.id}>
            {(provided) => (
                <div  
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                ref={provided.innerRef} >
                    <FontAwesomeIcon
                        style={{
                            fontSize: "2.5rem",
                            color: props.color,
                            stroke: props.outline
                        }} className="pawn" icon={faChessPawn} 
                    />
                </div>
            )}
            
        </Draggable>
    );
}

export default Pawn;