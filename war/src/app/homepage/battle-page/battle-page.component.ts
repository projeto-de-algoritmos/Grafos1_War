import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Region } from 'src/app/interface/Region';

@Component({
  selector: 'app-battle-page',
  templateUrl: './battle-page.component.html',
  styleUrls: ['./battle-page.component.scss']
})
export class BattlePageComponent implements OnInit {

  @Input() territory !: Region;
  @Input() enemy !: Region;
  @Output() closed : EventEmitter<any> = new EventEmitter();

  neighborList = [
    "Australia",
    "Brasil",
    "California",
    "Vladivostok"
  ]

  ngOnInit(): void {
    console.log("Criado com sucesso")    
  }

  close(): void {
    this.closed.emit()
  }

  attack() : void {
    //Adicionar lógica de ataque e fazer o controle de tropas
    console.log("Ataque acontecendo")
  }

}
