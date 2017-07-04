/**
 *   RPG Chart Maker source file HasListMenu,
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
function HasListMenu(){


  /**
   * Register copy button.
   */
   this.node.find('.copyButton').on('click',$.proxy(function(event){
     event.preventDefault();
     console.log('clicked copy button',this.gatherData());

     this.node.find('.copyInput').select();
     document.execCommand("copy");
   },this));


  /**
   * Fill out the copy input.
   */
   this.openMenu=function(){
     this.setupCopy();
   };


  /**
   *
   */
   this.setupCopy=function(){
     this.node.find('.copyInput').val(JSON.stringify(this.gatherData()));
   };


}
