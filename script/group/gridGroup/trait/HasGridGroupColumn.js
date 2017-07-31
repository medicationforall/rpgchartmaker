/**
 *   RPG Chart Maker source file HasGridGroupColumn,
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
function HasGridGroupColumn(){
  this.columns=3;
  this.columnsWidth=95;

  /**
   * Grid columns change
   */
  this.node.on('input','input[name="gridColumns"]',$.proxy(function(coreNode,event){
    console.log('change gridColumns');
    var value = parseInt($(this).val());
    coreNode.setColumns(value);
  },null,this));


  /**
   * Set The columns
   */
  this.setColumns=function(value){
    console.log('setColumns',value);
    this.columns=value;
    this.node.find('.content').css('min-width',(this.columns*this.columnsWidth)+'px');
    this.node.find('ol').css('width',(this.columns*this.columnsWidth)+'px');
  };
}
