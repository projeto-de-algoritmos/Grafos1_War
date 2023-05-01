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
    // console.log(map)
  }

  checkMap(territorio : Region) : void {

    //window.alert(`Territorio Selecionado: ${territorio.name}`)
    console.log(`ID owner : ${territorio.owner}` )

    this.territory.emit(this.homePageService.findTerritory(territorio.id))

  }

  colorTerritory(territoryId : number) : string {
    
    const playerId = this.homePageService.findTerritory(territoryId);

    switch (playerId?.owner) {
      case 0:
        return 'blue';
      case 1:
        return 'orange';
      case 2:
        return 'red';
      case 3:
        return 'purple';
      case 4:
        return 'gray';
      case 5:
        return 'green';
      default:
        return 'black';
    }
  }

}
