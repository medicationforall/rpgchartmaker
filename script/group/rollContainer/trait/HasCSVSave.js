function HasCSVSave(){

  /**
   *
   */
  this.gatherCSVData=function(){
    var data ='';
    //gather header
    data+=this.gatherCSVHeader();

    //gather records
    data+=this.gatherCSVRows();
    return data;
  };


  /**
   *
   */
  this.gatherCSVHeader=function(){
    var headerData='';

    this.node.find('th').each(function(index,item){
      if(headerData!==''){
        headerData+=',';
      }

      //character escape
      var value = $(item).text();
      if(value.indexOf(',')!==-1){
        value = '"'+value.replace(/"/g,'""')+'"';
      }

      headerData+=value;
    });

    return headerData+'\n';
  };


  /**
   *
   */
  this.gatherCSVRows=function(){
    var tableData='';

    //iterate each row
    this.node.find('table tbody tr').each(function(index,item){
      var rowData='';

      //iterate each td
      $(item).find('td').each(function(index,item){
        if(rowData!==''){
          rowData+=',';
        }

        //character escape
        var value = $(item).text();
        if(value.indexOf(',')!==-1){
          value = '"'+value.replace(/"/g,'""')+'"';
        }

        rowData+=value;
      });
      tableData+=rowData+'\n';
    });

    return tableData;
  };


  /**
   * todo code duplication fix this.
   */
  this.saveAsFile=function(t,f,m) {
    try {
      var b = new Blob([t],{type:m});
      saveAs(b, f);
    } catch (e) {
      window.open("data:"+m+"," + encodeURIComponent(t), '_blank','');
    }
  };


  /**
   * Click csv export save button.
   */
  this.node.find('.exportCSVButton').click($.proxy(function(event){
    event.preventDefault();
    console.log('clicked export CSV file');

    var fileName = this.gatherCSVFileName();
    var data = this.gatherCSVData();
    this.saveAsFile(data,fileName,"text/plain;charset=utf-8");
  },this));


  /**
   * resolve file name
   */
  this.gatherCSVFileName=function(){
    var fileName = 'roll';

    //verify that seed is not empty
    if(this.seed && this.seed !== ''){
      fileName = this.seed;
    }

    return fileName+'.csv';
  };

  /**
   *
   */
  /*this.checkSeed=function(){
    var seed = this.node.find('input[name="seed"]');

    if(seed.val()!== ''){
      return true;
    }else{
      seed.addClass('error');
      return false;
    }
  };*/
}
