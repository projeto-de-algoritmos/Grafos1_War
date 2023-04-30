import { Injectable } from '@angular/core';
import { Mapa } from 'src/app/interface/Mapa';
import { map }  from '../../assets/map/mapa-war';
import { Region } from '../interface/Region';


@Injectable({
  providedIn: 'root'
})
export class HomepageService {

  mapa !: Mapa;

  constructor() {
    this.mapa = map;
  }

  returnMap() : Mapa {
    return this.mapa;
  }


  addTroop(territory: Region) : void {

    map.continents.forEach(continent =>
      continent.regions.forEach(region => {
        if(region.id == territory.id) region.tropas++;  
      })
    )

  }

  modifyOwner(continentId: number, territoryId : number, playerId: number) : void {

    console.log(continentId,territoryId,playerId);

    this.mapa.continents[continentId].regions[territoryId].owner = playerId
  }

}
