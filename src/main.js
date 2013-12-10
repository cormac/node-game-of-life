/*global */
// Author: Cormac McGuire
// ### Description: 
// 

var gol = require('./index.js'),
    tick = gol.tick,
    gridBuilder = require('./grid-builder.js');

document.addEventListener("DOMContentLoaded", function(event) {
  var startGeneration = [];
  var seedGeneration = function() {
    for (var i = 0; i < 50; i++) {
      for (var j = 0; j < 50; j++) {
        if (Math.random() > .9) {
          startGeneration.push({x: i, y: j});
        }
      };
    };
  };
  seedGeneration();

  var forEach = Array.prototype.forEach,
      squares = document.getElementsByClassName('square'),
      prevGeneration = [],

      deadTheSquares = function(nodeList) {
        forEach.call(nodeList, function(square) {
          square.className = square.className + ' dead';
        });
      },
      deadSquaresFromCoords = function(item) {
        var coordClass = '.x_' + item.x + '.y_' + item.y, 
            square = document.querySelector(coordClass);
        if (square) {
          var classes = square.className.split(' ');
          square.className = classes[0] + ' ' + classes[1] + ' ' + classes[2] + ' dead';
        }
      },
      liveTheSquares = function (item) {
        var coordClass = '.x_' + item.x + '.y_' + item.y, 
            square = document.querySelectorAll(coordClass)[0];
        if (square) {
          classes = square.className.split(' ');
          square.className = classes[0] + ' ' + classes[1] + ' ' + classes[2];
        }
      };

    gridBuilder();
    deadTheSquares(squares);

  window.setInterval(function() {
    console.log('tick', startGeneration.length);
    prevGeneration.forEach(deadSquaresFromCoords);
    startGeneration.forEach(liveTheSquares);
    prevGeneration = startGeneration;
    startGeneration = tick(startGeneration);
  }, 200);
});
