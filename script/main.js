/**
 *   RPG Chart Maker source file ObjectGroup,
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
$.fn.extend({
    animateCss: function (animationName) {
        var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
        $(this).addClass('animated ' + animationName).one(animationEnd, function() {
            $(this).removeClass('animated ' + animationName);
        });
    }
});

$(document).ready(function(){
  Util.call(this);

  /*MAIN*/
	$('.javacriptWarning').remove();

  ListGroupContainer.call(this);
  MenuBar.call(this);


	//main
	//Initialize the Roll Container
	var rollContainer = new RollContainer(false);
	$(rollContainer).on('loaded',function(event){
		//resolve the two templates for lists
		$.when(ListGroup.prototype.__proto__._resolveTemplate(ListGroup,'listGroup'),ObjectGroup.prototype.__proto__._resolveTemplate(ObjectGroup,'objectGroup')).done(function(){
			//initialize list group
			if(window.location.hash == ''){
				var listGroup = new ListGroup(false);
			}

			//Initialize mainMenu
			var mainMenu = new MainMenu();
		});
	});
});
