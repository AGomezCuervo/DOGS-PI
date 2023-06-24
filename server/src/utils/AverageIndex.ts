export const averageWeightApi = (weight: string) => {
    
    const array = weight.split(" - ");
    const average = (Number(array[0]) + Number(array[1])) / 2
    return Math.floor(average)
}

export const averageHeightApi = (height: string) => {
    const array = height.split(" - ")
    const average = (Number(array[0]) + Number(array[1]))/2
    return Math.floor(average)
}


export const averageImperial = (value: string, type:string) => {
    if(type === "weight"){
        const array = value.split(" - ")
        const initialKG = Number(array[0]) * 0.45359237
        const endKG = Number(array[1]) * 0.45359237
        const average = (initialKG + endKG) / 2
        return Math.floor(average)
    }
    const array = value.split(" - ")
    const initialM = Number(array[0]) * 2.54
    const endM = Number(array[1]) * 2.54
    const average = (initialM + endM)
    return Math.floor(average)
}

export const averageWeightDB = (initial: string, end: string) => {
    const average = (Number(initial) + Number(end)) / 2;
    return Math.floor(average)
}
export const averageHeightDB = (initial: string, end: string) => {
    const average = (Number(initial) + Number(end)) / 2;
    return Math.floor(average)
}