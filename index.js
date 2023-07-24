
const sideMenu = document.querySelector("aside");
const menuBtn = document.querySelector("#menu-button");
const closeBtn = document.querySelector("#close-btn");
const themeToggler = document.querySelector(".theme-toggler");

//show sidebar
menuBtn.addEventListener('click',() => {sideMenu.style.display ='block';} )


//close sidebar
closeBtn.addEventListener('click',() =>{
    sideMenu.style.display = 'none';
})

//change theme
themeToggler.addEventListener('click', () =>{
    document.body.classList.toggle('dark-theme-variables');

    themeToggler.querySelector('span:nth-child(1)').classList.toggle('active');
    themeToggler.querySelector('span:nth-child(2)').classList.toggle('active');
})



// detailsBtn = document.querySelectorALL('.js-cell-details');

// detailsBtn.forEach((detailBtn)=>{
//   detailBtn.addEventListener('click',()=>{
//     console.log("hello");

//   })

// })

// generate notification HTML if there is high temp or voltage differenctial


























//fetching data API calling


// Function to call TeamSpeak API and retrieve data
// async function fetchDataFromTeamSpeakAPI() {
//     try {
//       const response = await fetch('https://api.thingspeak.com/channels/2175370/fields/1.json?api_key=0Z2TZ9JO3LRH4AYK&results=2'); // Replace with the actual TeamSpeak API URL
//       const data = await response.json();
  
//       // Extract relevant data from the API response
//       const { name, voltage, temperature } = data;
  
//       // Call function to compute state of charge
//       const stateOfCharge = computeStateOfCharge(voltage, temperature);
  
//       // Create HTML table
//       const table = document.createElement('table');
//       table.innerHTML = `
//         <tr>
//           <th>Name</th>
//           <th>Voltage</th>
//           <th>Temperature</th>
//           <th>State of Charge</th>
//         </tr>
//         <tr>
//           <td>${name}</td>
//           <td>${voltage}</td>
//           <td>${temperature}</td>
//           <td>${stateOfCharge}</td>
//         </tr>
//       `;
  
//       return table;
//     } catch (error) {
//         console.error('Error fetching data from TeamSpeak API:', error);
//         console.log("Unable to read file")
//       return null;
//     }
//   }
  
//   // Function to compute State of Charge
//   function computeStateOfCharge(voltage, temperature) {
//     // Your custom logic to compute the state of charge
//     // Replace the example calculation with your actual algorithm
//     const stateOfCharge = voltage - temperature;
//     return stateOfCharge;
//   }
  
//   // Call the function and append the table to the document
//   fetchDataFromTeamSpeakAPI().then((table) => {
//     if (table) {
//       document.body.appendChild(table);
//     } else {
//       console.error('Failed to fetch data from TeamSpeak API.');
//     }
//   });