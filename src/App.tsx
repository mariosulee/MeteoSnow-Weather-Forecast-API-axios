import Alert from "./alert/Alert"
import styles from"./App.module.css"
import Form from "./components/form/Form"
import SpinnerLoading from "./components/spinner/SpinnerLoading"
import WeatherDetail from "./components/weatherDetail/WeatherDetail"
import useWeather from "./hooks/useWeather"

function App() {

  const {weather, fetchWeather, hasWeather, loading, notFound}=useWeather()

  
  return (
    <>
    <div className="flex flex-col p-10 items-center">
      <h1 className={styles.title}>MeteoSnow</h1>
      <p className="text-base md:text-2xl">A Snow Weather Forecast by Mario Sulé</p>
      
      <div className={styles.container}>
        <Form
          fetchWeather={fetchWeather}
        />


        {/* SI EL ESTADO LOCAL LOADING ESTA A TRUE */}
        {loading && <SpinnerLoading/>}
        
        {/* SI EL ESTADO LOCAL NOTFOUND ESTA A TRUE */}
        {notFound && <Alert>City not found</Alert>}

        
        {hasWeather && (
          <WeatherDetail 
            weather={weather}/>
        )}

      </div>
    </div>

    <footer className=" md:py-10">
      <div>
        <p className="text-center text-xl md:text-3xl text-black font-bold ">
          MeteoSnow - Mario Sulé Domínguez. All rights reserved © 2025
        </p>
      </div>
    </footer>
      
    </>
  )
}

export default App
