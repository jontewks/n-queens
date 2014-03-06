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
  var board = new Board({n:n});
  var rows = board.rows();
  var startRow = 0;
  var startCol = 0;
  var matrix = [];
  var solution = {};
  var tempMatrix = [];

  // outermost loop, values incrementing:
  // startRow (and startCol, if startRow > n)
  for (var i = 0; i < (n * n); i++) {
    // console.log('row:', startRow);
    // console.log('col:', startCol);
    // console.log('-----------');
    board.togglePiece(startRow, startCol);

    // middle loop, values incrementing:
    // j (the row that we are currently toggling new pieces on)
    for (var j = 0; j < n; j++) {

      // inner loop, value inc:
      // k (the column we are toggling on)
      for (var k = 0; k < n; k++) {
        if (rows[j][k] === 0) {
          board.togglePiece(j, k);
          if (board.hasAnyRooksConflicts()) {
            console.log('conflicts');
            board.togglePiece(j, k);
          }
        }
      }
      // end inner
    }
    // end middle
    // end of each individual solution board

    for (var l = 0; l < n; l++) {
      matrix.push(board.attributes[l]);
    }

    tempMatrix = matrix.slice();

    if (_.reduce(_.flatten(tempMatrix), function(memo, num){ return memo + num; }) === n) {
      var key = JSON.stringify(matrix);
      console.log('erwer');
      console.log(matrix);
      solution[key] = true;
    }

    board = new Board({n:n});
    matrix = [];

    if (++startRow === n) {
      startRow = 0;
      startCol++;
    }
  }
  // end outer

  var solutionCount = Object.keys(solution).length;
  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
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
