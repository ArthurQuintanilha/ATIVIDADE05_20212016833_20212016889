import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { Arvore } from 'src/app/model/arvore';
import { ArvoreService } from 'src/app/services/arvore.service';

@Component({
  selector: 'app-arvores',
  templateUrl: './arvores.page.html',
  styleUrls: ['./arvores.page.scss'],
})
export class ArvoresPage implements OnInit {

  arvores: Arvore[];
  idUsuario: number;

  constructor(private arvoreService: ArvoreService, private loadingController: LoadingController) {
    this.arvores = [];
    this.idUsuario = JSON.parse(localStorage.getItem('id') || '[]');

  }

  ngOnInit() {
  }

  async ionViewWillEnter(){
    this.carregarLista();
 }

 async carregarLista(){
   this.carregarLoader();
   await this.arvoreService.listar(this.idUsuario).then((json) => {
     this.arvores = <Arvore[]> (json);
   });
   this.fecharLoader();
 }

 async carregarLoader(){
   setTimeout(() => {
     this.loadingController.create({
       message: "Carregando..."
     }).then(() => {
     }).catch((erro) => {
       console.log("Erro: ", erro)});
   }, 500);
 }

 async fecharLoader(){
   setTimeout(() => {
     this.loadingController.dismiss().then(() => {
     }).catch((erro) => {
       console.log("Erro: ", erro)});
   }, 500);
 }



}
