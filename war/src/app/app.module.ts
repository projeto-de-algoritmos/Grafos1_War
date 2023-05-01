import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms"
import { HomepageComponent } from './homepage/homepage.component';
import { NavBarComponent } from './homepage/nav-bar/nav-bar.component';
import { SidebarComponent } from './homepage/sidebar/sidebar.component';
import { BattlePageComponent } from './homepage/battle-page/battle-page.component';
import { AddTroopComponent } from './homepage/add-troop/add-troop.component';
import { UndefinedPipe } from './pipes/undefined.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    NavBarComponent,
    SidebarComponent,
    BattlePageComponent,
    AddTroopComponent,
    UndefinedPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
