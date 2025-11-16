export type SearchType={
    city:string,
    country:string
}


export type Country={
    code:string,
    name:string
}

export type Weather={
    name:string,
    main: {
        temp:number,
        feels_like: number,
        humidity:number,
        temp_max:number,
        temp_min:number
    }

    wind: {
        speed: number
    }

}