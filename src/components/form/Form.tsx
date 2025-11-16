import { useState, type ChangeEvent } from "react"
import { countries } from "../../data/countries"
import styles from "./Form.module.css"
import type { SearchType } from "../../types/types";
import Alert from "../../alert/Alert";



type FormProps={
    fetchWeather: (search:SearchType) => Promise<void>
}
export default function Form( {fetchWeather}: FormProps){

    // ESTADO GLOBAL 
    const[search, setSearch]=useState<SearchType>({
        city: '',
        country:''
    });


    const handleChange= (e:ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>)=> {
            setSearch({
                ...search,
                [e.target.name]:e.target.value
                //el name del input o select que he cambiado (city o country) -> el valor actual del input o select 
            })
    }




    //VALIDACION DEL FORMULARIO
    const[alert,setAlert]=useState('')

    const handleSubmit=(e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault() //para manejar el formulario como quiero

        if(search.city==='' || search.country===''){
            setAlert("All fields are mandatory")
            return
        }

        //cuando se pasa la validación: 
        fetchWeather(search)
        
    }



    return(
        <>
            <form className={styles.form} onSubmit={handleSubmit}>
                
                 {alert && <Alert>{alert}</Alert>}
                
                <div className={styles.field}>
                    <label htmlFor="city">City: </label>
                    <input id="city" type="text" name="city"
                    value={search.city} onChange={handleChange}/>
                </div>

                <div className={styles.field}>
                    <label htmlFor="country">Country: </label>
                    <select value={search.country} id="country" name="country" onChange={handleChange}>
                        <option value="">--- Select a country ---</option>
                        {countries.map( c=> (
                            <option key={c.code} value={c.code}>
                                {c.name}
                            </option>
                        ))}
                    </select>
                    
                </div>

                <input type="submit" value="Consult Weather" className={styles.submit}></input>

            </form>
        </>
    )
}