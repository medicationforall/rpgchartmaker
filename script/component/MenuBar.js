function MenuBar(){

  //chart name on input clear error status
  $('input[name=listName]').on('input',function(){
    $(this).removeClass('error');

    $(document).prop('title', $(this).val()+' - RPG Chart Maker');
  });


  //roll button click
  $('.rollButton').click($.proxy(function(event){
    event.preventDefault();

    //change the rollContainers titles color
    $('.rollContainer .title').css('color','#fff');

    //reset state
    var rollTable = $('.rollContainer table');
    $(rollTable).find('th').remove();
    $(rollTable).find('tbody tr').remove();

    //fill out headers
    $(rollTable).find('thead').append('<th>'+'No.'+'</th>');

    $('.list').each(function(index,item){
      var input = $(item).find('input[name="listGroupName"]');
      var label = input.val();

      //make sure it's not skipped
      if(input.next()[0].checked){
        $(rollTable).find('thead').append('<th>'+label+'</th>');
      }
    });

    //fill out rows
    var count = $('input[name="rollCount"]').val();

    for(var i=0;i<count;i++){
      $(rollTable).find('tbody').append('<tr data-rollSet="'+i+'"></tr>');

      //add roll Index
      $('.rollContainer table tbody tr:last-child').append('<td>'+(i+1)+'.'+'</td>');

      var list =$('.list').each($.proxy(this.getRollValue,this));
    }
  },this));



  this.getRollValue=function(index, item){
    rollValue = this.rollList(item);

    if(rollValue!==undefined){
      $('.rollContainer table tbody tr:last-child').append('<td>'+rollValue+'</td>');
    }
  };
  
}
