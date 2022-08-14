console.log('Client side javascript file is loaded!')

// fetch('http://localhost:3000/weather?address=!').then((res) => {
//     console.log(res);
//     res.json().then((data) => {

//         if (data.error) {
//             console.log('ENTER OTHER SEARCH');
//         }
//         else {
//             console.log(data);
//         }
//     })

// })
window.addEventListener('load', () => {
 
  }); 

const weatherApp = document.querySelector('form');
const inputSer = document.querySelector('input');
const msg1 = document.querySelector('.msg-1');
const msg2 = document.querySelector('.msg-2');
const msg3 = document.querySelector('.msg-3');

weatherApp.addEventListener('submit', (e) => {
    e.preventDefault();
    let long;
    let lat;
    console.log(navigator.geolocation);
    // Accesing Geolocation of User
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        // Storing Longitude and Latitude in variables
        long = position.coords.longitude;
        lat = position.coords.latitude;
        console.log(long);
      });
    }

    if (inputSer.value) {
        msg1.innerHTML = 'Loading...';
        msg2.innerHTML = '';
        msg3.innerHTML = '';
        fetch(`/weather?address=${inputSer.value}`).then((res) => {
            res.json().then((data) => {
                if (data.error) {
                    msg1.innerHTML = 'ENTER OTHER SEARCH';
                    msg2.innerHTML = '';
                    msg3.innerHTML = '';
                }
                else {
                    msg1.innerHTML = data.Temperature;
                    msg2.innerHTML = data.main;
                    msg3.innerHTML = data.place_name;
                }
            })
        })
    }
})