module.exports = (function() {

  var i= 0, j=0, startCells = [];
  for (i; i < 50; i++) {
    for (j; j < 50; j++) {
      if (Math.round(Math.random()) === 1) {
        startCells.push({x:i, y:j});
      }
    }
  }
  return startCells;
}());
