export interface Mapa {
    continents: {
        id: number, 
        name: string, 
        bonus: number,
        regions:  { id: number, name: string, owner: number, tropas: number } []
    } [];
    borders: number[][];
}