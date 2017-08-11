/**
 *   RPG Chart Maker source file ListGroup,
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

/**
 * Simple list with controls for CRUD operations Create, Read, Update, and Delete.
 * @class
 * @see Base.js
 * @see html/ListGroup.html
 * @param {boolean} animate - flag for animating the object when initialized.
 */
function ListGroup(animate){
  Base.call(this, animate);
  HasListGroupLoad.call(this);

  this.orderList=undefined;


  /**
   * constructor
   */
  this._constructor = function(){
    if(animate!==undefined){
      this.animate=animate;
    }
    this._resolveTemplate(ListGroup,'ListGroup');
  };


  /**
   * Sets up the html node, click handlers, sort handlers, and other controls.
   * @param {string} template
   * @private
   */
  this._setup=function(template){
    this.setupBase(template);

    HasUniqueControl.call(this);
    HasListGroupAdd.call(this);
    HasListGroupEdit.call(this);
    HasListMenu.call(this);
    this.setupAlphabetize();

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
   * Defines what the sort logic is for an list.
   */
  this.setupAlphabetize=function(){
    this.alphabetize=function(order){
      var list = this.orderList.find('li');

      list.sort(function(a,b){
        aText = $(a).find('.nameText').text();
        bText = $(b).find('.nameText').text();

        if(aText > bText){
          if(order==='asc'){
            return 1;
          }else if('desc'){
            return -1;
          }
        }

        if(aText < bText){
          if(order==='asc'){
            return -1;
          }else if('desc'){
            return 1;
          }
        }
        return 0;
      });

      //set the list
      list.detach().appendTo(this.orderList);
    };
  };


  /**
   *
   */
  this.gatherListData=function(obj){
    //initialize list entries
    obj.list=[];

    //fill out type
    obj.type='ListGroup';

    //fill out list
    this.node.find('ol li span.nameText').each(function(index, item){
      obj.list.push($(item).text());
    });

    return obj;
  };

  //main
  this._constructor();
}

Object.setPrototypeOf(ListGroup.prototype, Base.prototype);
