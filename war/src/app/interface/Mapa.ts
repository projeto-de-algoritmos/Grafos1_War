export interface Mapa {
    continents: {
        id: number, 
        name: string, 
        bonus: number,
        regions:  { id: number, name: string } []
    } [];
    borders: number[][];
}