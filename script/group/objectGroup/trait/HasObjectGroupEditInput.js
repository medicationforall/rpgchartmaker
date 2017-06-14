function HasObjectGroupEditInput(){
  this.form = this.node.find('.objectForm');

  /**
   * This is relatively ok
   */
  this.form.on('click','.objectInput .label',function(event){
    event.preventDefault();

    var node = $(this).closest('.objectInput');
    var label = node.attr('data-label');
    var type = node.attr('data-type');
    var template = '<div class="editInput">'+
      '<input placeholder="Label" value="'+label+'" name="editInputLabel" /> '+
      '<select name="addInputType">'+
        '<option value="text">Text</option>'+
        '<option value="textarea">TextArea</option>'+
        '<option value="number">Number</option>'+
        '<option value="checkbox">Checkbox</option>'+
        '<option value="color">Color</option>'+
        '<option value="datetime-local">DateTime</option>'+
      '</select>'+
      '<a href="" class="applyEditButton" title="Apply">+</a>'+
      '<a href="" class="deleteEditButton" title="Delete">-</a>'+
    '</div>';

    var edit = $(template.trim()).insertAfter(node);
    edit.find('select').val(type);
    node.hide();
  });


  /**
   * This is extremely finnicky should be made something less state machine dependent.
   */
  this.form.on('click','.applyEditButton',function(event){
    event.preventDefault();

    var editInput = $(this).closest('.editInput');
    var input = editInput.prev('.objectInput');

    var label = editInput.find('input[name="editInputLabel"]').val();
    var type = editInput.find('select[name="addInputType"]').val();
    var prevType = input.attr('data-type');
    var find = 'input[type="'+prevType+'"]';

    if(prevType === 'textarea'){
      find = 'textarea';
    }

    var node = input.find(find);
    var value = node.val();
    input.css('display','');

    var insert = '<input type="'+type+'" value="'+value+'" />';
    if(type === 'textarea'){
      insert = '<textarea>'+value+'</textarea>';
    }

    input.attr('data-label',label);
    input.find('.label').text(label);

    input.attr('data-type',type);
    node.after(insert);
    node.remove();

    editInput.remove();
  });


  /**
   * name input enter key press
   */
  this.form.on('keypress','input[name="editInputLabel"]',function(event){
    var keycode = (event.keyCode ? event.keyCode : event.which);
    if(keycode == '13') {
      $(this).closest('.editInput').find('.applyEditButton').trigger('click');
    }
  });


  /**
   * works fine
   */
  this.form.on('click','.deleteEditButton',function(event){
    event.preventDefault();
    $(this).closest('.editInput').remove();
  });
}
