const APIKEY='8848ccacec651e5ac4383e507542c3e3';

const makeIconURl=(iconID)=>`https://openweathermap.org/img/wn/${iconID}@2x.png`;
const getFormattedWeatherData=async(city,units='metric')=>{
    const url=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKEY}&units=${units}`;
    const data=await fetch(url).then((res)=>res.json()).then(
        (data)=>data
    );
const {weather,
    main:{temp,feels_like, temp_min, temp_max, pressure
        ,humidity},
        wind:{speed},
        sys:{country},
        name,
    }=data;
    const {description, icon}=weather[0];
    return{
           description,iconURL:makeIconURl(icon),temp,feels_like,temp_min,temp_max,pressure,
           humidity,speed,country,name
    };
};
export {getFormattedWeatherData};