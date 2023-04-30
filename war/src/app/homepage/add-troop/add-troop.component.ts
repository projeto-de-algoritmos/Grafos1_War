import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Region } from 'src/app/interface/Region';
import { HomepageService } from '../homepage.service';

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
