var PRNG = {
  LCG: {
    instance: function (params) {
      var self = this;

      self.generate = function() {
        var m   = self.modulus;
        var a   = self.multiplier;
        var c   = self.increment;
        var x_n = (self.last_x != undefined ? self.last_x : self.seed);

        self.last_x = ((a * x_n) + c) % m;

        return self.last_x;
      }

      self.initialize = function(params) {
        PRNG.LCG.valid_variables(params);

        self.modulus    = params['modulus'];
        self.multiplier = params['multiplier'];
        self.increment  = params['increment'];
        self.seed       = params['seed'];
      }

      self.initialize(params);
    },

    valid_variables: function(params) {
      PRNG.LCG.valid_modulus(params['modulus']);
      PRNG.LCG.valid_multiplier(params['multiplier']);
      PRNG.LCG.valid_increment(params['increment']);
      PRNG.LCG.valid_seed(params['seed']);

      PRNG.LCG.valid_relations(params);
    },

    valid_relations: function(params) {
      if(!(params['multiplier'] < params['modulus']))
        throw new Error('multiplier is not < modulus');

      if(!(params['increment'] < params['modulus']))
        throw new Error('increment is not < modulus');

      if(!(params['seed'] < params['modulus']))
        throw new Error('seed is not < modulus');

      return true;
    },

    valid_modulus: function(value) {
      if(!(Number(value) === value && value % 1 === 0))
        throw new Error('modulus is not Integer');

      if(!(value > 0))
        throw new Error('modulus is not > 0');
    },

    valid_multiplier: function(value) {
      if(!(Number(value) === value && value % 1 === 0))
        throw new Error('multiplier is not Integer');

      if(!(value > 0))
        throw new Error('multiplier is not > 0');
    },

    valid_increment: function(value) {
      if(!(Number(value) === value && value % 1 === 0))
        throw new Error('increment is not Integer');

      if(!(value >= 0))
        throw new Error('increment is not >= 0');
    },

    valid_seed: function(value) {
      if(!(Number(value) === value && value % 1 === 0))
        throw new Error('seed is not Integer');

      if(!(value >= 0))
        throw new Error('seed is not > 0');
    }
  }
}

if(typeof module !== 'undefined' && module.hasOwnProperty('exports')) {
  module.exports = PRNG;
}
