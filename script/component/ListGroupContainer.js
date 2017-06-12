function ListGroupContainer(){
  //sortable for lists in groupcontainer
	$('.listGroupContainer').sortable({tolerance: "pointer",handle: ".handle"});
	$('.listGroupContainer .list').find('ol').sortable({connectWith: ".list ol"});


	//delete list group click
	$('.listGroupContainer').on('click','.deleteListButton',function(event){
		event.preventDefault();
		$(this).closest('.list').remove();
	});
}
