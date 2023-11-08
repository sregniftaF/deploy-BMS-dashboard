
export default class CreateHTML{
    constructor(){
        this.chargestatusHTML = 0;
        this.notifyHTML ='';
        this.trHTML ='';
        this.voltHTML='';
        this.currHTML='';
        this.tempHTML='';
        this.timeHTML='';
    }
    CreateAlerthtml(eachcell){
        if (eachcell.cellTemp > 30){
          this.notifyHTML += `
              <div class="update">
              <div class="profile-photo">
                <img src="./Images/images.png">
              </div>
              <div class="messages">
                <p> <b>${eachcell.cellName}</b> <p>
                <p> High Temperature: <span class="danger">${eachcell.cellTemp} &degC <span></p>
                <small class="text-muted"> ${eachcell.cellTimestamp} mins ago</small>
              </div>
            </div>
            `;
          }
          
      }
    CreateCellhtml(cellObjects, status){
      this.notifyHTML ='';
      this.trHTML='';
        cellObjects.forEach(eachcell=> {
        this.CreateAlerthtml(eachcell);
            this.trHTML += 
            `<tr>
                    
                    <td>${(eachcell.cellName)}</td>
                    <td>${(eachcell.cellVolt)}V</td>
                    <td>${(eachcell.cellTemp)}&degC</td>
                    <td>${(eachcell.cellSOC())}</td>
                    <td class=${status === 'Charging' ? "success" : status === 'Discharging' ? "warning" : "primary"}>${status}</td>
                    <td><td>
    
                    </tr>
        `;
    
        });
        
    }

    CreateBatteryhtml(batObjects){
      this.voltHTML='';
      this.currHTML='';
      this.tempHTML='';
      this.timeHTML='';
      batObjects.forEach(battobject=>{
        this.voltHTML+= 
        `
        <div class="left">
                <h3>Voltage output</h3>
                <h1>${battobject.battV}V</h1>
        </div>

        `;

        this.currHTML+= `
        <div class="left">
                <h3>Current output</h3>
                <h1>${battobject.battC}A</h1>
        </div>
        `;
        
        this.tempHTML+= `
        <div class="left">
          <h3>Temperature output</h3>
          <h1>${battobject.battTemp}&degC</h1>
        </div>
       
        `;

        this.timeHTML+=`${battobject.battTimestamp}`;
        //console.log(battobject.battTimestamp)

      })
    }
}
//fill cell data in each tcable