const request=require('postman-request')

forecast=(lat,long,callback)=>{
    const url='http://api.weatherstack.com/current?access_key=1081893165186bb5d456cf202087f455&query='+lat+','+long+'&units=m'
    request({url,json:true},(error,{body})=>{
        if (error){
            return callback('There was an error connecting to forecast module',undefined)
        }else if (body.error){
            return callback('Invalid co-ordinates. Location not found.')
        }else{
            callback(undefined,{
                weather:body.current.weather_descriptions[0],
                temperature:body.current.temperature,
                feels_like:body.current.feelslike
            })
        }

    })
}
module.exports=forecast