import React, { useMemo, useState, useEffect} from 'react';
import './App.css';
import {   MemberFilterTile, useExecuteQuery} from "@sisense/sdk-ui";
import {Filter,  measures, filters } from "@sisense/sdk-data";
import * as DM from "./ordersdb";
import { RequestTimeout } from 'http-errors';



function App(tableConfigFile : any) {

  const [stateFilter, setStateFilter] = useState<Filter | null>(null);
  const [regionFilter, setRegionFilter] = useState<Filter | null>(null);
  const [yearFilter, setYearFilter] = useState<Filter | null>(null);
  const [tableConfig0, setTableConfig] = useState("Loading Component");


  console.log("Component Rendered:");

  useEffect(() => {
    //load config file from server
    console.log("useEffect() Loading Config File", tableConfigFile.tableConfigFile);
    getTableConfig(tableConfigFile.tableConfigFile).then(setTableConfig).catch(console.error);

  }, []);


  let retComponent;

  let queryFilterArr : any;
  queryFilterArr = [];

  let queryList : any;
  queryList = [];

  let queryResult = [];
  let tableConfig;
  let completedQueries = 0;

  let jsTable = [];

  //set user selected filters
  if(stateFilter) queryFilterArr.push(stateFilter);
  if(yearFilter) queryFilterArr.push(yearFilter);
  if(regionFilter) queryFilterArr.push(regionFilter);

  if(tableConfig0.startsWith("Loading Component")) {
    retComponent = <div>Loading Config File</div>;
  }
  else {
    //config file loaded, execute queries
    tableConfig = JSON.parse(tableConfig0);
    console.log("Table Config Loaded", tableConfig.groups.length);
    retComponent = <table><tbody></tbody></table>;
  }

  //load the queries
  loadQueryList(queryList, queryFilterArr);
 
/*
  queryList.push({
    dataSource: DM.DataSource,
    dimensions: [DM['ORDERS1']['ORDER_DATE']['Months']],
    measures: [measures.sum(DM.ORDER_DETAILS1.Amount, 'Amt')],
    filters: queryFilterArr,
  });

  */

  console.log("Executing Queries Loop");

  for (let q = 0; q < queryList.length; q++) {
    console.log("Executing Query", q);
    queryResult[q] = useExecuteQuery(queryList[q].query);
  }

  for (let q = 0; q < queryList.length; q++) {
    if (queryResult[q].isLoading) {
      return  <span >Executing Queries</span>;
    }
  }

  for (let  q = 0; q < queryList.length; q++) {
    if (queryResult[q].data) {
      console.log("Completed Query", queryResult[q]);
      completedQueries++;
     
    }
  }

  //process the table
  if(completedQueries === queryList.length) {
    console.log("All Queries Executed", completedQueries);

    //load initial table
    jsTable = initTable(tableConfig);

    //fill the table with data from the query, fist fill groups
    for (let  q = 0; q < queryList.length; q++) {
        let queryMeta = queryList[q].meta;

        if(queryMeta.type === 'group') {
            fillGroup(jsTable, queryMeta, queryResult[q]);
        }
    }

      //fill the table with data from the query, fill the measures
      for (let  q = 0; q < queryList.length; q++) {
        let queryMeta = queryList[q].meta;

        if(queryMeta.type === 'measure') {
            //Test searchQueryResult
            //console.log("TEST searchQueryResult() ",searchQueryResult(queryResult[q], ['Phone','AUG']));
            fillMeasure(jsTable, queryMeta, queryResult[q]);
        }
    }  
 
    //TEST insert Row Below
    //insertRowBelow(jsTable, "A4");
    //insertColAfter(jsTable, "A1")
    //render the HTML table from the JS data structure
    let htmlTableRows = createHTMLTable(jsTable);
    
    retComponent = <table><tbody>{htmlTableRows}</tbody></table>

  

  }
 

  return (   
    <div className="filter-align">
      <div>
       <MemberFilterTile
        title='Region'
        dataSource={DM.DataSource}
        attribute={DM['CUSTOMERS1']['Region']}
        filter={regionFilter}
        onChange={setRegionFilter}
      />
      </div>

     <div>
      <MemberFilterTile
        title='Fiscal Year'
        dataSource={DM.DataSource}
        attribute={DM['ORDERS1']['OrderDate2']['Years']}
        filter={yearFilter}
        onChange={setYearFilter}
      />
      </div>
       {retComponent}
      </div>

  );


}

function searchQueryResult(queryResult : any, searchDims : any) {
  let result : any;
  result = 'NA';

  //num cols = seach dims + 1 measure
  if((queryResult.data.columns.length -1) != (searchDims.length)) {
      return 'NA'
  }

  for(let r = 0; r < queryResult.data.rows.length; r++) {
    let foundMatch = true;
    let rowArr = queryResult.data.rows[r];
    for(let d = 0; d < searchDims.length; d++) {
        if(searchDims[d] !== rowArr[d].text) {
           foundMatch = false;
        }
    }

    if(foundMatch) {
        //console.log("searchQueryResult() Found Match");
        result = queryResult.data.rows[r][searchDims.length].text;
    }

  }

  return result;

}

function fillMeasure(jsTable : any, queryMeta : any, queryResult : any) {
  //scan the table to find the cell for this measure
  let measureName = queryMeta.name;


  let groupArr = queryMeta.groups;
  //scan the table 
  for(let r = 0; r < jsTable.length; r++) {
    for(let c = 0; c < jsTable[r].length; c++) {
        if(jsTable[r][c].binding === measureName) {
            //get the dimMembers across all groups
            let searchDims : any;
            searchDims = [];
            for(let g = 0; g < groupArr.length; g++) {
              searchDims = searchDims.concat(jsTable[r][c].dimMembers[groupArr[g]]);
            }
             
            //update the value
            let searchResult = searchQueryResult(queryResult, searchDims);

            if(searchResult !== 'NA') {
              jsTable[r][c].display = searchResult;
            }
        }
    }
    
  }  

  return;
}

function fillGroup(jsTable: any, queryMeta: any, queryResult: any) {
  let resultList = nestHierarchy(queryResult, queryMeta);
  let groupAddress = queryMeta.position;
  let cellAddrArr = translateCellAddress(groupAddress);
  let row = cellAddrArr[0];
  let col = cellAddrArr[1];

  //the group address may have changed due to other groups expanding
  if(jsTable[row][col].binding !== jsTable[row][col].display) {
    console.log("fillGroup() Cell Shifted");
    
    for(let r = 0; r < jsTable.length; r++) {
      console.log("fillGroup() Increasing Address", groupAddress, jsTable[r][col].binding, jsTable[r][col].display);
      if(jsTable[r][col].binding === queryMeta.name) {
          console.log("fillGroup()", groupAddress);
          break;
      }
      else {
          console.log("fillGroup() Increasing Address", groupAddress);
          groupAddress = getNextCellPosition(groupAddress, 'down');
      }
    }  
  }

  //console.log("fillGroup() Using Address for", queryMeta.name, groupAddress);

  for (let r = 0; r < resultList.length; r++) {
 
    updateTableCell(jsTable, "display", resultList[r].display, groupAddress);
    updateTableCell(jsTable, "background", queryMeta.fields[resultList[r].col].background, groupAddress);
    updateTableCell(jsTable, "color", queryMeta.fields[resultList[r].col].color, groupAddress);
    //updateTableCell(jsTable, "dimMembers", {dimMembers : resultList[r].dimMembers, groupName : resultList[r].groupName }, groupAddress);

    //console.log("fillGroup() Updating Cells", queryMeta.name, groupAddress);

    let dimMembersArr = resultList[r].dimMembers;
    //console.log("fillGroup()", resultList[r].display, dimMembersArr.toString());

    //get the current row and column in the jsTable
    let cellAddrArr = translateCellAddress(groupAddress);
    let row = cellAddrArr[0];
    let col = cellAddrArr[1];
 
    if (queryMeta.expand === 'vertical') {

      //update the dimMembers for all the measure cells, in the current row
      for(let c = 0; c < jsTable[row].length;c++) {
        jsTable[row][c].dimMembers[queryMeta.name] = dimMembersArr;
      }

      if (r < (resultList.length - 1)) {
        insertRowBelow(jsTable, groupAddress);
      }
      groupAddress = getNextCellPosition(groupAddress, 'down');


    }
    else {
      //update the dimMembers for all measure cells, in the current col
      for(let tr = 0; tr < jsTable.length; tr++) {
        jsTable[tr][col].dimMembers[queryMeta.name] = dimMembersArr;
      }     
      if (r < (resultList.length - 2)) {
        insertColAfter(jsTable, groupAddress);
      }
      groupAddress = getNextCellPosition(groupAddress, 'right');
    }

  }

  return;
}

function getNextCellPosition(address : string, direction : string) {
  let alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

    let alpha = address.charAt(0);
    let num = parseInt(address.substring(1));

    if(direction == 'down') {
        return (alpha + "" + (num + 1));
    }
    else {
        let alphaPos = alphabet.indexOf(alpha);
        alpha = alphabet.charAt(alphaPos + 1);
        return (alpha + "" + num);
    }
}

function insertRowBelow(jsTable: any, address : string) {
  let cellAddrArr = translateCellAddress(address);
  let row = cellAddrArr[0];
  //get the current row
  let tableRow = jsTable[row];
  jsTable.splice((row + 1), 0, JSON.parse(JSON.stringify(tableRow)));

  return;
}

function insertColAfter(jsTable: any, address : string) {
  //note: you can use any row number along with the column
  let cellAddrArr = translateCellAddress(address);
  let col = cellAddrArr[1];

  //loop through all rows
  for(let r = 0; r < jsTable.length; r++) {
    let tableCell = jsTable[r][col];
    jsTable[r].splice((col + 1), 0, JSON.parse(JSON.stringify(tableCell)));
  }
  
  return;
}

function initTable(tableConfig : any) {
  let tarr : any;
  tarr = [];

  //initialize a table of 26 columns and 50 rows
  for(let r = 0; r < 7; r++) {
    let row = [];

    for(let c = 0; c < 5; c++) {
        row.push({
              binding : "none",
              display : "",
              meta : {},
              dimMembers : {},
              color : "grey",
              background : "#F5F5F5",
              border : "",
              align : "left"
        });
    }

    tarr.push(row);
  }



  //load labels
  let labels = tableConfig['labels'];

  for(let l = 0; l < labels.length; l++) {
    updateTableCell(tarr, "display", labels[l].label, labels[l].position );
    updateTableCell(tarr, "color", labels[l].color, labels[l].position);
    updateTableCell(tarr, "background", labels[l].background, labels[l].position);
    updateTableCell(tarr, "align", labels[l].align, labels[l].position);
  }

  //load groups
  let groups = tableConfig['groups'];

  for(let g = 0; g < groups.length; g++) {
    updateTableCell(tarr, "binding", groups[g].name, groups[g].position );
    updateTableCell(tarr, "display", groups[g].name, groups[g].position );
    //note: background for group is only set after expansion

  }  

  //load measures
  let measures = tableConfig['measures'];

  for(let m = 0; m < measures.length; m++) {
    updateTableCell(tarr, "binding", measures[m].name, measures[m].position );
    updateTableCell(tarr, "display", measures[m].name, measures[m].position );
    updateTableCell(tarr, "background", measures[m].field.background, measures[m].position );
  } 

  return tarr;
}

function createHTMLTable(tableArr : any) {
  let htmlTableRows : any;
  htmlTableRows = [];

  for(let r = 0; r < tableArr.length; r++) {
    let htmlCol = [];

    for(let c = 0; c < tableArr[r].length;c++) {

      let cellStyle = {
        "color" : tableArr[r][c].color,
        "backgroundColor" : tableArr[r][c].background,
        "textAlign" : tableArr[r][c].align,
        "border" : "3px solid white",
        "height" : "25px",
        "padding-left" : "5px",
        "padding-right" : "10px",
        "font" : "13px calibri"
      }

        htmlCol.push(<td style={cellStyle} key={"CELL" + r + "-" + c} id={"CELL" + r + "-" + c}>{tableArr[r][c].display}</td>);
    }

   
    htmlTableRows.push(<tr  key={"ROW" + r} id={"ROW" + r}>{htmlCol}</tr>);

  }

  return htmlTableRows;

}



function updateTableCell(tableArr : any, attr : any, value : any, address : string) {
    let cellAddrArr = translateCellAddress(address);
    let cell = tableArr[cellAddrArr[0]][cellAddrArr[1]];
    cell[attr] = value;
    return;
}

function translateCellAddress(address : string) {
    //to improve logic
    let alpha = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let col = 0;
    col = alpha.indexOf(address.charAt(0));
    let row = 0 + parseInt(address.substring(1)) - 1;

    return [row,col];
}

// flattens a hierachy into a single column
function nestHierarchy(queryResult: any, queryMeta : any) {
  let nestedList : any;
  nestedList = [];
  let latestRecordArr = [];
  let queryData = queryResult.data;

  //user can specify a hard coded set of values for a single column group
  if(queryMeta.fields.length === 1 && queryMeta.fields[0].values) {
    for (let r = 0; r < queryData.rows.length; r++) {
      nestedList.push({
        display : queryMeta.fields[0].values[r],
        col : 0,
        dimMembers : [queryMeta.fields[0].values[r]]
      });
    }
    return nestedList;
  }

  for (let r = 0; r < queryData.rows.length; r++) {
    for (let c = 0; c < queryData.columns.length; c++) {

      //load all the members for this level e.g. East,NJ / East,NJ,Montclair etc
      //this will be used as meta-data when filling out measures
      let dimMembers = [];
      for(let m = 0; m <= c; m++) {
          dimMembers.push(queryData.rows[r][m].text);
      }

      
      let data = queryData.rows[r][c].text;

      //find it in the list, but make sure its at the same level
      let res = nestedList.find(function(member : any) {
        return ((member.display === data));
      });

      //if not found add to list
      if(!res) {
        //console.log("nestHierarchy()", data, dimMembers.toString());
        nestedList.push({
          display : data,
          col : c,
          dimMembers : dimMembers
        
        });
      }
      else if(res && c > 0) {
        //if found, make sure its not within the same hierarchy level
        if(data != latestRecordArr[c]) {
          nestedList.push({
            display : data,
            col : c,
            dimMembers : dimMembers
        
          });
        }
      }

      latestRecordArr[c] = data;
    }
  }

  return nestedList;
}




//loads the table config from a web url
async function getTableConfig(fileLocation : any) {
  let r = await fetch(fileLocation);
  let c = r.text();
  return c;
}

function loadQueryList(queryList : any, queryFilterArr : any) {
  queryList.push(
    {
      meta: {
              "type" : "group",
              "name" : "Location",
              "expand" : "vertical",
              "nest" : "y",
              "position" : "A5",
              "fields" : [
                  {
                      "table" : "CUSTOMERS1",
                      "column" : "Region",
                      "background" : "#E0E0E0",
                      "color" : "gray"
                  },
                  {
                      "table" : "CUSTOMERS1",
                      "column" : "STATE",
                      "background" : "#F7F7F7",
                      "color" : "gray"
                  }               
              ]
        },
        query : {
              dataSource: DM.DataSource,
              dimensions: [DM['CUSTOMERS1']['Region'], DM['CUSTOMERS1']['STATE']],
              measures: [],
              filters: queryFilterArr,
            }
    }
  );

 

  queryList.push(
    {
      meta: {
              "type" : "group",
              "name" : "MonthName",
              "expand" : "horizontal",
              "nest" : "y",
              "position" : "C1",
              "fields" : [
                  {
                      "table" : "ORDERS1",
                      "column" : "MONTH_NAME",            
                      "background" : "#E0E0E0",
                      "color" : "gray",
                      "values" : ["JAN","FEB","MAR", "APR","MAY","JUN","JUL","AUG","SEP","OCT","NOV","DEC"]
                  }                
              ]
        },
        query : {
              dataSource: DM.DataSource,
              dimensions: [DM['ORDERS1']['MONTH_NAME']],
              measures: [],
              filters: queryFilterArr,
            }
    }
  );

  queryList.push(
    {
      meta: {
            "type" : "measure",
            "name" : "Amount",
            "position" : "C5",
            "formula" : "sum",
            "groups" : ["Location","MonthName"],
            "field" : {
                    "table" : "ORDERS_DETAILS1",
                    "column" : "Amount", 
                    "background" : "#F5F5F5",
                    "color" : "black"
            }
        },
        query : {
              dataSource: DM.DataSource,
              dimensions: [DM['CUSTOMERS1']['Region'], DM['ORDERS1']['MONTH_NAME']],
              measures: [measures.sum(DM.ORDER_DETAILS1.Amount, 'Amt')],
              filters: queryFilterArr,
            }
    }
  );

  queryList.push(
    {
      meta: {
            "type" : "measure",
            "name" : "Amount",
            "position" : "C5",
            "formula" : "sum",
            "groups" : ["Location","MonthName"],
            "field" : {
                    "table" : "ORDERS_DETAILS1",
                    "column" : "Amount", 
                    "background" : "#F5F5F5",
                    "color" : "black"
            }
        },
        query : {
              dataSource: DM.DataSource,
              dimensions: [DM['CUSTOMERS1']['Region'],DM['CUSTOMERS1']['STATE'], DM['ORDERS1']['MONTH_NAME']],
              measures: [measures.sum(DM.ORDER_DETAILS1.Amount, 'Amt')],
              filters: queryFilterArr,
            }
    }
  );

  queryList.push(
    {
      meta: {
            "type" : "measure",
            "name" : "VolumeMonthly",
            "position" : "C2",
            "formula" : "sum",
            "groups" : ["MonthName"],
            "field" : {
                    "table" : "ORDERS_DETAILS1",
                    "column" : "QUANTITY", 
                    "background" : "#E0E0F5",
                    "color" : "black"
            }
        },
        query : {
              dataSource: DM.DataSource,
              dimensions: [ DM['ORDERS1']['MONTH_NAME']],
              measures: [measures.sum(DM.ORDER_DETAILS1.QUANTITY, 'Qty')],
              filters: queryFilterArr,
            }
    }
  );

  queryList.push(
    {
      meta: {
            "type" : "measure",
            "name" : "AmountMonthly",
            "position" : "C3",
            "formula" : "sum",
            "groups" : ["MonthName"],
            "field" : {
                    "table" : "ORDERS_DETAILS1",
                    "column" : "Amount", 
                    "background" : "#E0E0F5",
                    "color" : "black"
            }
        },
        query : {
              dataSource: DM.DataSource,
              dimensions: [ DM['ORDERS1']['MONTH_NAME']],
              measures: [measures.sum(DM.ORDER_DETAILS1.Amount, 'Amt')],
              filters: queryFilterArr,
            }
    }
  );
  

}

export default App;
