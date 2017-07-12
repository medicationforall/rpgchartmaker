/**
 *   RPG Chart Maker source file HasAlphabetizeControl,
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
function HasAlphabetizeControl(){

  /**
	 * Sets the click hanlder for clicking on the alphabetize button.
	 */
  this.node.find('.alphabetizeButton').click($.proxy(function(coreNode,event){
    event.preventDefault();

    //get the order
    var order = $(this).data('order');
    coreNode.alphabetize(order);

    //flip the button for subsequent presses.
    if(order==='asc'){
      $(this).data('order','desc');
      $(this).text('Z-A');
    }else if(order==='desc'){
      $(this).data('order','asc');
      $(this).text('A-Z');
    }
  },null,this));

  /**
   * Defines what the sort logic is.
   */
  this.alphabetize=function(order){
    console.warn('alphabetize not set',this);
  };
}
