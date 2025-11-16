import type { Weather } from "../../types/types"
import styles from './WeatherDetail.module.css'
type weatherDetailProps={
    weather:Weather
}
export default function WeatherDetail({weather}:weatherDetailProps) {
  
  
  return (
    <>
      
      <div className={styles.container}>
        <h2 className="text-3xl">{weather.name}</h2>
        <p  className={styles.temp}>{weather.main.temp.toFixed(0)}&deg;C</p> {/*para q salga sin decimales */}
        
        <p className="mb-5 text-base md:text-xl">Speed of Wind: <span>{(weather.wind.speed * 3.6).toFixed(0)} km/h</span></p>

        <div className={styles.temperatures}>
          <p className="text-blue-400">Feels like: <span>{weather.main.feels_like.toFixed()}&deg;C</span></p>
          <p className="text-blue-400">Humidity: <span>{weather.main.humidity}%</span></p>
        </div>
        
   
      </div>
      <div className="md:mb-0 mb-25"></div>
    </>
  )
}
