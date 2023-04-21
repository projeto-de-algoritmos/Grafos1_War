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

  ngOnInit() : void {
    console.log(map)

    this.mapa = map;
  }

  checkMap(territorio : string) : void {
    window.alert(`Territorio Selecionado: ${territorio}`)
  }
}
