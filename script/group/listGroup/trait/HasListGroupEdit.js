function HasListGroupEdit(){

  /**
   * note edit functionality
   */
  this.node.on('click','.nameText',function(event){
    var template = '<div class="inlineEdit">'+
    '<input class="noteEdit" type="text" value="'+$(this).text()+'" />'+
    '<div class="editControls">'+
    '<a href="" class="noteEditButton" title="Apply">+</a>'+
    '<a href="" class="noteDeleteButton" title="Delete">-</a>'+
    '</div>'+
    '</div>';
    $(this).css('display','none');
    $(this).after(template);
  });


  /**
   * note apply click
   */
  this.node.on('click','.noteEditButton',function(event){
    event.preventDefault();
    var inlineEdit = $(this).closest('.inlineEdit');
    var nameText = $(inlineEdit).prev('.nameText');
    var noteEdit = inlineEdit.find('.noteEdit');

    nameText.text(noteEdit.val()).css('display','block');
    inlineEdit.remove();
  });


  /**
   * name input enter key press
   */
  this.node.on('keypress','.noteEdit',function(event){
    var keycode = (event.keyCode ? event.keyCode : event.which);
    if(keycode == '13') {
      $(this).closest('.inlineEdit').find('.noteEditButton').trigger('click');
    }
  });


  /**
   * note delete click
   */
  this.node.on('click','.noteDeleteButton',function(event){
    event.preventDefault();

    var inlineEdit = $(this).closest('.inlineEdit');
    var nameText = $(inlineEdit).prev('.nameText');

    inlineEdit.remove();
    nameText.closest('li').remove();
  });
}
