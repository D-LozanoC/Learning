import { WINNER_COMBOS } from "../constants";

export const checkWinnerFrom = (boardToCheck) => {
    for (const combo of WINNER_COMBOS) {
        const [a, b, c] = combo;
        if (
            boardToCheck[a] &&
            boardToCheck[a] === boardToCheck[b] &&
            boardToCheck[b] === boardToCheck[c]
        ) {
            return boardToCheck[a];
        }
    }
    return null;
}

export const checkEndGame = (boardToCheck) => {
    return boardToCheck.every(square => square);
}