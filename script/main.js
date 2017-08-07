/**
 *   RPG Chart Maker source file main,
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
 * Extension to jquery to apply a css animation class and remove it when the animation is finished.
 * @param {string} animationName - css class name to the added to the domnode.
 */
$.fn.extend({
    animateCss: function (animationName) {
        var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
        $(this).addClass('animated ' + animationName).one(animationEnd, function() {
            $(this).removeClass('animated ' + animationName);
        });
    }
});


/**
 * Main Method.
 */
$(document).ready(function(){
  $('.javacriptWarning').remove();
  ListGroupContainer.call(this);

  //resolve the templates
  $.when(
    RollContainer.prototype._resolveTemplate(RollContainer,'RollContainer'),
    ListGroup.prototype._resolveTemplate(ListGroup,'ListGroup'),
    ObjectGroup.prototype._resolveTemplate(ObjectGroup,'ObjectGroup'),
    GridGroup.prototype._resolveTemplate(GridGroup,'GridGroup')).done(function(){

    //Initialize mainMenu
    var mainMenu = new MainMenu();

    //Initialize the Roll Container
    var rollContainer = new RollContainer(false);

    //initialize list group
    if(window.location.hash === ''){
      var listGroup = new ListGroup(false);
    }
  });
});
