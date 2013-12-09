//Any live cell with fewer than two live neighbours dies, as if caused by under-population.
//Any live cell with two or three live neighbours lives on to the next generation.
//Any live cell with more than three live neighbours dies, as if by overcrowding.
//Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.

var expect = require('chai').expect,
    gol = require('../index.js'),
    countNeighbours = gol.countNeighbours,
    unique          = gol.unique,
    tick            = gol.tick,
    xyComparator    = gol.xyComparator,
    getNeighbours   = gol.getNeighbours;

describe('game of life test suite', function() {
  var startGeneration = [
    {x: 1, y: 0},               // 0 1 0 0
    {x: 1, y: 1},               // 0 1 0 0
    {x: 0, y: 2}, {x: 1, y: 2}, // 1 1 0 0
    {x: 0, y: 3}, {x: 1, y: 3}  // 1 1 0 0
  ];


  beforeEach(function() {
    
  });

  afterEach(function() {
  });

  it('should calculate the number of neighbours', function(){
    expect(countNeighbours({x: 1, y: 0}, startGeneration)).to.equal(1);
  });

  it('should get the neighbours of an element', function(){
    var el  = {x: 0, y:0},
        neighbours = getNeighbours(el);
    expect(countNeighbours(el, neighbours)).to.equal(8);
  });

  it('should die if it is surrounded by less than two cells', function(){
    var elements = tick(startGeneration).filter(function(cell) {
      return cell.x === 1 && cell.y === 0;
    });
    expect(elements.length).to.equal(0);
  });

  it('should die if it is surrounded by more than three cells', function(){
    var elements = tick(startGeneration).filter(function(cell) {
      return cell.x === 1 && cell.y === 2;
    });
    expect(elements.length).to.equal(0);
  });

  it('should generate a new cell if surrounded by three live cells only', function(){
    var elements = tick(startGeneration).filter(function(cell) {
      return cell.x === 2 && cell.y === 1;
    });
    expect(elements.length).to.equal(1);
  });

});
