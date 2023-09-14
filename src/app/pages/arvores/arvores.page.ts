import { Component, OnInit } from '@angular/core';
import { LoadingController, ToastController } from '@ionic/angular';
import { Arvore } from 'src/app/model/arvore';
import { Foto } from 'src/app/model/foto';
import { ArvoreFotoService } from 'src/app/services/arvore-foto.service';
import { ArvoreService } from 'src/app/services/arvore.service';

@Component({
  selector: 'app-arvores',
  templateUrl: './arvores.page.html',
  styleUrls: ['./arvores.page.scss'],
})
export class ArvoresPage implements OnInit {

  fotos: Foto[];
  arvores: Arvore[];
  idUsuario: number;
  fotoAux: Foto;
  isBusy: boolean = false;


  constructor(private arvoreService: ArvoreService, private arvoreFotoService: ArvoreFotoService, private toastController: ToastController, private loadingController: LoadingController) {
    this.arvores = [];
    this.idUsuario = JSON.parse(localStorage.getItem('id') || '[]');
    this.fotos = [];
    this.fotoAux = new Foto();
    this.fotoAux.imagem = "https://static.vecteezy.com/ti/vetor-gratis/p1/14625446-foto-retrato-imagem-quadro-galeria-sinal-de-simbolo-isolado-de-de-icone-de-fotografia-gratis-vetor.jpg";
  }

  ngOnInit() {
  }

  async ionViewWillEnter() {
    this.carregarLista();
  }
 
  async carregarLista() {
    this.exibirLoader();
    this.isBusy = true;
    await this.arvoreService.listar(this.idUsuario).then((json) => {
      this.arvores = <Arvore[]>(json);
    });
    await this.carregarFotos();
    this.isBusy = false;
    this.fecharLoader();
  }

  async carregarFotos() {
    this.isBusy = true;
    for (const arvore of this.arvores) {
      await this.arvoreFotoService.listarPorIdArvore(arvore.id).then((json) => {
        let fotos = <Foto[]>(json);
        if (fotos[0] == null || fotos[0].imagem === "") {
          let foto: Foto;
          foto = this.fotoAux;
          this.fotos.push(foto);
          console.log('Fotos01:', fotos);
        } else {
          this.fotos.push(fotos[0])
          console.log('Fotos02:', fotos);
        }
      });
    }
    this.isBusy = false;
  }
  
  exibirLoader(){
    this.loadingController.create({
      message: 'Carregando...'
    }).then((res)=>{
      res.present();
    })
  }


  fecharLoader(){
    setTimeout(()=>{
      this.loadingController.dismiss().then(()=>{
      }).catch((erro)=>{
        console.log('Erro: ', erro)
      });
    }, 500);
  }

  async deletar(id: number) {
    console.log(id)
    await this.arvoreFotoService.listarPorIdArvore(id).then((json) => {
      let fotos = <Foto[]>(json);
      for (let i = 0; i < fotos.length; i++) {
        this.arvoreFotoService.excluir(fotos[i].id)
      }
    });
    this.arvoreService.excluir(id).then((json) => {
      let quantidade = <number>(json);
      if (quantidade > 0) {
        this.exibirMensagem('Deletado com sucesso!');
        this.carregarLista();
      } else {
        this.exibirMensagem('Erro ao deletar!');
      }
    });
  }

  async exibirMensagem(texto: string) {
    const toast = await this.toastController.create({
      message: texto,
      duration: 1500
    });
    toast.present();
  }

}
