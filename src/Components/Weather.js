import React, { useEffect, useState } from 'react'
import axios from "axios"
import {Box,Stack,Typography,Grid} from"@mui/material"
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';
import urls from "../cities_api/apis.json"
import "./Weather.css"

const Weather = () => {
    const cities = ["Berlin","New Delhi","New York"]
    const [cityIndex,setCityIndex] = useState(0)
    
    const[data,setData]=useState({Temperature:"",RelativeHumidity:"",WindSpeed:"",Sunrise:"", Sunset:""})

    useEffect(()=>{
        const current_city = cities[cityIndex]
        // console.log(current_city)
        getData(urls[current_city])
    },[cityIndex])

    const getData = async(current_city) =>{
        if(current_city==null)
        {
            setCityIndex(null)
        }else
        {
            const data=await axios.get(`${current_city}`)
            console.log(data)
            const sunriseDate = new Date(data.data.daily.sunrise[6])
            const sunriseTime = sunriseDate.toLocaleTimeString();
            const sunsetDate = new Date(data.data.daily.sunset[6])
            const sunsetTime = sunsetDate.toLocaleTimeString(); 
            setData({
                Temperature:data.data.current_weather.temperature,
                RelativeHumidity:data.data.hourly.relativehumidity_2m[167],
                Sunrise:sunriseTime,
                WindSpeed:data.data.current_weather.windspeed,
                Sunset:sunsetTime
            })
        }
        
    }

    
    const selectCity = (action) => {

        if(action==="next")
        {
            if(cityIndex===2)
            {
                setCityIndex(2)
                return
            }
            setCityIndex(prev=>prev+1)
        }else if(action==="prev")
        {
            if(cityIndex===0)
            {
                setCityIndex(0)
                return
            }
            setCityIndex(prev=>prev-1)
            
        }

    }
    
  return (
    <Box className='main'>
        <Stack direction={"row"} className="main-box">
            <ArrowBackIosIcon className='arrow-icon' onClick={()=>{selectCity("prev")}}/>
            <Box className="main-display">
                
                <h1 className='paper-items city'>{cities[cityIndex]}</h1>
                <span className='paper-items temp'>
                    {data.Temperature}<span className="degree-box"><CircleOutlinedIcon id='degree-symbol'/></span> C 
                </span>
                <span className='paper-items humidity'><span>Humidity: </span>{data.RelativeHumidity}%</span>
                <h3 className='paper-items windspeed'>WindSpeed:  {data.WindSpeed}km/h</h3>
                <h3 className='paper-items sunrise'> Sunrise: {data.Sunrise} </h3>
                <h3 className='paper-items sunset'> Sunset: {data.Sunset} </h3>
                
            </Box>
            <ArrowForwardIosIcon className='arrow-icon'onClick={()=>{selectCity("next")}}/>
        </Stack>
    </Box>
  )
}

export default Weather