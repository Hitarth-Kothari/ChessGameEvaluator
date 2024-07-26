# Chess Game Evaluator

This is a JavaScript-based chess game where users can set up a chess board, calculate the best move for White using the Lichess API, and automatically play that move on the board.

## Features

- Drag and drop pieces to set up any position on the chessboard.
- Fetch the best move for White using the Lichess Cloud Evaluation API.
- Automatically play the best move on the board.

## Limitations

- Currently, only moves for White are calculated and played.
- No input for special moves such as castling, en passant, or pawn promotion.
- Only standard chess positions are supported; other variants are not implemented.

## How to Use

1. Open the `index.html` file in your web browser.
2. Set up the chess board by clicking on a piece below the board and placing it on the desired square.
3. Click the "Calculate Best Move" button to fetch and play the best move for White.

## Lichess API

This project uses the [Lichess Cloud Evaluation API](https://lichess.org/api/cloud-eval) to fetch the best move for a given position.

### Example API Call

    ```http
    GET https://lichess.org/api/cloud-eval?fen=<FEN_STRING>
    '''
fen: The FEN string representing the current board position.

## File Structure

- `index.html`: The main HTML file containing the structure of the chessboard and pieces.
- `style.css`: The CSS file for styling the chessboard and pieces.
- `script.js`: The JavaScript file containing the logic for setting up the board, fetching the best move, and playing the move.

## Acknowledgements

- [Lichess](https://lichess.org/) for providing the API to fetch the best moves.
- [Tailwind CSS](https://tailwindcss.com/) for providing utility-first CSS framework.
