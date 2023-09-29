import CreateHTML from "./Data/Createhtml.js";
// const request = new XMLHttpRequest();
// request.open("GET","https://api.thingspeak.com/channels/2175370/feeds.json?api_key=0Z2TZ9JO3LRH4AYK&results=2");
// request.send();
// request.onload = () => {
//     if (request.status===200){
//         console.log(JSON.parse(request.response));
//     } else {
//         console.log(`error ${request.status}`);
// }
// }
const cellObjects = []; // array of objects for cells
const batObjects = []; // array of objects for battery

// class declare

class batteryreadings{
  static battstatus = '';

  constructor(battTimestamp, battV=0, battC=0, battTemp=0){
    this.battTimestamp = battTimestamp;
    this.battV = battV;
    this.battC = battC;
    this.battTemp = battTemp;
    //console.log("battery created")
  }

  updateTime(timestamp){
    this.battTimestamp = timestamp;
  }

  updateVolt(volt){
    this.battV = volt;
  }
  updateTemp(temp){
    this.battTemp = temp;
  }
  updateCurrent(curr){
    this.battC = curr;
  }
  updateStatus(status){
    batteryreadings.battstatus = status;
  }

}

class cellreadings {
  constructor(cellTimestamp, cellName, cellVolt=0, cellTemp=0) {
    this.cellTimestamp = cellTimestamp;
    this.cellName = cellName;
    this.cellVolt = cellVolt;
    this.cellTemp = cellTemp;
    //console.log("created new object");
  }
  updateName(name) {
    this.cellName = name;
  }
  updateTemp(temp) {
    this.cellTemp = temp;
  }
  updateVolt(volt) {
    this.cellVolt = volt;
  }
  updateTime(timestamp){
    this.cellTimestamp = timestamp;
  }
  cellSOC(){
    return "WIP";
  }
}

//testing values for alerts system

// const cell1 = new cellreadings("2023-07-11T12:00:00Z", "Cell1", 3.5, 25);
// cellObjects.push(cell1);

// const cell2 = new cellreadings("2023-07-11T12:05:00Z", "Cell2", 3.2, 27);
// cellObjects.push(cell2);

// const cell3 = new cellreadings("2023-07-11T12:10:00Z", "Cell3", 3.7, 70);
// cellObjects.push(cell3);

// const cell4 = new cellreadings("2023-07-11T12:15:00Z", "Cell4", 3.3, 100);
// cellObjects.push(cell4);

// const cell5 = new cellreadings("2023-07-11T12:20:00Z", "Cell5", 3.6, 23);
// cellObjects.push(cell5);


let generateHTML = new CreateHTML();
const api_url = "https://api.thingspeak.com/channels/2220941/feeds.json?api_key=LPMHIW6GXK9U7FSE&results=2";
let previous_entry = -1;


// send request and get the data from teamspeak
async function get_Thinkspeak() {
  const response = await fetch(api_url);
  const data = await response.json();
  if (readDATA(data)) {
    //console.log("data-updated");
    //return data;
    console.log("data received");
    processData(data, cellObjects, batObjects);


    generateHTML.CreateCellhtml(cellObjects, (batteryreadings.battstatus));
    generateHTML.CreateAlerthtml(cellObjects);
    generateHTML.CreateBatteryhtml(batObjects);
    document.querySelector('table tbody').innerHTML = generateHTML.trHTML;
    document.querySelector('.updates').innerHTML = generateHTML.notifyHTML;
    document.querySelector('.voltage .middle').innerHTML = generateHTML.voltHTML;
    document.querySelector('.current .middle').innerHTML = generateHTML.currHTML;
    document.querySelector('.temperature .middle').innerHTML = generateHTML.tempHTML;
    document.querySelector('.voltage .time-html').innerHTML = generateHTML.timeHTML;
    document.querySelector('.current .time-html').innerHTML = generateHTML.timeHTML;
    document.querySelector('.temperature .time-html').innerHTML = generateHTML.timeHTML;

  } else {
    console.log("not data returned");
  }
}

// check if data is updated
function readDATA(data) {
  let updated_entry = data.feeds[1].entry_id;
  if (updated_entry > previous_entry) {
    previous_entry = updated_entry;
    return true;
    // make data show on for the second element
  } else {
    return false;
  }
}

function convertToSingaporeTime(utcTime) {
  const utcDate = new Date(utcTime);
  const singaporeTime = new Date(utcDate.getTime() + 8 * 60 * 60 * 1000);

  const year = singaporeTime.getUTCFullYear();
  const month = String(singaporeTime.getUTCMonth() + 1).padStart(2, '0');
  const day = String(singaporeTime.getUTCDate()).padStart(2, '0');
  const hours = String(singaporeTime.getUTCHours()).padStart(2, '0');
  const minutes = String(singaporeTime.getUTCMinutes()).padStart(2, '0');
  const seconds = String(singaporeTime.getUTCSeconds()).padStart(2, '0');

  return ` Since ${hours}:${minutes} hrs on ${year}/${month}/${day}`;
}

function emptyArray(arr) {
  return !arr.length;
}

function updateBattery(fieldValue, feedsdata, battObj){
  if (fieldValue === "BPT"){
   battObj.updateTemp(feedsdata);
   //console.log("temp updated")

  }else if (fieldValue === "BPV"){
    battObj.updateVolt(feedsdata);
    //console.log("volt updated")

  }else if (fieldValue === "BPC"){
    battObj.updateCurrent(feedsdata);
    //console.log("current updated")
  }

  battObj.updateTime(feedsdata["created_at"]);

}
function readStatus(status){
  if (status === "1.000.00"){
    return 'Charging';
  }
  else if (status === "0.000.00"){
        return 'Discharging';
  }

}


function processData(jsonData, cellObjects, batObjects) {
  //console.log(typeof(cellObjects));
  const channelFields = jsonData.channel;
  const feedsData = jsonData.feeds[1];
  console.log(feedsData); //status 0 discharging, 1 charging
  //console.log(feedsData);

  // looping thru all the channel fields
  for (const fieldKey in channelFields) {
    const fieldValue = channelFields[fieldKey];
    let count = 0;
    if (fieldKey.startsWith("field")) {
      //console.log(fieldKey);
      //console.log(fieldValue);
      if (fieldValue.substring(0, 1) === "C") {
        //console.log("Found C in the name");
        if (emptyArray(cellObjects)) {
          //console.log("Empty array");
          const cellObject = new cellreadings(feedsData["created_at"],fieldValue.substring(0, 2),feedsData[fieldKey], 0); // time, name, temp, volt= default 0
          cellObjects.push(cellObject);
          count = 1;
        } else {
          //console.log("Something inside");
          for (let i = 0; i < cellObjects.length; i++) {
            //console.log("searching for match");

            if (cellObjects[i].cellName === fieldValue.substring(0, 2)) { //check for cell no.
              //console.log("obj matched in the array, updating...");

              //update cell data
              if (count === 0) {
                cellObjects[i].updateTemp(feedsData[fieldKey]);
                count = 1;
              } else if (count === 1) {
                cellObjects[i].updateVolt(feedsData[fieldKey]);
                count = 0;
              }
              break;


            } else if (i === cellObjects.length - 1) {
              //console.log("at the end of the object");
              // create new object and push into array becuas
              const cellObject = new cellreadings(feedsData["created_at"],fieldValue.substring(0, 2),feedsData[fieldKey], 0);

              cellObjects.push(cellObject);
            }
          }
        }
      } 
      
      else if (fieldValue.substring(0,1) === "B") {
        if(emptyArray(batObjects)){
          const batObject = new batteryreadings(feedsData["created_at"]); // time,volt, current, temp
          updateBattery(fieldValue, feedsData[fieldKey],batObject);
          batObject.updateStatus(readStatus(feedsData["field8"]));
          batObjects.push(batObject);

        }
        else{
            updateBattery(fieldValue, feedsData[fieldKey],batObjects[0])
            batObjects[0].updateStatus(readStatus(feedsData["field8"]));
            batObjects[0].updateTime(convertToSingaporeTime(feedsData["created_at"]));
          }

      }
    }
  }
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////Testing datas

// get_Thinkspeak().then((newdata) => {
//   //     console.log(newdata.channel);
// });
get_Thinkspeak().then();
setInterval(get_Thinkspeak,15000);

// get_Thinkspeak().then(newdata=>{
//     //console.log(newdata);

// })


