var tick = function(startGeneration) {
  var nextGeneration;
  // find the survivors for the next generation
  nextGeneration = startGeneration.filter(function(item, index, list) {
    var numNeighbours = countNeighbours(item, list);
    return numNeighbours > 1 && numNeighbours < 4;
  });

  // Find and combine the new cells with the survivors
  var newCells = startGeneration.map(function(el) {
    // get the neighbours and check if they can become live
    // returns an array of viable neighbours
    return getNeighbours(el).filter(function(item) {
      var numNeighbours = countNeighbours(item, startGeneration);
      return numNeighbours === 3;
    });
  })
  // flatten the arrays of neighbours
  .reduce(function(prevVal, curVal) {
    curVal.forEach(function(item) {
      prevVal.push(item);
    });
    return prevVal;
  }, [])
  .concat(nextGeneration);

  // remove duplicates
  return unique(newCells, xyComparator);
};

// return a filter to remove the element itself
var createFilterOutSelf = function(el) {
    return function(item) {
      return !(el.x === item.x && el.y === item.y);
    };
  },
  // return a filter to check if the element is a neighbour
  createNeighbourFilter = function(el) {
    return function(item) {
      var xDist = Math.abs(item.x - el.x),
          yDist = Math.abs(item.y - el.y);
      return xDist < 2 && yDist < 2;
    };
  };

// count the number of neighbours a cell has
var countNeighbours = function(el, list) {
  var filterOutSelf = createFilterOutSelf(el),
      filterNeighbours = createNeighbourFilter(el);
  
  return list.filter(filterNeighbours)
             .filter(filterOutSelf).length;
  
};

// used to check equality
var xyComparator = function(itemA, itemB) {
  return itemA.x === itemB.x && itemA.y === itemB.y;
};

// return an array with duplicates removed,
// accepts a comparison function for equality checking
var unique = function(arr, comparator) {
  var seen = [];
  arr.forEach(function(item) {
    var exists = seen.some(function(seenItem) {
      var passed =  comparator(item, seenItem);
      return passed;
    });
    if (exists === false) seen.push(item);
  });
  return seen;
};

// get the list of all possible neighbours for an element
var getNeighbours = function(el) {
  return [
    {x: el.x - 1, y: el.y - 1},
    {x: el.x,     y: el.y - 1},
    {x: el.x + 1, y: el.y - 1},
    {x: el.x - 1, y: el.y },
    {x: el.x + 1, y: el.y },
    {x: el.x - 1, y: el.y + 1},
    {x: el.x,     y: el.y + 1},
    {x: el.x + 1, y: el.y + 1}
  ];
};

module.exports = {
  tick           : tick,
  countNeighbours: countNeighbours,
  getNeighbours  : getNeighbours
};
