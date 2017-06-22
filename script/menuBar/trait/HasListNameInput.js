function HasListNameInput(){
  
  
	/**
	 * chart name on input clear error status
	 */
  this.node.find('input[name=listName]').on('input',function(){
    $(this).removeClass('error');
    $(document).prop('title', $(this).val()+' - RPG Chart Maker');
  });
}