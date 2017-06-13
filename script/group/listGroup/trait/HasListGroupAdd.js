function HasListGroupAdd(){

  /**
   * add name button click functionality
   */
  this.node.on('click','.addNameButton',$.proxy(function(event){
    event.preventDefault();
    var nameInput = this.node.find('.nameInput');

    if(nameInput.val()!==''){
    this.node.find('ol').append('<li><span class="nameText">'+nameInput.val().trim()+'</span></li>');

    //reset note input
    nameInput.val('');
    nameInput.focus();
    }
  },this));


  /**
   * name input enter key press
   */
  this.node.on('keypress','.nameInput',$.proxy(function(event){
    var keycode = (event.keyCode ? event.keyCode : event.which);
    if(keycode == '13') {
      this.node.find('.addNameButton').trigger('click');
    }
  },this));
}
