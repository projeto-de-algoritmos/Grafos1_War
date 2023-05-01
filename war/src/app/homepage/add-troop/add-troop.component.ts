import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Region } from 'src/app/interface/Region';
import { HomepageService } from '../homepage.service';
import { analisa_Bonus } from 'src/assets/utils/territorios-utils';
import { territorios } from 'src/assets/utils/grafo';

@Component({
  selector: 'app-add-troop',
  templateUrl: './add-troop.component.html',
  styleUrls: ['./add-troop.component.scss']
})
export class AddTroopComponent implements OnInit{

  @Input() player !: number;
  @Input() isAllocating !: boolean
  @Input() territory : (Region | undefined);
  @Output() alocated : EventEmitter<any> = new EventEmitter();
  @Output() closed : EventEmitter<any> = new EventEmitter();
  
  avaliableArmy : number = 5;
  plus : number = 0;

  constructor(private homePageService : HomepageService) {}

  ngOnInit(): void {
    this.territory = undefined;
    console.log("VOLTEI")
    this.verifyBonus()
  }

  close(): void {
    this.closed.emit()
  }

  verifyBonus() : void {
    this.plus = 0
    this.plus = analisa_Bonus(this.player - 1);

    if(this.plus > 0) window.alert(`Tropas extras por possuir um continente : ${this.plus}`)

    this.avaliableArmy += this.plus
  }

  add(territory: Region) : void {
    

    // territorios.forEach(territorio => {
    //   if(territorio.continentId == 1 || territorio.continentId == 2) territorio.owner = 0
    // })
    // console.log("Continente conquistado")
    //Adicionar busca no grafo para fazer contagem de territorios corretamente

    if(this.avaliableArmy > 0){
      this.homePageService.addTroop(territory)
      this.avaliableArmy--;
      
      return;
    }

    this.alocated.emit();

    window.alert("Você ja alocou suas tropas")

  }

}
