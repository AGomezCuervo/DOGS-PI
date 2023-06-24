export interface ApiDog {
    weight: {
        imperial: string,
        metric: string
    },
    height: {
        imperial: string,
        metric: string
    },
    id: number,
    name: string,
    bred_for: string,
    breed_group: string,
    life_span: string,
    temperament?: string,
    origin: string,
    reference_image_id: string,
    image: {
        id: string,
        width: number,
        height: number,
        url: string
    }
}

export interface Characteristics {
    heightMetric: Array<string>,
    heightImperial: string,
    weightMetric: Array<string>,
    weightImperial: string
}

export type Option = "averageWeight" | "averageHeight" | "weight" | "height";