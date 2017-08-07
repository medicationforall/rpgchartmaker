/**
 *   Mjs source file Rng,
 *   Copyright (C) 2016 James M Adams
 *
 *   This program is free software: you can redistribute it and/or modify
 *   it under the terms of the GNU Lesser General Public License as published by
 *   the Free Software Foundation, either version 3 of the License, or
 *   any later version.
 *
 *   This program is distributed in the hope that it will be useful,
 *   but WITHOUT ANY WARRANTY; without even the implied warranty of
 *   MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *   GNU Lesser General Public License for more details.
 *
 *   You should have received a copy of the GNU Lesser General Public License
 *   along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

/**
 * Random number generator based on passed in seeds.
 * @class
 * @param {string} seed - used to make the rng pseudo-random.
 * @see ../../lib/seedrandom
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
 * Clears cached seeds.
 */
Rng.prototype.clearSeed=function(){
  this.seeds={};
};


/**
 * Returns a new random number from the seed.
 * @param {string} seed
 * @param {int} min
 * @param {int} max
 */
Rng.prototype.getRandom=function(seed, min, max){
  if(this.seeds[seed] ===undefined){
    this.createSeed(seed);
  }
  return ((this.seeds[seed]() * (max - min + 1)) + min)<<0;
};


/**
 * Initializes a seed. If it already exists throws an error.
 * @param {string} seed
 */
Rng.prototype.createSeed=function(seed){
  if(this.seeds[seed] !==undefined){
    throw 'Seed Already exists.';
  }
  this.seeds[seed]=new Math.seedrandom(seed);
};


Object.setPrototypeOf(Rng.prototype, Core.prototype);
