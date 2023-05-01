import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Region } from 'src/app/interface/Region';
import { sistema_Ataque } from 'src/assets/utils/utils';
import { HomepageService } from '../homepage.service';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-battle-page',
  templateUrl: './battle-page.component.html',
  styleUrls: ['./battle-page.component.scss']
})
export class BattlePageComponent implements OnInit {

  @Input() player !: number;
  @Input() territory !: Region;
  @Output() closed : EventEmitter<any> = new EventEmitter();
  
  enemyForm !: FormGroup
  enemy !: Region | undefined;

  constructor(private homePageService : HomepageService) { }

  neighborList !: (Region | undefined) []

  ngOnInit(): void {

    this.enemyForm = new FormGroup({
      option: new FormControl('')
    })

    this.findNeighbors()
    console.log("Criado com sucesso")    
  }


  close(): void {
    this.closed.emit()
  }

  findNeighbors() : void {
    this.neighborList = this.homePageService.findNeighbors(this.territory.id)
    console.log(this.neighborList)
  }

  attack() : void {
    console.log(this.enemyForm.value.option)

    const formResult = this.enemyForm.value

    this.enemy = this.neighborList.find(neighbor => neighbor?.id == formResult.option)

    if(this.enemy === undefined) this.enemy = {id: 0, continentId: 0, name: '',  owner: 0, tropas: 1}
    
    const res = sistema_Ataque(this.territory, this.enemy, this.player)
    
    this.updateInfo(res)
    
    console.log("Ataque acontecendo")
  }

  updateInfo(statusAtaque : number) : void {
    console.log(this.player)
    if(statusAtaque == -1){
      
      return

    } else if(statusAtaque == 1){

      this.homePageService.finished(this.player)

    }

    this.homePageService.updateMap()
  }

}
