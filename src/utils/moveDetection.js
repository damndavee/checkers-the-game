export function checkMovePossibility(destination, xSrc, ySrc, turn) {
    let flag;

    // const [xSrc, ySrc] = source;

    switch(true) {
        case destination.pawn.apperance: {
            console.log("MOVE IS NOT POSSIBLE");
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
    const index = turn === "white" ? 1 : -1;

    const fieldsToTakeover = fields.filter(f => ((f.x === source.x - 1 || f.x === source.x + 1) && f.y === source.y + index));
    const pawns = fieldsToTakeover.map(f => f.pawn);

    if(!pawns.some(pawn => pawn.player)) return false;

    switch (turn) {
        case "white": {

            return true;
        }
        
        case "black": {

            return true;
        }
    
        default:
            break;
    }

    // return flag;
}