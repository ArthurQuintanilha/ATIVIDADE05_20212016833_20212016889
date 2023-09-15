import { Component, OnInit } from '@angular/core';
import {NavController} from "@ionic/angular";

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(private navController: NavController) { }

  ngOnInit() {
  }

  sair(){
    localStorage.setItem('id', JSON.stringify(''));
    localStorage.setItem('usuario', JSON.stringify({}));
    this.navController.navigateBack('/login');
  }
}
