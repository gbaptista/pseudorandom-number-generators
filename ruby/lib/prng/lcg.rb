module PRNG
  class LCG
    attr_reader :modulus, :multiplier, :increment, :seed

    def generate
      m   = @modulus
      a   = @multiplier
      c   = @increment
      x_n = ((defined? @last_x) ? @last_x : @seed)

      @last_x = ((a * x_n) + c) % m
    end

    def initialize(
      modulus: nil, multiplier: nil, increment: nil, seed: nil
    )
      PRNG::LCG.valid_variables?(
        modulus:   modulus,   multiplier: multiplier,
        increment: increment, seed:       seed
      )

      @modulus    = modulus
      @multiplier = multiplier
      @increment  = increment
      @seed       = seed
    end

    def self.valid_variables?(
      modulus: nil, multiplier: nil, increment: nil, seed: nil
    )
      valid_modulus? modulus
      valid_multiplier? multiplier
      valid_increment? increment
      valid_seed? seed

      valid_relations?(
        modulus:   modulus,   multiplier: multiplier,
        increment: increment, seed:       seed
      )
    end

    def self.valid_relations?(
      modulus:   nil, multiplier: nil,
      increment: nil, seed:       nil
    )
      raise 'multiplier is not < modulus' unless multiplier < modulus
      raise 'increment is not < modulus'  unless increment  < modulus
      raise 'seed is not < modulus'       unless seed       < modulus
      true
    end

    def self.valid_modulus?(value)
      raise 'modulus is not Integer' unless value.is_a? Integer
      raise 'modulus is not > 0'     unless value > 0
      true
    end

    def self.valid_multiplier?(value)
      raise 'multiplier is not Integer' unless value.is_a? Integer
      raise 'multiplier is not > 0'     unless value > 0
      true
    end

    def self.valid_increment?(value)
      raise 'increment is not Integer' unless value.is_a? Integer
      raise 'increment is not >= 0'     unless value >= 0
      true
    end

    def self.valid_seed?(value)
      raise 'seed is not Integer' unless value.is_a? Integer
      raise 'seed is not >= 0'    unless value >= 0
      true
    end
  end
end
