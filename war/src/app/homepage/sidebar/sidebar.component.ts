import { Component, OnInit } from '@angular/core';
import { map }  from '../../../assets/map/mapa-war';
import { Mapa } from 'src/app/interface/Mapa';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  
  mapa !: Mapa;
  player : number [] = [1,2,3,4,5,6];
  ownerTerritory : { ownerId: number, territoryId: number } [] = [{ownerId:1,territoryId:1}];

  ngOnInit() : void {
    console.log(map)

    this.mapa = map;
    this.distribuiton();
  }

  checkMap(territorio : string) : void {
    window.alert(`Territorio Selecionado: ${territorio}`)
  }

  colorTerritory(territoryId : number) : string {
    
    const playerId = this.ownerTerritory.find(territory => territory.territoryId == territoryId);
    console.log(territoryId, playerId)

    const player1 = this.ownerTerritory.filter(territory => territory.ownerId == 1);

    console.log(player1.length)

    switch (playerId?.ownerId) {
      case 1:
        return 'blue';
      case 2:
        return 'orange';
      case 3:
        return 'yellow';
      case 4:
        return 'purple';
      case 5:
        return 'gray';
      case 6:
        return 'green';
      default:
        return 'black';
    }
  }

  distribuiton() : void {
    this.mapa.continents.forEach(continent => {
      continent.regions.forEach(regions => {
        this.ownerTerritory.push({ownerId: this.player[Math.floor(Math.random()*5)], territoryId: regions.id})
      })

    })
    console.log(this.ownerTerritory)
  }
}
