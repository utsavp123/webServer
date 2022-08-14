const request = require('request')

const geocode = (address , callBack)=>{
    url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address) +'.json?access_token=pk.eyJ1IjoidXRzYXZwYXJtYXIiLCJhIjoiY2w2MW1kN3hlMDJqaTNibHZic2VrajJvMyJ9.bD5F3wyWwXaztNnwg6eknQ&limit=1'
    request({url  , json : true} , (error  , {body})=>{
        if(error){
            callBack('Unablee to try connection ' , undefined)
        }
        else if (body.features.length === 0){
            callBack('Unablee find location ' , undefined)
        }
        else{
            callBack(null , {
                longtude: body.features[0].center[0],
                latitude : body.features[0].center[1],
                place_name : body.features[0].place_name,
            })
            console.log(body.features[0].center[0]);
            console.log(body.features[0].center[1]);
            console.log(body.features[0].place_name);
        }

    })
    // console.log(url);
}

module.exports = geocode