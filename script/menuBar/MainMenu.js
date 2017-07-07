/**
 *   RPG Chart Maker source file MainMenu,
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
 * Main Menu Functionality.
 * @class
 * @see index.html
 */
function MainMenu(){
  //data
  this.node=undefined;


  /**
   * constructor
   */
  this._constructor = function(){
    this._setup();
  };


  /**
   * Sets up the main menu buttons.
   * @private
   */
  this._setup=function(){
    this.node = $('.menuBar');
    HasGatherData.call(this);
    HasLoadData.call(this);
    HasOpenMenuButtons.call(this);
    HasAddMenu.call(this);
    HasSaveMenu.call(this);
    HasLoadMenu.call(this);
    HassRollButton.call(this);
    HasListNameInput.call(this);
    HasSettingsMenu.call(this);

    $.getJSON('config.json',$.proxy(function(data){
      if(data.enableShare){
        this.node.find('.shareButton').css('display','inline-block');
        this.servlet=data.servlet;
        HasShare.call(this);
      }
    },this));

    //set coreNode
    $.data(this.node[0],'coreNode',this);
  };


  /**
   * Called prior to loading a user defined chart.
   */
  this.clearAll=function(){
    if($('.hamburger select[name="clearList"]').val()==="all"){
      $('.list, .rollContainer').remove();
    } else if($('.hamburger select[name="clearList"]').val()==="lists"){
      $('.list').remove();
    } else if($('.hamburger select[name="clearList"]').val()==="rolls"){
      $('.rollContainer').remove();
    }
  };


  //main
  this._constructor();
}
