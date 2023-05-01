import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Region } from 'src/app/interface/Region';
import { HomepageService } from '../homepage.service';
import { analisa_Bonus } from 'src/assets/utils/territorios-utils';
import { territorios } from 'src/assets/utils/grafo';

@Component({
  selector: 'app-add-troop',
  templateUrl: './add-troop.component.html',
  styleUrls: ['./add-troop.component.scss']
})
export class AddTroopComponent {

  @Input() player !: number;
  @Input() territory !: Region;
  @Output() alocated : EventEmitter<any> = new EventEmitter();
  @Output() closed : EventEmitter<any> = new EventEmitter();
  
  avaliableArmy : number = 5;

  constructor(private homePageService : HomepageService) {}

  close(): void {
    this.closed.emit()
  }

  add(territory: Region) : void {
    

    // territorios.forEach(territorio => {
    //   if(territorio.continentId == 1 || territorio.continentId == 2) territorio.owner = 0
    // })
    // console.log("Continente conquistado")
    //Adicionar busca no grafo para fazer contagem de territorios corretamente
    
    const plus = analisa_Bonus(this.player - 1);

    console.log(plus);

    if(plus > 0) window.alert(`Tropas extras por possuir um continente : ${plus}`)

    this.avaliableArmy += plus

    if(this.avaliableArmy > 0){
      this.homePageService.addTroop(territory)
      this.avaliableArmy--;
      
      return;
    }

    this.alocated.emit();

    window.alert("Você ja alocou suas tropas")

  }

}
