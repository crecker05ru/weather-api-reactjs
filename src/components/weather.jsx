import React ,{useState,useEffect} from 'react'
import {myCityCurrentWeather} from '../myCityCurrentWeather'
import {myCityWeatherForecast} from '../myCityWeatherForecast'
import myCity from '../myCity.json'


export default function Weather () {
    const [weather,setWeather] = useState(myCityWeatherForecast)
    // console.log('myCity',myCity)
    // console.log('myCityCurrentWeather',myCityCurrentWeather)
    console.log('myCityWeatherForecast',myCityWeatherForecast)
    console.log()

    const minFeelsLikeNightTemperature = (days) => {
        let minDifference = 0
        let differenceArray = []
        let currentDifference = 0
        let dayIndex
        let funcDataObj = {}
        
        for(let i = 0;i< days.length;i++){
            currentDifference = days[i].temp.night -days[i].feels_like.night
            differenceArray.push(currentDifference)  
             
        }
        funcDataObj.index = differenceArray.indexOf(Math.min(...differenceArray))
        minDifference = Math.min(...differenceArray)

        funcDataObj.minDifference = minDifference.toFixed(2)
        return funcDataObj
    }

    // const minFeelsLikeNightTemperature = (day) => {
    //         let minDifference = 0
    //         let differenceArray = []
    //         let currentDifference = 0
    //         let dayIndex
    //         let funcDataObj = {}
    //             currentDifference = day.temp.night -day.feels_like.night
    //             // if(currentDiffereence > minDifference ){
    //             //     minDifference = currentDiffereence 
    //             //     dayIndex = i
    //             // }
    //             differenceArray.push(currentDifference)  
    //         minDifference = Math.min(...differenceArray)

    //         return minDifference.toFixed(2)
    //     }

    
    const fetchWeather = () =>{
        try{
            const response = fetch(process.env.REACT_APP_API_BASE_URL,{
                method:"GET",
                credentials:"same-origin",
                headers:{
                    'Content-Type': 'application/json'
                }
            })
            console.log("response",response)
            setWeather(response.data)
        }catch(e){
            console.log(e)
        }
    }
    useEffect(()=> {

    },[])


    return(
        <div>
            <h1>Weather Forecast</h1>
            <div>{weather.daily.slice(0,5).map((day,index) => <div key={index}>
                <div></div>
                <h5>Day: {index + 1} Date: {new Date(day.dt*1000).toString()}</h5>
                <div>Temperature "feels like" night : {day.feels_like.night} &#8451;</div>               
                <div>Temperature night: {day.temp.night} &#8451;</div>
                <div>Sunrise: {new Date(day.sunrise*1000).getHours()}:{new Date(day.sunrise*1000).getMinutes()} </div>
                <div>Sunset: {new Date(day.sunset*1000).getHours()}:{new Date(day.sunset*1000).getMinutes()} </div>
                <div>Daylight hours: {new Date((day.sunset - day.sunrise)*1000).getHours() }:{new Date((day.sunset - day.sunrise)*1000).getMinutes()}  </div>
                </div>
                )}
                
                </div>
                <div>
                    {weather.daily.filter((d,index) => minFeelsLikeNightTemperature(weather.daily).index == index)
                    .map(d => <div>
                        <h4>Minimal difference night =  {new Date(d.dt*1000).toString()}</h4>
                        <div>Temperature "feels like" night : {d.feels_like.night} &#8451;</div>
                        <div>Temperature night: {d.temp.night} &#8451;</div> 
                        <div>Temperature Difference = {(d.temp.night - d.feels_like.night).toFixed(2)} &#8451;</div>
                    </div>)}
                    {console.log('minFeelsLikeNightTemperature(weather.daily)',minFeelsLikeNightTemperature(weather.daily))}
                {console.log('weather',weather.daily.filter((d,index) => minFeelsLikeNightTemperature(weather.daily).index == index))}
                </div>
                {console.log('funcData')}
            <button onClick={fetchWeather}>Fetch weather</button>
        </div>
    )
}