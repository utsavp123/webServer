const request = require('request')

const data = (latitude , longitude ,callBack)=>{
    // url = ' https://api.open-meteo.com/v1/forecast?latitude='+latitude+'&longitude='+longitude+'&hourly=temperature_2m'
    url = 'https://openweathermap.org/data/2.5/onecall?lat='+latitude+'&lon='+longitude+'&units=metric&appid=439d4b804bc8187953eb36d2a8c26a02'
    request({ url , json: true }, (error, {body}) => {
        if (error) {
            callBack("low level error" , undefined)
        }
        else if(body.error){
            callBack(" error" , undefined)

        }
        else {
            // let temperature = body.hourly
            // console.log(url);
            let temperature = body.current.temp;
            let cloud = body.current.weather[0].main;
            callBack(undefined , temperature ,cloud)
        }
    })
}
module.exports = data