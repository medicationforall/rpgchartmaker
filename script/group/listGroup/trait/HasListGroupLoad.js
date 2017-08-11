/**
 *   RPG Chart Maker source file HasListGroupLoad,
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

/**
 * List Group Load Mixin.
 * @mixin
 */
function HasListGroupLoad(){


  /**
   * Load list name, and ol list with data.
   * @param {Object} list - JSON List Data.
   */
  this.fillOutList=function(list){

    this.fillOutName(list);
    this.fillOutRoll(list);

    if(this instanceof ListGroup){
      this.fillOutUnique(list);
    }

    //fill out List
    for(var j=0,item;(item=list.list[j]);j++){
      this.AddToList(item);
    }

    if(this instanceof GridGroup){
      this.fillOutGridGroup(list);
    }
  };


  /**
   * Specific fill out controls grids
   */
  this.fillOutGridGroup=function(list){

    //fill out columns
    if(list.columns !== undefined){
      this.node.find('input[name=gridColumns]').val(list.columns).trigger('input');
    }

    //fill out selected cell
    if(list.selectedCell !== undefined){
      this.node.find('ol li:nth-child('+(list.selectedCell+1)+')').trigger('click');
    }
  };


  /**
   * Multiline text loader.
   */
  this.fillOutRawList=function(text){
    //fill out List
    var lines = text.split(/\r?\n/);

    // determine if a line number is included.
    var hasListNumber = this.revolseRawNumberFormat(lines);

    // Loop through the lines.
    for(var i=0,line;(line=lines[i]);i++){
      var value = line.trim();
      var occurrances = 1;

      if(value && value !== ''){

        //parse out the number format
        if(hasListNumber){

          //resove range
          var match = line.match(/^(\d+)[.]?-?(\d*)[.]?\s/);
          if(match && match[1] && match[2] && match[1] !=='' && match[2] !=='' ){
            var start = parseInt(match[1]);
            var end = parseInt(match[2]);

            if(start < end && end - start > 0){
              occurrances = end - start;
              occurrances++;
            }
          }

          line = line.replace(/^(\d+)[.]?-?(\d*)[.]?\s/,'');
        }

        for(var j=0;j<occurrances;j++){
          this.AddToList(line);
        }
      }
    }
  };


  /**
   *
   */
  this.revolseRawNumberFormat=function(lines){
    var hasNumbers = true;

    for(var i=0,line;(line=lines[i]);i++){
      if(line.match(/^(\d+)[.]?-?(\d*)[.]?\s/)===null){
        hasNumbers = false;
        break;
      }
    }
    return hasNumbers;
  };
}
