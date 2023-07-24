// fetch data from teamspeak API

// Clean the data

// function to calculate the historical data and determine whether its charging or discharging

// Save it into a variable = celldata


const celldata = [{
    cellTimestamp: "200020",
    cellName: "C1",
    cellVolt: 2.2,
    cellTemp: 100,
    cellSOC: (cellVolt) => {
        return (cellVolt/4)*100;
    }
},

{
    cellTimestamp: "200020",
    cellName: "C2",
    cellVolt: 2.2,
    cellTemp: 60,
    cellSOC: (cellVolt) => {
        return (cellVolt/4)*100;
    }
},

{
    cellTimestamp: "200020",
    cellName: "C3",
    cellVolt: 2.2,
    cellTemp: 70,
    cellSOC: (cellVolt) => {
        return (cellVolt/4)*100;
    }
},

{
    cellTimestamp: "200020",
    cellName: "C3",
    cellVolt: 2.2,
    cellTemp: 50.6,
    cellSOC: (cellVolt) => {
        return (cellVolt/4)*100;
    }
},

{
    cellTimestamp: "200020",
    cellName: "C3",
    cellVolt: 2.2,
    cellTemp: 50.6,
    cellSOC: (cellVolt) => {
        return (cellVolt/4)*100;
    }
},

{
    cellTimestamp: "200020",
    cellName: "C4",
    cellVolt: 2.2,
    cellTemp: 50.6,
    cellSOC: (cellVolt) => {
        return (cellVolt/4)*100;
    }
}
]

