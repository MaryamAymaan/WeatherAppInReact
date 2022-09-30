import logo from './logo.svg';
import './App.css';
import hotBg from "./assets/hot.jpg";
import ColdBg from "./assets/cold.jpg"
import Descriptions from './components/Descriptions';
import { useEffect, useState } from 'react';
import { getFormattedWeatherData } from './weatherservice';
function App() {
  const [city, setCity] = useState("Paris");
  const [weather,setWeather]=useState(null);
  const[units,setUnits]=useState("metric");
  const [bg, setBg] = useState(hotBg);

   useEffect( ()=>{
    const fetchweatherData=async()=>{
      const data=await getFormattedWeatherData(city,units);
setWeather(data);

const threshold=units ==='metric'?20:60;
if(data.temp<=threshold)
{
  setBg(ColdBg);
}
else{
  setBg(hotBg);
}

    };
    fetchweatherData();
   },[units,city] );

const handleUnitClick=(e)=>{
const button=e.currentTarget;
const curretUnit=button.innerText.slice(1);
const isCes=curretUnit ==='C';
button.innerText=isCes?'°F':'°C';
setUnits(isCes?'metric':'imperial');
};
const enterKeyPressed=(e)=>{
    if(e.keyCode===13){
      setCity(e.currentTarget.value);
      e.currentTarget.blur();
    }
}
  return (  
    <div className='App' style={{backgroundImage:`url(${bg})`}}>
       <div className='overlay'>
        {
          weather &&(
            <div className='container'>
            <div className='section section_inputs'>
              <input onKeyDown={enterKeyPressed} type='text' name="city" placeholder='Enter city ...'/>
                 <button onClick={(e)=>handleUnitClick(e)}>℉</button>
            </div>
            <div className='section section_temperature'>
              <div className='icon'>
                    <h3>{`${weather.name},${weather.country}`}</h3>
                    <img src={weather.iconURL}alt="weather icon"></img>
                    <h3>{weather.description}</h3>
              </div>
              <div className='tempeature' >
                <h1>{`${weather.temp.toFixed()} °${
                  units==='metric'?'C':'f'
                }`}</h1>
              </div>
            </div>
            <Descriptions weather={weather}units={units}/>
          </div>
          )
        }
       
        </div>      
    </div>
  );
}

export default App;
