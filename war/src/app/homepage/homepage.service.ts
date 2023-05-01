import { Injectable } from '@angular/core';
import { Mapa } from 'src/app/interface/Mapa';
import { map }  from '../../assets/map/mapa-war';
import { mapa, territorios }  from '../../assets/utils/grafo';
import { Region } from '../interface/Region';
import jogador_objetivo from '../../assets/utils/objetivos-utils'
import { bfs_neighbors } from 'src/assets/utils/territorios-utils';
import { fim_Jogo } from 'src/assets/utils/utils';


@Injectable({
  providedIn: 'root'
})
export class HomepageService {

  mapa !: Mapa;

  constructor() {
    this.mapa = map;
  }

  returnMap() : Mapa {
    territorios.sort((a,b) => {return a.id - b.id})
    
    let i = 0

    this.mapa.continents.forEach(continent => {
      continent.regions.forEach( region => {
          region.owner = territorios[i++].owner
      })
    })


    return this.mapa;
  }

  addTroop(territory: Region) : void {
    console.log(mapa);

    const index = territorios.findIndex(territorio => territorio.id == territory.id)
    territorios[index].tropas += 1;

    this.mapa.continents.forEach(continent =>
      continent.regions.forEach(region => {
        if(region.id == territory.id) region.tropas++;  
      })
    )
  }

  updateMap() : void {

    let i = 0;

    this.mapa.continents.forEach(continent => {
      continent.regions.forEach( region => {
          region.owner = territorios[i].owner
          region.tropas = territorios[i++].tropas
      })
    })

    console.log(territorios, this.mapa)

  }

  findNeighbors(regionId: number) : (Region | undefined) [] {
    
    const regions = bfs_neighbors(mapa,regionId)
    
    return regions
  }

  findTerritory(territoryId : number) : Region | undefined {
    return territorios.find(territorio => territorio.id == territoryId)
  }

  modifyOwner(continentId: number, territoryId : number, playerId: number) : void {

    //console.log(continentId,territoryId,playerId);

    this.mapa.continents[continentId].regions[territoryId].owner = playerId
  }

  showObjective(player : number) : string | undefined {
    return  jogador_objetivo.jogador_objetivo.find(objetivo => objetivo.jogador == player)
      ?.objetivo.descricao
  }
  
  finished(player : number) : void {
    
    const fim = fim_Jogo()

    console.log(fim)

    if(fim >= 0) {
      const objetivo = jogador_objetivo.jogador_objetivo.find(objetivo => objetivo.jogador == player);
      window.alert(`Parabens ao jogador ${player+1}, você atingiu seu objetivo : ${objetivo?.objetivo.descricao}`)

      window.location.reload()
  
    }

  }

}
