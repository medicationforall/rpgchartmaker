/**
 *   RPG Chart Maker source file HasCSVSave,
 *   Copyright (C) 2017  James M Adams
 *
 *   This program is free software: you can redistribute it and/or modify
 *   it under the terms of the GNU Lesser General Public License as published by
 *   the Free Software Foundation, either version 3 of the License, or
 *   any later version.
 *
 *   This program is distributed in the hope that it will be useful,
 *   but WITHOUT ANY WARRANTY; without even the implied warranty of
 *   MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *   GNU Lesser General Public License for more details.
 *
 *   You should have received a copy of the GNU Lesser General Public License
 *   along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

/**
 * CSV Save Mixin.
 * @mixin
 */
function HasCSVSave(){

  /**
   * Collects the CSV Data string.
   * @return {string} formatted in a way suitable for CSV export.
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
   * Collect the CSV Header String.
   * @return {string} Header String.
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
   * Collect CSV row data.
   * @return {string} Rows String.
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
   * Saves the given data into a file.
   * @param {string} t - data of the file.
   * @param {string} f - file name.
   * @param {string} m - meta file type.
   * @todo duplicate code.
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
   * csv export save button click.
   */
  this.node.find('.exportCSVButton').click($.proxy(function(event){
    event.preventDefault();
    console.log('clicked export CSV file');

    var fileName = this.gatherCSVFileName();
    var data = this.gatherCSVData();
    this.saveAsFile(data,fileName,"text/plain;charset=utf-8");
  },this));


  /**
   * Resolve file name.
   * Uses the entered chart name otherwise defaults to roll.csv.
   */
  this.gatherCSVFileName=function(){
    var fileName = 'roll';

    //verify that seed is not empty
    if(this.seed && this.seed !== ''){
      fileName = this.seed;
    }
    return fileName+'.csv';
  };
}
