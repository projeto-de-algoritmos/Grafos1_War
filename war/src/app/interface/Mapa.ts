import { Region } from "./Region";

export interface Mapa {
    continents: {
        id: number, 
        name: string, 
        bonus: number,
        regions: Region[]
    } [];
    borders: number[][];
}