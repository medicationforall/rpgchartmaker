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
