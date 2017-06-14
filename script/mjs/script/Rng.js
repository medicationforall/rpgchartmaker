/**
 * Random number generator based on passed in seeds.
 * @see ../lib/seedrandom
 * Written by James Adams Copyright 2016
 * @todo change how the rng's are stored so that they aren't registered directly against the rng object.
 */
function Rng(seed){
  Core.call(this);

  this.seeds={};

  this._constructor=function(){
    if(seed){
      this.createSeed(seed);
    }
  };

  //main
  this._constructor();
}


/**
 *
 */
Rng.prototype.clearSeed=function(){
  this.seeds={};
};


/**
 * Returns a new random number from the seed.
 */
Rng.prototype.getRandom=function(seed, min, max){
  if(this.seeds[seed] ===undefined){
    this.createSeed(seed);
  }
  return ((this.seeds[seed]() * (max - min + 1)) + min)<<0;
};


/*
 * Initializes a seed. If it already exists throws an error.
 */
Rng.prototype.createSeed=function(seed){
  if(this.seeds[seed] !==undefined){
    throw 'Seed Already exists.';
  }

  this.seeds[seed]=new Math.seedrandom(seed);
};


Object.setPrototypeOf(Rng.prototype, Core.prototype);
