import { Component, EventEmitter, OnInit, Output, Input } from '@angular/core';
import { Mapa } from 'src/app/interface/Mapa';
import { Region } from 'src/app/interface/Region';
import { HomepageService } from '../homepage.service';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  
  @Input() mapa !: Mapa;
  @Input() active !: boolean;
  @Output() territory : EventEmitter<any> = new EventEmitter();

  player : number [] = [1,2,3,4,5,6];


  constructor(private homePageService: HomepageService){}

  ngOnInit() : void {
    //console.log(map)
    this.distribuiton();
  }

  checkMap(territorio : Region) : void {

    //window.alert(`Territorio Selecionado: ${territorio.name}`)
    this.territory.emit(territorio)

  }

  colorTerritory(continentId : number,territoryId : number) : string {
    
    const playerId = this.mapa.continents[continentId].regions.find(region => region.id == territoryId);

    switch (playerId?.owner) {
      case 1:
        return 'blue';
      case 2:
        return 'orange';
      case 3:
        return 'red';
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
      continent.regions.forEach((regions,index) => {
        this.homePageService.modifyOwner(continent.id - 1, index, Math.floor(Math.random()*7- 0.1))
      })

    })

    console.log(this.homePageService.returnMap())
  }
}
