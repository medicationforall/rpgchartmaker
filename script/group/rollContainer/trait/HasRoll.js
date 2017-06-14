function HasRoll(){
  /**
   *
   */
  this.roll=function(){
    this.rollTable = this.node.find('table');
    this.clearTitle();
    this.resetState();
    this.createTableHeader();
    this.createTableRows();
  };


  /**
   *
   */
  this.clearTitle=function(){
    //change the rollContainers titles color
    this.node.find('.title').css('color','#fff');
  };


  /**
   *
   */
  this.resetState=function(){
    //reset state
    this.rollTable.find('th').remove();
    this.rollTable.find('tbody tr').remove();
  };


  /**
   *
   */
  this.createTableHeader=function(){
    //fill out headers
    this.rollTable.find('thead').append('<th>'+'No.'+'</th>');

    $('.list').each($.proxy(function(index,item){
      var input = $(item).find('input[name="listGroupName"]');
      var label = input.val();

      //make sure it's not skipped
      if(input.next()[0].checked){
        this.rollTable.find('thead').append('<th>'+label+'</th>');
      }
    },this));
  };


  /**
   *
   */
  this.createTableRows=function(){
    //fill out rows
    var count = $('input[name="rollCount"]').val();

    for(var i=0;i<count;i++){
      this.rollTable.find('tbody').append('<tr data-rollSet="'+i+'"></tr>');

      //add roll Index
      this.rollTable.find('tbody tr:last-child').append('<td>'+(i+1)+'.'+'</td>');

      var list =$('.list').each($.proxy(this.getRollValue,this));
    }
  };


  /**
   *
   */
  this.getRollValue=function(index, item){
    rollValue = this.rollList(item);

    if(rollValue!==undefined){
      this.rollTable.find('tbody tr:last-child').append('<td>'+rollValue+'</td>');
    }
  };


  /**
   * Potentially a recursive call, depending on how the user structured their data.
   */
  this.rollList=function(list,forceRoll,qualifier){
    //make sure it's not skipped
    if(forceRoll || $(list).find('input[name="roll"]').prop('checked')){
      var arr = [];

      if(qualifier && qualifier!==''){
        var sub  = qualifier.split(',');

        for(var i=0;i<sub.length;i++){
          var node = $(list).find('ol li:nth-child('+sub[i].trim()+')');
          arr.push(node.html());
        }
      }else{
        //place list item contents into an array
        arr = $(list).find('ol li').map(function(i, el) {
          return $(el).html();
        }).get();
      }

      var input = $(list).find('input[name="listGroupName"]');
      var label = input.val();
      var roll = this.resolveRoll(arr, label);
      var value = arr[roll];

      //lookup for dice
      value = this.findList(value);
      value = this.findDice(value);

      //animate the roll selection
      $(list).find('ol li:nth-child('+(roll+1)+')').animateCss('highlight');

      return value;
    }
  };


  /**
   *
   */
  this.resolveRoll=function(arr){
    var roll = Math.floor(Math.random() * arr.length);
    return roll;
  };


  /**
   * d40444 Demonkin d5 d6+1 d6/2 d4*10 d6-1
   * should have 6 matches d40444, d5, d6+1, d6/2, d4*10, and d6-1
   */
  this.findDice=function(text){
    var re = /\bd(\d+)([*+-/%]?)(\d+)?\b/gi;

    text = text.replace(re,function(match,number, operation, number2){
      var n = parseInt(number);
      var roll = Math.floor(Math.random() * n);
      //normalize roll so that it's not 0 index
      roll++;

      //modify roll
      if(operation && number2 && operation !==''){
        var n2 = parseInt(number2);

        if(operation=='+'){
          roll = roll+n2;
        }else if(operation=='-'){
          roll = roll-n2;
        }else if(operation=='/'){
          roll = roll/n2;
        }else if(operation=='*'){
          roll = roll*n2;
        }else if(operation=='%'){
          roll = roll%n2;
        }
      }
      return roll;
    });
    return text;
  };


  /**
   * d6 [Region](1,5) Orks - [Type]
   * Hits on Type, and Region subset 1, and 5.
   */
  this.findList=function(text){
    var re = /\[(.*?)\]\(?([\d,]*)\)?/gi;

    text = text.replace(re,$.proxy(function(match,listName,qualifier){
      var returner = match;
      if(listName && listName!==''){
        var list = $('.list input[name="listGroupName"]').filter(function(){return this.value==listName;}).closest('.list');
        return this.rollList(list,true,qualifier);
      }
      return returner;
    },this));
    return text;
  };
}
