function HasObjectGroupAddEntry(){
  /**
   * add entry click
   */
  this.node.find('.addObjectButton').click($.proxy(function(event){
    event.preventDefault();

    var form = this.node.find('.objectForm');
    var message = this.node.find('.errorMessage').text('');

    //check to see if the form has children
    if(form.children().length>0){
      this._addEntry(form);
    }else{
      message.text('No Inputs in object form.');
    }

  },this));


  /**
	 * Adds an object entry to the list based on the input fromt he passed in form object.
	 * @param form jquery objectForm node
	 * @private
	 */
	this._addEntry=function(form){
		//build data object
		var data ={};
		var counter =0;

		var template = '<li><div class="object">';

		form.find('.objectInput').each($.proxy(function(index,item){
			var label = $(item).attr('data-label');
			var type =  $(item).attr('data-type');
			var value;
			var input;
			var colorBlock='';

			if(type === "text" || type === "number" || type === "color"){
				input = $(item).find('input');
				value = input.val();

				//clear the input
				input.val('');

			}else if(type === "datetime-local"){
				input = $(item).find('input');
				value = input.val();

				//clear the input
				input.val(this._getNow());

			}else if(type === "checkbox"){
				input = $(item).find('input');
				value = input[0].checked;

				//clear the input
				input.val('');

			}else if(type === "textarea"){
				input = $(item).find('textarea')
				value = input.val();

				//clear the input
				input.val('');
			}

			//set custom style
			if(type === "color"){
				colorBlock='<span class="colorBlock" style="background:'+value+'"></span>';
			}

			//make sure the value is not empty
			if(value!==''){
				data[label]=value;
				counter++;
				template+='<div><span class="title">'+label+':</span> <span class="value">'+value+'</span> '+colorBlock+' ';
				template+='</div>';
			}
		},this));

		template+='</div></li>';

		//if entries are present then add the form data to the list.
		if(counter>0){
			var node =  $(template).appendTo(this.node.find('ol'));
			node.find('.object').data('json',data);
		}
	};
}
