/**
 *   RPG Chart Maker source file ListGroupContainer,
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
function ListGroupContainer(){
  //sortable for lists in groupcontainer
	$('.listGroupContainer').sortable({tolerance: "pointer",handle: ".handle"});
	$('.listGroupContainer .list').find('ol').sortable({connectWith: ".list ol"});


  /**
   * delete list group click
   */
	$('.listGroupContainer').on('click','.deleteListButton',function(event){
		event.preventDefault();
		$(this).closest('.list,.rollContainer').remove();
	});


	/**
	 *
	 */
	$('.listGroupContainer').on('click','.menuButton',function(event){
		event.preventDefault();
		var parent = $(this).closest('.list,.rollContainer');
		var coreNode = $(parent).data('coreNode');
		var menu = parent.find('.menu');

		if(menu.hasClass('focus')){
			menu.removeClass('focus');
		}else{
			menu.addClass('focus');
			coreNode.openMenu();
		}
	});
}
