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
  var boardNew = new Board({n:n});
  var rows = board.rows();
  var currentRow = 0;
  var matrix = [];
  var solution = {};
  var tempMatrix = [];

  // empty board has been generated
  var placeRooks = function(boardPrevious, currentRow) {
    // base case -- save the board
    if (currentRow >= n - 1) {
      // write the board to our solution object
    }

    // iterates thru current row, toggles piece in spot currentCol, invokes the recursive, then untoggles the piece
    for (var currentCol = 0; currentCol < n; currentCol++) {
      boardPrevious.togglePiece(currentRow, currentCol);
      placeRooks(boardPrevious, currentRow + 1);
      boardPrevious.togglePiece(currentRow, currentCol);
    }
  }


};



// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = undefined; //fixme

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};


// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
