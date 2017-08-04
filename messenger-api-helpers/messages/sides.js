

const findSide = function(name) {
  return [...sides]
    .filter(x => {
      return x.title === name;
    })
    .pop();
};

module.exports = { sides, findSide };