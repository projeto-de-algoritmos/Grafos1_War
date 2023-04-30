import { Component, OnInit } from '@angular/core';
import { Region } from '../interface/Region';
import { Mapa } from '../interface/Mapa';
import { HomepageService } from './homepage.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {
    
  aux :boolean = false;
  territorio !: Region;
  enemyTerritory !: Region;
  players : number[] = [1,2,3,4,5,6];
  startPlay : boolean = true;
  started: boolean = false;
  isAllocating: boolean = false;
  turn: number = 1;
  mapa !: Mapa;

  constructor(private homePageService : HomepageService) {}

  ngOnInit() : void {
    this.mapa = this.homePageService.returnMap()
  }

  handleClick(territorio: Region): void {

    if (territorio.owner != this.turn) {
      window.alert("Este território não pertence a você jogador " + this.turn)
      return;
    }

    this.aux = this.startPlay ? false : true;
    this.territorio = territorio
    console.log("este é o territorio: " + this.territorio.name)
  
  }

  startGame() : void {
    this.started = true;
    this.isAllocating = true;
    window.alert("O jogo foi iniciado! Que vença o melhor")
  }

  endAllocation() : void {
    this.isAllocating = !this.isAllocating;
    this.startPlay = !this.startPlay;

    window.alert("AGORA É HORA DE ATACAR !!")
  }

  turnOf() : void {
    this.turn = this.turn%6 + 1; 
  }

  changeTurn() : void {
    this.turnOf()
    window.alert(`Agora é a vez do jogador ${this.turn} `)
    this.isAllocating = !this.isAllocating;
    this.startPlay = !this.startPlay;
  }

  changeAux(): void {
    this.aux = !this.aux;
  }

  

}
