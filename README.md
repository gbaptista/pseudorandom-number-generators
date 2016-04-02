# Pseudorandom Number Generators

## Ruby

Run tests:
```
bundle
rake test
```

### Usage

#### Linear Congruential Generator
```ruby
@lcg = PRNG::LCG.new(
  modulus: 5, multiplier: 2, increment: 3, seed: 0
)

@lcg.generate #=> 3
@lcg.generate #=> 4
@lcg.generate #=> 1
@lcg.generate #=> 0
```

## Javascript

Run tests:
```
npm install -g jasmine
jasmine
```

### Usage

#### Linear Congruential Generator
```javascript
var lcg = new PRNG.LCG.instance({
  modulus: 5, multiplier: 2, increment: 3, seed: 0
});

lcg.generate(); // 3
lcg.generate(); // 4
lcg.generate(); // 1
lcg.generate(); // 0
```
