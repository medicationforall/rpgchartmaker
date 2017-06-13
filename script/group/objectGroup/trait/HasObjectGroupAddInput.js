function HasObjectGroupAddInput(){

  /**
   * Click add input
   */
  this.node.find('.addInputButton').click($.proxy(function(event){
    event.preventDefault();

    var labelInput=this.node.find('input[name="addInputLabel"]');
    var label = labelInput.val();
    var type = this.node.find('select[name="addInputType"]').val();

    //check for empty label
    if(label===''){
      labelInput.addClass('error');
      return;
    }

    //all is fine add the new input
    this._addInput(label,type);

    //clear the input
    labelInput.val('').focus();

    //clear error message if any
    this.node.find('.errorMessage').text('');
  },this));


  /**
   * Adds an input to the object template form.
   * @param label {string}
   * @param type {string} valid types are text, number, checkbox, color, datetime-local, and textarea
   * @private
   */
  this._addInput=function(label,type){
    var form = this.node.find('.objectForm');
    var template='<div class="objectInput" data-label="'+label+'" data-type="'+type+'">';
    template+='<span class="label">'+label+'</span> ';

    if(type==='text' || type==='number' || type==='checkbox' || type==='color'){
      template+='<input type="'+type+'" />';
    }else if(type === "datetime-local"){
      template+='<input type="'+type+'" value="'+this._getNow()+'" />';
    }else if(type==='textarea'){
      template+='<textarea></textarea>';
    }

    template+='</div>';

    form.append(template);
  };


  /**
   * clear the red border on input
   */
  this.node.find('input[name="addInputLabel"]').on('input',function(){
    $(this).removeClass('error');
  });


  /**
   * label input enter key press - triggers add input button
   */
  this.node.on('keypress','input[name="addInputLabel"]',$.proxy(function(event){
    var keycode = (event.keyCode ? event.keyCode : event.which);
    if(keycode == '13') {
      this.node.find('.addInputButton').trigger('click');
    }
  },this));
}
