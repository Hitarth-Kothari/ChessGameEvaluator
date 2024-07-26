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
    const fen = $('#fenInput').val();
    fetch('/calculate_best_move', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ fen: fen }),
    })
    .then(response => response.json())
    .then(data => {
      $('#bestMove').text('Best move: ' + data.best_move);
    })
    .catch((error) => {
      console.error('Error:', error);
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
