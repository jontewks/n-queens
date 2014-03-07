/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other

// new function
// start at first spot on board, check if piece exists
// if no piece, place piece and check for conflict
// if no conflict, place piece
// call self

window.findNRooksSolution = function(n) {
  var board = new Board({n:n});
  var rows = board.rows();
  var lastRow = 0;
  var lastCol = 0;
  var solution = [];

  board.togglePiece(lastRow, lastCol);
  for (var i = 0; i < (n * n); i++) {
    for (var j = 0; j < n; j++) {
      for (var k = 0; k < n; k++) {
        if (rows[j][k] === 0) {
          board.togglePiece(j, k);
          if (board.hasAnyRooksConflicts()) {
            board.togglePiece(j, k);
          }
        }
      }
    }
  }

  for (var i = 0; i < n; i++) {
    solution.push(board.attributes[i]);
  }

  // outermost loop -- keeps track of the initial rook positioning, and we'll need to run it n * n times
  // 2nd outermost loop -- places rooks wherever they can be placed on the current row
  // inner loop -- moves to next column and places rooks....

  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};



// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var matrix = makeEmptyMatrix(n);
  var solutionCount = 0;

  // empty board has been generated
  var placeRooks = function(matrixPrevious, currentRow) {
    // base case -- save the board
    if (currentRow >= n) {
      // write the board to our solution object
      var checkBoard = new Board(JSON.parse(JSON.stringify(matrix)));
      if (!checkBoard.hasAnyRooksConflicts()) { solutionCount++; }
    } else {
      // iterates thru current row, toggles piece in spot currentCol, invokes the recursive, then untoggles the piece
      for (var currentCol = 0; currentCol < n; currentCol++) {
        matrixPrevious[currentRow][currentCol] = 1;
        placeRooks(matrixPrevious, currentRow + 1);
        matrixPrevious[currentRow][currentCol] = 0;
      }
    }
  };

  placeRooks(matrix, 0);
  return solutionCount;
};



// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var board = new Board({n:n});
  var rows = board.rows();
  var lastRow = 0;
  var lastCol = 0;
  var solution = [];

  board.togglePiece(lastRow, lastCol);
  for (var i = 0; i < (n * n); i++) {
    for (var j = 0; j < n; j++) {
      for (var k = 0; k < n; k++) {
        if (rows[j][k] === 0) {
          board.togglePiece(j, k);
          if (board.hasAnyQueensConflicts()) {
            board.togglePiece(j, k);
          }
        }
      }
    }
  }

  for (var i = 0; i < n; i++) {
    solution.push(board.attributes[i]);
  }

  // outermost loop -- keeps track of the initial rook positioning, and we'll need to run it n * n times
  // 2nd outermost loop -- places rooks wherever they can be placed on the current row
  // inner loop -- moves to next column and places rooks....

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};


// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  if (n === 0) { return 1; }
  var matrix = makeEmptyMatrix(n);
  var solutionCount = 0;

  // empty board has been generated
  var placeQueens = function(matrixPrevious, currentRow) {
    // base case -- save the board
    if (currentRow >= n) {
      // write the board to our solution object
      var checkBoard = new Board(JSON.parse(JSON.stringify(matrix)));
      if (!checkBoard.hasAnyQueensConflicts()) {
        solutionCount++;
      }
    } else {
      // iterates thru current row, toggles piece in spot currentCol, invokes the recursive, then untoggles the piece
      for (var currentCol = 0; currentCol < n; currentCol++) {
        matrixPrevious[currentRow][currentCol] = 1;
        placeQueens(matrixPrevious, currentRow + 1);
        matrixPrevious[currentRow][currentCol] = 0;
      }
    }
  };

  placeQueens(matrix, 0);
  return solutionCount;
};


var makeEmptyMatrix = function(n) {
  return _(_.range(n)).map(function() {
    return _(_.range(n)).map(function() {
      return 0;
    });
  });
};
