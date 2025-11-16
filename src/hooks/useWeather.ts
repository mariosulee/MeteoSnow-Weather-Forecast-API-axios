import axios from "axios"
import type { SearchType, Weather } from "../types/types"
import { useMemo, useState } from "react"

const initialState={
    name:'',
        main:{
            temp:0,
            feels_like:0,
            humidity:0,
            temp_max:0,
            temp_min:0
        },
        wind:{
            speed:0
        }
}
export default function useWeather(){

    const[weather,setWeather]=useState<Weather>(initialState)
    
    //SPINNER
    const[loading, setLoading]=useState(false)

    //PARA VER SI ENCUENTRA UNA CIUDAD 
    const[notFound, setNotFound]=useState(false)

    // funcion para consultar el clima
    const fetchWeather= async (search:SearchType)=> {
        
        const APIkey= import.meta.env.VITE_API_KEY // mi clave para acceder a la API, se debe ocultar
        setLoading(true)
        setWeather(initialState)


        try{
            const geoURL= `https://api.openweathermap.org/geo/1.0/direct?q=${search.city},${search.country}&appid=${APIkey}`

            const {data}= await axios(geoURL)   //hace una peticion HTTP GET a la URL. el destructuring de data es para extraer la propiedad data del objeto que devuelve axios
            
            //comprobar si existe la ciudad
            if(!data[0]){
                setNotFound(true)
                return //para que no se ejecute lo demas del codigo
            }

            setNotFound(false)

            //segunda llamada a la api
            const lat=data[0].lat
            const lon=data[0].lon

            const weatherURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIkey}&units=metric`;
            const {data: data2}=await axios<Weather>(weatherURL)
            setWeather(data2)


        }catch(error){
            console.log("Error al consultar la API: " , error)
        } finally{
            setLoading(false)
        }
    }




    //para que no se muestre el clima si en weather no hay nada
    const hasWeather= useMemo(() => weather.name, [weather])

   


    // funciones estados etc... que devuelve mi custom hook
    return{
        weather, //estado  del custom hook
        fetchWeather,
        hasWeather,
        loading, //estado local para el spinner
        notFound
    }
}