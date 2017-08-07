/**
 *   RPG Chart Maker source file HasFillOut,
 *   Copyright (C) 2016  James M Adams
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
function HasFillOut(){

  /**
   * Fill out name from param data.
   * @param {Object} list - list data params.
   */
  this.fillOutName=function(list){
    //fill out name
    this.node.find('input[name=listGroupName]').val(list.name).trigger('input');
  };


  /**
   * Fill out roll from param data.
   * @param {Object} list - list data params.
   */
  this.fillOutRoll=function(list){
    //fill out roll
    if(list.roll!==undefined){
      if(list.roll=='true'){
        list.roll = true;
      }else if(list.roll=='false'){
        list.roll=false;
      }
      this.setRollValue(list.roll);
    }
  };


  /**
   * Fill out unique from param data.
   * @param {Object} list - list data params.
   */
  this.fillOutUnique=function(list){
    //fill out unique
    if(list.unique!==undefined){
      if(list.unique=='true'){
        list.unique = true;
      }else if(list.unique=='false'){
        list.unique=false;
      }
      this.setUnique(list.unique);
    }
  };
}
