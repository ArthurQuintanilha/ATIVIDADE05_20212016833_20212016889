import { Component, OnInit } from '@angular/core';
import {Arvore} from "../../model/arvore";
import {ArvoreService} from "../../services/arvore.service";
import {OcorrenciaService} from "../../services/ocorrencia.service";
import {ActionSheetController, LoadingController, NavController, ToastController} from "@ionic/angular";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import {Camera, CameraResultType, CameraSource} from "@capacitor/camera";
import {IFoto} from "../../model/IFoto";
import {FotoData} from "../../model/foto-data";
import {Foto} from "../../model/foto";
import {ArvoreFotoService} from "../../services/arvore-foto.service";
import {compass} from "ionicons/icons";

@Component({
  selector: 'app-arvore-foto',
  templateUrl: './arvore-foto.page.html',
  styleUrls: ['./arvore-foto.page.scss'],
})
export class ArvoreFotoPage implements OnInit {
  arvore: Arvore;
  formGroup: FormGroup;
  fotos: Foto[];
  constructor(private arvoreService: ArvoreService, public arvoreFotoService: ArvoreFotoService, public actionsSheetController: ActionSheetController, private ocorrenciaService: OcorrenciaService, private loadingController: LoadingController, private fBuilder: FormBuilder, private activatedRoute: ActivatedRoute, private toastController: ToastController, private navController: NavController) {
    this.arvore = new Arvore();
    this.fotos = [];
    this.formGroup = this.fBuilder.group(
      {
        'identificacao': [Validators.compose([
          Validators.required
        ])],
      })
    let id = this.activatedRoute.snapshot.params['idArvore'];
    if (id != null) {
      this.arvoreService.buscarPorId(parseInt(id)).then((json) => {
        this.arvore = <Arvore>(json);
        console.log(this.arvore.id);
        this.formGroup.get('identificacao')?.setValue(this.arvore.identificacao);
        this.formGroup.get('identificacao')?.disable();
        this.carregarLista();
      })
    } else {
      this.navController.navigateBack('/arvores');
    }
  }

  async registrarFoto() {
    await this.arvoreFotoService.registrar(this.arvore.id).then((json) => {
      let resposta = <any>(json);
      console.log(resposta)
      if (this.arvoreFotoService)
        if (resposta) {
          console.log(this.arvore.idUsuario)
          this.exibirMensagem("Foto salva com sucesso!!");
        this.carregarLista()

        } else {
          this.exibirMensagem('Erro ao salvar o registro.');
        }
    }).catch((erro) => {
      this.exibirMensagem('Erro aso salvar o registro! Erro: ' + erro["menssage"]);
    });
  }
  async excluirFoto(idFoto: number) {
    const actionSheet = await this.actionsSheetController.create({
      header: 'Fotos',
      buttons: [{
        text: 'Excluir',
        icon: 'trash',
        handler: () => {
          this.arvoreFotoService.excluir(idFoto).then(() => {
            this.carregarLista();
          })
        }
      }, {
        text: 'Cancelar',
        icon: 'close',
      }]
    });
    await actionSheet.present();
  }

  async carregarLista() {
    this.exibirLoader();
    await this.arvoreFotoService.listarPorIdArvore(this.arvore.id).then((json) => {
      this.fotos = <Foto[]>(json);
      this.fecharLoader();
    });

  }
  exibirLoader() {
    this.loadingController.create({
      message: 'Carregando...'
    }).then((res) => {
      res.present();
    })
  }

  fecharLoader() {
    setTimeout(() => {
      this.loadingController.dismiss().then(() => {
      }).catch((erro) => {
        console.log('Erro: ', erro)
      });
    }, 500);
  }

  async exibirMensagem(texto: string) {
    const toast = await this.toastController.create({
      message: texto,
      duration: 1500
    });
    toast.present();
  }
  ngOnInit() {
  }

}
