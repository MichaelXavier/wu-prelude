describe("wu prelude extensions", function() {
  describe("fst", function() {
    it("returns the first element of the pair", function() {
      expect(wu.fst(['a', 'b'])).toEqual('a');
    });

    it("is undefined for empty lists", function() {
      expect(wu.fst([])).toBeUndefined();
    });

    it("throws on non list", function() {
      expect(function() { wu.fst({one: 1, two: 2}); }).toFailMatch();
    });
  });

  describe("snd", function() {
    it("returns the second element of the pair", function() {
      expect(wu.snd(['a', 'b'])).toEqual('b');
    });

    it("is undefined for empty lists", function() {
      expect(wu.snd([])).toBeUndefined();
    });

    it("throws on non list", function() {
      expect(function() { wu.snd({one: 1, two: 2}); }).toFailMatch();
    });
  });

  describe("plus", function() {
    it("adds numbers together", function() {
      expect(wu.plus(3,4)).toEqual(7);
    });

    it("throws on invalid arguments", function() {
      expect(function() { wu.plus('a', 'b'); }).toFailMatch();
    });
  });

  describe("times", function() {
    it("multiplies numbers together", function() {
      expect(wu.times(3,4)).toEqual(12);
    });

    it("throws on invalid arguments", function() {
      expect(function() { wu.times('a', 'b'); }).toFailMatch();
    });
  });

  describe("negate", function() {
    it("flips the sign on the argument", function() {
      expect(wu.negate(1)).toEqual(-1);
      expect(wu.negate(-1)).toEqual(1);
    });

    it("throws on invalid arguments", function() {
      expect(function() { wu.negate('a'); }).toFailMatch();
    });
  });

  describe("abs", function() {
    it("returns the absolute value", function() {
      expect(wu.abs(1)).toEqual(1);
      expect(wu.abs(-1)).toEqual(1);
    });

    it("throws on invalid arguments", function() {
      expect(function() { wu.abs('a'); }).toFailMatch();
    });
  });

  describe("signum", function() {
    it("returns -1 for negative numbers", function() {
      expect(wu.signum(-5)).toEqual(-1);
    });

    it("returns 0 for 0", function() {
      expect(wu.signum(0)).toEqual(0);
    });

    it("returns 1 for positive numbers", function() {
      expect(wu.signum(5)).toEqual(1);
    });

    it("throws on invalid arguments", function() {
      expect(function() { wu.signum('a'); }).toFailMatch();
    });
  });

  describe("quot", function() {
    it("performs integer division", function() {
      expect(wu.quot(10, 3)).toEqual(3);
    });

    it("throws on invalid arguments", function() {
      expect(function() { wu.quot('a', 'b'); }).toFailMatch();
    });
  });

  xdescribe("rem", function() {
    it("returns the integer remainder", function() {
      expect(wu.quot(10, 3)).toEqual(1);
    });

    //TODO
    it("obeys Prelude's rule for rem", function() {
      var x = 10, y = 3;
      expect(wu.quot(x, y) * y + _.rem(x, y)).toEqual(x);
    });
  });

  describe("toInteger", function() {
    it("returns an integer when given one", function() {
      expect(wu.toInteger(10)).toEqual(10);
    });

    it("rounds down floats", function() {
      expect(wu.toInteger(3.5)).toEqual(3);
    });

    it("parses strings", function() {
      expect(wu.toInteger('3')).toEqual(3);
    });
  });

  describe("subtract", function() {
    it('subtracts', function() {
      expect(wu.subtract(6,4)).toEqual(2);
    });

    it("throws on invalid arguments", function() {
      expect(function() { wu.subtract('a', 'b'); }).toFailMatch();
    });
  });

  describe("even", function() {
    it("returns true if the number is even", function() {
      expect(wu.even(4)).toEqual(true);
    });
    it("returns false if the number is odd", function() {
      expect(wu.even(3)).toEqual(false);
    });

    it("throws on invalid arguments", function() {
      expect(function() { wu.even('a'); }).toFailMatch();
    });
  });

  describe("odd", function() {
    it("returns true if the number is odd", function() {
      expect(wu.odd(3)).toEqual(true);
    });
    it("returns false if the number is even", function() {
      expect(wu.odd(4)).toEqual(false);
    });
  });

  describe("pi", function() {
    it("returns the pi constant", function() {
      expect(wu.pi()).toEqual(Math.PI);
    });
  });

  describe("isInfinite", function() {
    it("returns true if the argument is Infinity", function() {
      expect(wu.isInfinite(Infinity)).toEqual(true);
    });

    it("returns false if the argument is not Infinity", function() {
      expect(wu.isInfinite(3)).toEqual(false);
    });
  });

  describe("cnst", function() {
    it("returns a function that always returns the same result", function() {
      var c = wu.cnst(10);
      expect(c('foo', 'bar')).toEqual(10);
    });
  });

  describe('plusplus', function() {
    describe("arrays", function() {
      beforeEach(function() {
        this.arg1 = [1,2];
        this.arg2 = [3,4];
      });

      it("concatenates", function() {
        expect(wu.plusplus(this.arg1, this.arg2)).toEqual([1,2,3,4]);
      });

      it("does not modify the original array", function() {
        wu.plusplus(this.arg1, this.arg2);
        expect(this.arg1).toEqual([1,2]);
        expect(this.arg2).toEqual([3,4]);
      });
    });
    
    describe("strings", function() {
      beforeEach(function() {
        this.arg1 = "one";
        this.arg2 = "two";
      });

      it("concatenates", function() {
        expect(wu.plusplus(this.arg1, this.arg2)).toEqual("onetwo");
      });

      it("does not modify the original string", function() {
        wu.plusplus(this.arg1, this.arg2);
        expect(this.arg1).toEqual("one");
        expect(this.arg2).toEqual("two");
      });
    });

    it("throws on invalid arguments", function() {
      expect(function() { wu.plusplus(10, 20); }).toFailMatch();
    });
  });

  xdescribe('init', function() {
    it("does not modify the original value", function() {
      var orig = [1,2,3,4];
      _.init(orig);
      expect(orig).toEqual([1,2,3,4]);
    });

    it("returns the list without the last element of the array", function() {
      expect(_.init([1,2,3,4])).toEqual([1,2,3]);
    });

    it("returns an empty list for a list with 1 element", function() {
      expect(_.init([1])).toEqual([]);
    });

    it("returns an empty list for an empty list", function() {
      expect(_.init([])).toEqual([]);
    });
  });

  xdescribe("null", function() {
    it("returns true if the array is empty", function() {
      expect(_.null([])).toEqual(true);
    })

    it("returns false if the array is not empty", function() {
      expect(_.null([1])).toEqual(false);
    })
  });

  xdescribe("!!", function() {
    it("returns the element in the array at the given index", function() {
      expect(_['!!'](2, [1,2,3,4])).toEqual(3);
    });
  });

  xdescribe("and", function() {
    it("returns true if all the elements in the array are true", function() {
      expect(_.and([true, true, true])).toEqual(true);
    });

    it("returns false if not all the elements in the array are true", function() {
      expect(_.and([true, false, true])).toEqual(false);
    });
  });

  xdescribe("or", function() {
    it("returns true if at least 1 of the elements in the list is true", function() {
      expect(_.or([false, false, true])).toEqual(true);
    });

    it("returns false if at none of the elements in the list is true", function() {
      expect(_.or([false, false, false])).toEqual(false);
    });
  });

  xdescribe("sum", function() {
    it('returns 0 for an empty list', function() {
      expect(_.sum([])).toEqual(0);
    });
    
    it("returns the sum of the elements", function() {
      expect(_.sum([1,2,3,4])).toEqual(10);
    });
  });

  xdescribe("product", function() {
    it('returns 1 for an empty list', function() {
      expect(_.product([])).toEqual(1);
    });
    
    it("returns the sum of the elements", function() {
      expect(_.product([1,2,3,4])).toEqual(24);
    });
  });

  xdescribe("concat", function() {
    it("concatenates nested lists (1 level) to a single list", function() {
      expect(_.concat([[1,2], [], [3,4]])).toEqual([1,2,3,4]);
    });

    it("returns an empty array if given an empty array", function() {
      expect(_.concat([])).toEqual([]);
    });
  });

  xdescribe("concatMap", function() {
    it("maps the function over the array then concatenates", function() {
      var fn = function(x) { return _.replicate(3, x); };
      expect(_.concatMap(fn, [1,2,3])).toEqual([1,1,1,2,2,2,3,3,3]);
    });
  });

  xdescribe("maximum", function() {
    it("returns the maximum of the list", function() {
      expect(_.maximum([1,2,4,3])).toEqual(4);
    });

    it("returns -Infinity on an empty list, lol", function() {
      expect(_.maximum([])).toEqual(-Infinity);
    });
  });

  xdescribe("minimum", function() {
    it("returns the minimum of the list", function() {
      expect(_.minimum([4,1,2,3])).toEqual(1);
    });

    it("returns Infinity on an empty list, lol", function() {
      expect(_.minimum([])).toEqual(Infinity);
    });
  });

  xdescribe("replicate", function() {
    it("produces an empty array when given a 0", function() {
      expect(_.replicate(0, 'x')).toEqual([]);
    });

    it("produces a filled array of the specified length", function() {
      expect(_.replicate(3, 'x')).toEqual(['x', 'x', 'x']);
    });
  });

  xdescribe("take", function() {
    it("returns an empty list when given 0", function() {
      expect(_.take(0, [1,2,3,4])).toEqual([]);
    });

    it("returns the specified elements from the front of the list", function() {
      expect(_.take(2, [1,2,3,4])).toEqual([1,2]);
    });

    it("returns as many elements as it can for a too-large count", function() {
      expect(_.take(5, [1,2,3,4])).toEqual([1,2,3,4]);
    });
  });

  xdescribe("drop", function() {
    it('returns the a copy of the original list when given 0', function() {
      expect(_.drop(0, [1,2,3,4])).toEqual([1,2,3,4]);
    });

    it("returns the remaining list after dropping the given count", function() {
      expect(_.drop(2, [1,2,3,4])).toEqual([3,4]);
    });

    it("returns an empty list when dropping too many", function() {
      expect(_.drop(5, [1,2,3,4])).toEqual([]);
    });
  })

  xdescribe("splitAt", function() {
    it("partitions the array at the given index", function() {
      expect(_.splitAt(2, [1,2,3,4])).toEqual([[1,2], [3,4]]);
    });

    it("returns an empty array in the first of the pair when index is 0", function() {
      expect(_.splitAt(0, [1,2,3,4])).toEqual([[], [1,2,3,4]]);
    });

    it("returns an empty array in the last of the pair when index is the size", function() {
      expect(_.splitAt(4, [1,2,3,4])).toEqual([[1,2,3,4], []]);
    });
  });

  xdescribe("takeWhile", function() {
    it('takes the prefix from the array where the predicate is true', function() {
      expect(_.takeWhile(_.even, [2,4,3,6])).toEqual([2,4])
    });

    it("returns an empty array if the array does not start with an element fulfilling the predicate", function() {
      expect(_.takeWhile(_.even, [1,2,4,3,6])).toEqual([]);
    });

    it("returns the whole array if it all fulfils the predicate", function() {
      expect(_.takeWhile(_.even, [2,4,6,8])).toEqual([2,4,6,8]);
    });
  });

  xdescribe("dropWhile", function() {
    it('drops the prefix from the array where the predicate is true', function() {
      expect(_.dropWhile(_.even, [2,4,3,6])).toEqual([3,6])
    });

    it("returns an empty array if all of it fulfils the predicate", function() {
      expect(_.dropWhile(_.even, [2,4,6,8])).toEqual([]);
    });

    it("returns the whole array if none of it fulfils the predicate", function() {
      expect(_.dropWhile(_.even, [1,3,5,7])).toEqual([1,3,5,7]);
    });
  });

  xdescribe("flip", function() {
    it("returns a function with the first 2 arguments transposed", function() {
      var fn  = function(a, b) { return [a + 1, b + 2]; },
          res = _.flip(fn);

      expect(res(10, 100)).toEqual([101, 12]);
    });

    it("leaves subsequent arguments alone", function() {
      var fn  = function(a, b, c, d) { return [a + 1, b + 2, c + 3, d + 4]; },
          res = _.flip(fn);

      expect(res(10, 100, 3, 4)).toEqual([101, 12, 6, 8]);
    });
  });
});
