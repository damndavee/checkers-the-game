export function checkMovePossibility(destination, source, turn) {
    let flag;

    const [xSrc, ySrc] = source;

    switch(true) {
        case destination.pawn.apperance: {
            flag = false;
            break;
        }

        case (turn === "white" && !(destination.y === +ySrc + 1 && (destination.x === +xSrc + 1 || destination.x === +xSrc - 1))): {
            console.log("WHITE MOVE IS NOT POSSIBLE");
            flag = false;
            break;
        }

        case (turn === "black" && !(destination.y === +ySrc - 1 && (destination.x === +xSrc + 1 || destination.x === +xSrc - 1))): {
            console.log("BLACK MOVE IS NOT POSSIBLE");
            flag = false;
            break;
        }

        default: {
            flag = true;
            break;
        }
    }
    
    return flag;
}

export function checkTakeoverPossibility(source, fields, turn) {
    let flag;

    const index = turn === "white" ? 1 : -1;

    console.log(index);
    // console.log(fields);

    const fieldsToTakeover = fields.filter(f => ((f.x === source.x - 1 || f.x === source.x + 1) && f.y === source.y + index));

    console.log(fieldsToTakeover);

    switch (turn) {
        case "white": {

            break;
        }

        case "black": {
            break;
        }
    
        default:
            break;
    }

    return flag;
}