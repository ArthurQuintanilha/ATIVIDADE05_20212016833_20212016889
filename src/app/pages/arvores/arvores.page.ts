import { Component, OnInit } from '@angular/core';
import {LoadingController, ToastController} from '@ionic/angular';
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

  constructor(private arvoreService: ArvoreService, private toastController: ToastController, private loadingController: LoadingController) {
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

 async deletar(id: number){
   this.arvoreService.excluir(id).then((json) => {
     let quantidade = <number>(json);
     if (quantidade > 0) {
       this.exibirMensagem('Deletado com sucesso!');
       this.carregarLista();
     } else {
       this.exibirMensagem('Erro ao deletar!');
     }
   }); }
  async exibirMensagem(texto: string) {
    const toast = await this.toastController.create({
      message: texto,
      duration: 1500
    });
    toast.present();
  }

}
