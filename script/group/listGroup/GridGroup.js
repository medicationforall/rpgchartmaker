/**
 *   RPG Chart Maker source file GridGroup,
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
 * Grid List.
 * @class
 * @see Base.js
 * @see html/GridGroup.html
 * @param {boolean} animate - flag for animating the object when initialized.
 */
function GridGroup(animate){
  Base.call(this, animate);
  HasListGroupLoad.call(this);

  /**
   * constructor
   */
  this._constructor = function(){
    if(animate!==undefined){
      this.animate=animate;
    }
    this._resolveTemplate(GridGroup,'GridGroup');
  };


  /**
   * Sets up the html node, click handlers, sort handlers, and other controls.
   * @param {string} template
   * @private
   */
  this._setup=function(template){
    this.setupBase(template);

    HasGridGroupColumn.call(this);
    HasListGroupAdd.call(this);
    HasListGroupEdit.call(this);
    HasListMenu.call(this);
    //this.setupAlphabetize();

    $(this).trigger('loaded');
  };

  /**
   * Sets the internal ol tag tag to sortable also allows dragging list entries between lists.
   * @private
   */
  this.setupSortable=function(){
    this.orderList = this.node.find('ol');
    this.orderList.sortable({connectWith: ".list ol"});
  };


  /**
   *
   */
  this.gatherListData=function(obj){
    //initialize list entries
    obj.list=[];

    //fill out type
    obj.type='GridGroup';

    //fill out columns
    obj.columns = this.columns;

    //fill out list
    this.node.find('ol li').each(function(index, item){
      obj.list.push($(item).text());
    });

    return obj;
  };


  //main
  this._constructor();

}

Object.setPrototypeOf(GridGroup.prototype, Base.prototype);
