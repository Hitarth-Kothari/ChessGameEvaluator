let selectedPiece = null;
let deleteMode = false;

$(document).ready(function() {
  const pieces = {
    'w_king': '&#9812;',
    'w_queen': '&#9813;',
    'w_bishop': '&#9815;',
    'w_knight': '&#9816;',
    'w_rook': '&#9814;',
    'w_pawn': '&#9817;',
    'b_king': '&#9818;',
    'b_queen': '&#9819;',
    'b_bishop': '&#9821;',
    'b_knight': '&#9822;',
    'b_rook': '&#9820;',
    'b_pawn': '&#9823;',
    'delete': '&#128465;'
  };

  const initialPositions = [
    'w_king', 'w_queen', 'w_bishop', 'w_knight', 'w_rook', 'w_pawn', 'b_king',
    'b_queen', 'b_bishop', 'b_knight', 'b_rook', 'b_pawn', 'delete'
  ];

  initialPositions.forEach((piece, index) => {
    if (piece) {
      const id = `#piece_${index + 1}`;
      $(id).html(pieces[piece]).attr('data-piece', piece);
    }
  });

  $('.gamecell').click(function() {
    const cellId = $(this).attr('id');
    if (deleteMode && !cellId.startsWith('piece')) {
      $(this).html('');
      $(this).attr('chess', 'null');
    } else if (selectedPiece && !cellId.startsWith('piece')) {
      $(this).html(getPieceHtml(selectedPiece));
      $(this).attr('chess', selectedPiece);
    }
  });

  $('.gamecell').not('[id^="piece"]').click(function() {
    const cellId = $(this).attr('id');
    if (deleteMode) {
      $(this).html('');
      $(this).attr('chess', 'null');
    } else if (selectedPiece) {
      $(this).html(getPieceHtml(selectedPiece));
      $(this).attr('chess', selectedPiece);
    }
  });

  $('.gamecell[id^="piece"]').click(function() {
    const pieceType = $(this).attr('data-piece');
    if (pieceType === 'delete') {
      deleteMode = true;
      selectedPiece = null;
    } else {
      selectedPiece = pieceType;
      deleteMode = false;
    }
  });

  $('#calculateButton').click(function() {
    const fen = generateFEN();
    fetch(`https://lichess.org/api/cloud-eval?fen=${encodeURIComponent(fen)}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    })
    .then(response => response.json())
    .then(data => {
      if (data && data.pvs && data.pvs[0] && data.pvs[0].moves) {
        const bestMove = data.pvs[0].moves.split(' ')[0];
        $('#bestMove').text('Best move: ' + bestMove);
        playBestMove(bestMove);
      } else {
        $('#bestMove').text('No move found');
      }
    })
    .catch((error) => {
      console.error('Error:', error);
      $('#bestMove').text('Error fetching move');
    });
  });
});

function getPieceHtml(piece) {
  const pieces = {
    'w_king': '&#9812;',
    'w_queen': '&#9813;',
    'w_bishop': '&#9815;',
    'w_knight': '&#9816;',
    'w_rook': '&#9814;',
    'w_pawn': '&#9817;',
    'b_king': '&#9818;',
    'b_queen': '&#9819;',
    'b_bishop': '&#9821;',
    'b_knight': '&#9822;',
    'b_rook': '&#9820;',
    'b_pawn': '&#9823;',
    'delete': '&#128465;'
  };
  return pieces[piece];
}

function generateFEN() {
  let fen = '';
  for (let row = 8; row >= 1; row--) {
    let emptyCount = 0;
    for (let col = 1; col <= 8; col++) {
      const cell = $(`#${col}_${row}`).attr('chess');
      if (cell === 'null' || !cell) {
        emptyCount++;
      } else {
        if (emptyCount > 0) {
          fen += emptyCount;
          emptyCount = 0;
        }
        fen += getFENChar(cell);
      }
    }
    if (emptyCount > 0) {
      fen += emptyCount;
    }
    if (row > 1) {
      fen += '/';
    }
  }
  fen += ' w - - 0 1'; // Add default FEN suffix for turn and castling rights
  return fen;
}

function getFENChar(piece) {
  const fenMap = {
    'w_king': 'K',
    'w_queen': 'Q',
    'w_bishop': 'B',
    'w_knight': 'N',
    'w_rook': 'R',
    'w_pawn': 'P',
    'b_king': 'k',
    'b_queen': 'q',
    'b_bishop': 'b',
    'b_knight': 'n',
    'b_rook': 'r',
    'b_pawn': 'p'
  };
  return fenMap[piece];
}

function playBestMove(move) {
  const from = move.substring(0, 2);
  const to = move.substring(2, 4);
  const fromCol = from.charCodeAt(0) - 96; // 'a' is 97 in charCode
  const fromRow = parseInt(from[1]);
  const toCol = to.charCodeAt(0) - 96; // 'a' is 97 in charCode
  const toRow = parseInt(to[1]);

  const piece = $(`#${fromCol}_${fromRow}`).attr('chess');
  $(`#${fromCol}_${fromRow}`).html('').attr('chess', 'null');
  $(`#${toCol}_${toRow}`).html(getPieceHtml(piece)).attr('chess', piece);
}
