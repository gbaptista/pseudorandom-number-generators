require 'minitest/autorun'

require './lib/prng/lcg'

class TestLCG < Minitest::Test
  def test_generate
    @lcg = PRNG::LCG.new(
      modulus: 5, multiplier: 2, increment: 3, seed: 0
    )

    assert_equal(3, @lcg.generate)
    assert_equal(4, @lcg.generate)
    assert_equal(1, @lcg.generate)
    assert_equal(0, @lcg.generate)
  end

  def test_constructor_with_invalid_variables
    vars = { modulus: 5, multiplier: 'A', increment: 3, seed: 0 }
    assert_raises(RuntimeError) { PRNG::LCG.new(vars) }

    # multiplier > modulus
    vars = { modulus: 5, multiplier: 7, increment: 3, seed: 0 }
    assert_raises(RuntimeError) { PRNG::LCG.new(vars) }
  end

  def test_constructor_with_valid_variables
    @lcg = PRNG::LCG.new(
      modulus: 5, multiplier: 2, increment: 3, seed: 0
    )

    assert_equal(5, @lcg.modulus)
    assert_equal(2, @lcg.multiplier)
    assert_equal(3, @lcg.increment)
    assert_equal(0, @lcg.seed)
  end

  def test_valid_variables?
    vars = { modulus: 5, multiplier: 'A', increment: 3, seed: 0 }
    assert_raises(RuntimeError) { PRNG::LCG.valid_variables?(vars) }

    # multiplier > modulus
    vars = { modulus: 5, multiplier: 7, increment: 3, seed: 0 }
    assert_raises(RuntimeError) { PRNG::LCG.valid_variables?(vars) }

    vars = { modulus: 5, multiplier: 2, increment: 3, seed: 0 }
    assert(PRNG::LCG.valid_variables?(vars))
  end

  def test_valid_relations?
    # multiplier > modulus
    vars = { modulus: 5, multiplier: 7, increment: 3, seed: 0 }
    assert_raises(RuntimeError) { PRNG::LCG.valid_relations?(vars) }

    # increment > modulus
    vars = { modulus: 5, multiplier: 2, increment: 9, seed: 0 }
    assert_raises(RuntimeError) { PRNG::LCG.valid_relations?(vars) }

    # seed > modulus
    vars = { modulus: 5, multiplier: 2, increment: 3, seed: 13 }
    assert_raises(RuntimeError) { PRNG::LCG.valid_relations?(vars) }

    vars = { modulus: 5, multiplier: 2, increment: 3, seed: 0 }
    assert(PRNG::LCG.valid_relations?(vars))
  end

  def test_valid_modulus?
    assert_raises(RuntimeError) { PRNG::LCG.valid_modulus?(-2)  }
    assert_raises(RuntimeError) { PRNG::LCG.valid_modulus?(0)   }
    assert_raises(RuntimeError) { PRNG::LCG.valid_modulus?(1.5) }

    assert(PRNG::LCG.valid_modulus?(1))
  end

  def test_valid_multiplier?
    assert_raises(RuntimeError) { PRNG::LCG.valid_multiplier?(-2)  }
    assert_raises(RuntimeError) { PRNG::LCG.valid_multiplier?(0)   }
    assert_raises(RuntimeError) { PRNG::LCG.valid_multiplier?(1.5) }

    assert(PRNG::LCG.valid_multiplier?(1))
  end

  def test_valid_increment?
    assert_raises(RuntimeError) { PRNG::LCG.valid_increment?(-2)  }
    assert_raises(RuntimeError) { PRNG::LCG.valid_increment?(1.5) }

    assert(PRNG::LCG.valid_seed?(0))
    assert(PRNG::LCG.valid_increment?(1))
  end

  def test_valid_seed?
    assert_raises(RuntimeError) { PRNG::LCG.valid_seed?(-2)  }
    assert_raises(RuntimeError) { PRNG::LCG.valid_seed?(1.5) }

    assert(PRNG::LCG.valid_seed?(0))
    assert(PRNG::LCG.valid_seed?(1))
  end
end
