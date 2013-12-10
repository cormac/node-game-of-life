var cells = require('./cell-generator.js'),
    gridBuilder  = function() {
      var gridContainer = document.getElementById('grid'),
          i=0, j=0, width=50, height=50;
      for (i; i < width ; i++) {
        for (j=0; j < height ; j++) {
          var square = document.createElement('div');
          var classes = 'square x_' + j + ' y_' + i;
          square.className = classes;
          gridContainer.appendChild(square);
        }
      }
    };

module.exports = gridBuilder;
