if(typeof require !== 'undefined') {

  var PRNG = require('../src/lcg.js');

  describe('LCG', function() {
    it('test generate', function() {
      var lcg = new PRNG.LCG.instance({
        modulus: 5, multiplier: 2, increment: 3, seed: 0
      });

      expect(lcg.generate()).toBe(3);
      expect(lcg.generate()).toBe(4);
      expect(lcg.generate()).toBe(1);
      expect(lcg.generate()).toBe(0);
    });

    it('test constructor with invalid variables', function() {
      vars = { modulus: 5, multiplier: 'A', increment: 3, seed: 0 }
      expect(function() {
        new PRNG.LCG.instance(vars);
      }).toThrow(new Error('multiplier is not Integer'));

      // multiplier > modulus
      vars = { modulus: 5, multiplier: 7, increment: 3, seed: 0 }
      expect(function() {
        new PRNG.LCG.instance(vars)
      }).toThrow(new Error('multiplier is not < modulus'));
    });

    it('test constructor with valid variables', function() {
      var lcg = new PRNG.LCG.instance({
        modulus: 5, multiplier: 2, increment: 3, seed: 0
      });

      expect(lcg.modulus).toBe(5);
      expect(lcg.multiplier).toBe(2);
      expect(lcg.increment).toBe(3);
      expect(lcg.seed).toBe(0);
    });

    it('test valid variables', function() {
      vars = { modulus: 5, multiplier: 'A', increment: 3, seed: 0 }
      expect(function() {
        PRNG.LCG.valid_variables(vars);
      }).toThrow(new Error('multiplier is not Integer'));

      // multiplier > modulus
      vars = { modulus: 5, multiplier: 7, increment: 3, seed: 0 }
      expect(function() {
        PRNG.LCG.valid_variables(vars);
      }).toThrow(new Error('multiplier is not < modulus'));

      vars = { modulus: 5, multiplier: 2, increment: 3, seed: 0 }
      expect(function() { PRNG.LCG.valid_variables(vars); }).not.toThrow();
    });

    it('test valid relations', function() {
      vars = { modulus: 5, multiplier: 7, increment: 3, seed: 0 }
      expect(function() {
        PRNG.LCG.valid_relations(vars);
      }).toThrow(new Error('multiplier is not < modulus'));

      // increment > modulus
      vars = { modulus: 5, multiplier: 2, increment: 9, seed: 0 }
      expect(function() {
        PRNG.LCG.valid_relations(vars);
      }).toThrow(new Error('increment is not < modulus'));

      // seed > modulus
      vars = { modulus: 5, multiplier: 2, increment: 3, seed: 13 }
      expect(function() {
        PRNG.LCG.valid_relations(vars);
      }).toThrow(new Error('seed is not < modulus'));

      vars = { modulus: 5, multiplier: 2, increment: 3, seed: 0 }
      expect(function() { PRNG.LCG.valid_relations(vars); }).not.toThrow();
    });

    it('test valid modulus', function() {
      expect(function() {
        PRNG.LCG.valid_modulus(-2);
      }).toThrow(new Error('modulus is not > 0'));

      expect(function() {
        PRNG.LCG.valid_modulus(0);
      }).toThrow(new Error('modulus is not > 0'));

      expect(function() {
        PRNG.LCG.valid_modulus(1.5);
      }).toThrow(new Error('modulus is not Integer'));

      expect(function() { PRNG.LCG.valid_modulus(1); }).not.toThrow();
    });

    it('test valid multiplier', function() {
      expect(function() {
        PRNG.LCG.valid_multiplier(-2);
      }).toThrow(new Error('multiplier is not > 0'));

      expect(function() {
        PRNG.LCG.valid_multiplier(0);
      }).toThrow(new Error('multiplier is not > 0'));

      expect(function() {
        PRNG.LCG.valid_multiplier(1.5);
      }).toThrow(new Error('multiplier is not Integer'));

      expect(function() { PRNG.LCG.valid_multiplier(1); }).not.toThrow();
    });

    it('test valid increment', function() {
      expect(function() {
        PRNG.LCG.valid_increment(-2);
      }).toThrow(new Error('increment is not >= 0'));

      expect(function() {
        PRNG.LCG.valid_increment(1.5);
      }).toThrow(new Error('increment is not Integer'));

      expect(function() { PRNG.LCG.valid_increment(0); }).not.toThrow();
      expect(function() { PRNG.LCG.valid_increment(1); }).not.toThrow();
    });

    it('test valid seed', function() {
      expect(function() {
        PRNG.LCG.valid_seed(-2);
      }).toThrow(new Error('seed is not > 0'));
      expect(function() {
        PRNG.LCG.valid_seed(1.5);
      }).toThrow(new Error('seed is not Integer'));

      expect(function() { PRNG.LCG.valid_seed(0); }).not.toThrow();
      expect(function() { PRNG.LCG.valid_seed(1); }).not.toThrow();
    });
  });

}
