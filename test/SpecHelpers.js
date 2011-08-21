beforeEach(function() {
  this.addMatchers({
    toFailMatch: function() {
      try {
        this.actual();
      } catch(e) {
        return e instanceof TypeError &&
          e.message == "wu.match: The form did not match any given pattern.";
      }
      return false;
    }
  });
});
