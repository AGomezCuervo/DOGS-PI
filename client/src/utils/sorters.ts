import { Dog } from "../Redux/features/dogsSlice";

export const sortAtoZ = (array:Dog[]) => {
    return array.sort((a,b) => a.name.localeCompare(b.name))
}

export const sortZtoA = (array:Dog[]) => {
    return array.sort((a,b) => b.name.localeCompare(a.name))
}

export const sortLighter = (array:Dog[]) => {
    return array.sort((a,b) => {
        const aWeight = a.averageWeight.split(" ");
        const bWeight = b.averageWeight.split(" ");
        if (Number(aWeight[0]) > Number(bWeight[0])) return  1
        if (Number(aWeight[0]) < Number(bWeight[0])) return -1
        return 0
    })
}

export const sortHeavier = (array:Dog[]) => {
    return array.sort((a, b) => {
        const aWeight = a.averageWeight.split(" ");
        const bWeight = b.averageWeight.split(" ");
        if (Number(aWeight[0]) < Number(bWeight[0])) return 1;
        if (Number(aWeight[0]) > Number(bWeight[0])) return -1;
        return 0;
    });
}