/**
 *   RPG Chart Maker source file HasShare,
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
 * Share Button Mixin.
 */
function HasShare(){
  this.currentHash=undefined;


  /**
   * Click on share button.
   */
  this.node.find('.shareButton').click($.proxy(function(event){
    event.preventDefault();
    var listNameInput =this.node.find('input[name=listName]');

    //verify that chart name isn't empty
    if(listNameInput.val()!==''){
      data ={};
      data.chart = this.gatherData();
      data.requestType='store';

      $.ajax(this.servlet,{'data':data, dataType:'json', method:'POST'}).done(function(data){
        if(data.success){
          this.currentHash=data.id;
          window.location.hash = data.id;
        }
      }).fail(function(msg){
        console.warn('failed call to chartStore',msg.responseText);
      });
    }else{
      listNameInput.addClass('error');
    }
  },this));


  /**
   * Url hash change.
   */
   $(window).on('hashchange',$.proxy(function(event){
       console.log('trigger hashchange');
       if(window.location.hash !== this.currentHash){
         this._loadHash(window.location.hash);
       }
   },this));


   /**
    * Calls a configured servlet to resolve the chart data for a sha1 hash.
    * @param {string} hash - sha1.
    * @private
    */
   this._loadHash=function(hash){
     if(hash.trim()!==''){
       var data={requestType:"retrieve",id:hash.substring(1)};

       $.ajax(this.servlet,{'data':data,dataType:'json', method:'POST'}).done($.proxy(function(response){
         if(response.success){
           this.clearAll();
           this.loadData(response.data,false);
         }
       },this)).fail(function(msg){
         console.warn('failed call to chartStore',msg.responseText);
       });
     }
   };


  /**
   * Checks the current pages hash.
   * called once.
   */
  var hash = window.location.hash;
  this.currentHash= hash;
  this._loadHash(hash);
}
