/**
 *   RPG Chart Maker source file HasSeed,
 *   Copyright (C) 2017  James M Adams
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
function HasSeed(){


  /**
   *
   */
  this.node.find('input[name="seed"]').on('input',$.proxy(function(coreNode,event,params){
    //console.log($(this).val());
    //remove error state
    $(this).removeClass('error');

    //set the seed
    var seed = $(this).val();
    coreNode.seed= seed;

    //change the title
    coreNode.node.find('.title').text(seed);
    coreNode.setupColorSelector(seed);

    //change the roll results
    if(params === undefined || params.triggerRoll !== false){
      coreNode.roll();
    }
  },null,this));

  /**
   *
   */
  this.setupColorSelector=function(seed){
    //get the data label
    this.node.find('.colorSelector').attr('data-selector','.handle[data-label="'+seed+'"]');
  };
}
