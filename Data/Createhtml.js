
export default class CreateHTML{
    constructor(){
        this.notifyHTML ='';
        this.trHTML ='';
        this.voltHTML='';
        this.currHTML='';
        this.tempHTML='';
        this.timeHTML='';
    }
    CreateAlerthtml(eachcell){
        if (eachcell.cellTemp > 60){
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
    CreateCellhtml(cellObjects){
        cellObjects.forEach(eachcell=> {
        this.CreateAlerthtml(eachcell);
            this.trHTML += 
            `<tr>
                    <td>${(eachcell.cellName)}</td>
                    <td>${(eachcell.cellVolt)}V</td>
                    <td>${(eachcell.cellTemp)}&degC</td>
                    <td>${(eachcell.cellSOC())}%</td>
                    <td class="success">Charging</td>
    
                    </tr>
        `;
    
        });
        
    }

    CreateBatteryhtml(batObjects){
      batObjects.forEach(battobject=>{
        this.voltHTML+= 
        `
        <div class="left">
                <h3>Voltage output</h3>
                <h1>${battobject.battV}V</h1>
              </div>
              <div class="progress">
                <svg>
                  <circle cx="38" cy="38" r="36"></circle>
                </svg>

                <div class="number">
                  <p>81%</p>
                </div>
              </div>
        `;

        this.currHTML+= `
        <div class="left">
                <h3>Current output</h3>
                <h1>${battobject.battC}A</h1>
        </div>
              
        <div class="progress">
          <svg>
            <circle cx="38" cy="38" r="36"></circle>
          </svg>

          <div class="number">
            <p>81%</p>
          </div>
        </div>
        `;
        
        this.tempHTML+= `
        <div class="left">
          <h3>Temperature output</h3>
          <h1>${battobject.battTemp}&degC</h1>
        </div>
        <div class="progress">
          <svg>
            <circle cx="38" cy="38" r="36"></circle>
          </svg>

          <div class="number">
            <p>81%</p>
          </div>
        </div>  
        `;

        this.timeHTML+=`${battobject.battTimestamp}`;
        console.log(battobject.battTimestamp)

      })
    }
}
//fill cell data in each tcable