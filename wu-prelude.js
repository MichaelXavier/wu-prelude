(function() {
  wu.fst = wu.match([Array], function(pair) {
    return pair[0];
  });

  wu.snd = wu.match([Array], function(pair) {
    return pair[1];
  });

  wu.plus = wu.match([Number, Number], function(x, y) {
    return x + y;
  });

  wu.times = wu.match([Number, Number], function(x, y) {
    return x * y;
  });

  wu.negate = wu.match([Number], function(x) {
    return -x;
  });

  wu.abs = wu.match([Number], Math.abs);

  wu.signum = wu.match([Number], function(x) {
    return x < 0 ? -1 : x === 0 ? 0 : 1;
  });

  wu.quot = wu.match([Number, Number], function(x, y) {
    return Math.floor(x / y);
  });

  wu.rem = wu.match([Number, Number], function(x, y) {
    return x % y; //TOD: is this right?
  });

  wu.toInteger = function(x) {
    return parseInt(x, 10);
  };

  wu.subtract = wu.match([Number, Number], function(x, y) {
    return x - y;
  });

  wu.even = wu.match([Number], function(x) {
    return wu.rem(x, 2) === 0;
  });

  wu.odd = wu.not(wu.even);

  wu.pi = function() {
    return Math.PI;
  };
})();
