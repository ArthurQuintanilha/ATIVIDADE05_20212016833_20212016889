import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastController, NavController, LoadingController } from '@ionic/angular';
import { Arvore } from 'src/app/model/arvore';
import { Ocorrencia } from 'src/app/model/ocorrencia';
import { ArvoreService } from 'src/app/services/arvore.service';
import { OcorrenciaService } from 'src/app/services/ocorrencia.service';

@Component({
  selector: 'app-ocorrencias',
  templateUrl: './ocorrencias.page.html',
  styleUrls: ['./ocorrencias.page.scss'],
})
export class OcorrenciasPage implements OnInit {
  arvore: Arvore;
  ocorrencia: Ocorrencia;
  ocorrencias: Ocorrencia[];
  formGroup: FormGroup;
  constructor(private arvoreService: ArvoreService, private ocorrenciaService: OcorrenciaService, private loadingController: LoadingController, private fBuilder: FormBuilder, private activatedRoute: ActivatedRoute, private toastController: ToastController, private navController: NavController) {
    this.ocorrencia = new Ocorrencia();
    this.arvore = new Arvore();
    this.ocorrencias = [];
    this.ocorrencia.id = 0;
    this.formGroup = this.fBuilder.group(
      {
        'identificacao': [, Validators.compose([
          Validators.required
        ])],
        'descricao': [this.ocorrencia.descricao, Validators.compose([
          Validators.required
        ])],

      }

    )
    let id = this.activatedRoute.snapshot.params['idArvore'];
    if (id != null) {
      this.arvoreService.buscarPorId(parseInt(id)).then((json) => {
        this.arvore = <Arvore>(json);
        console.log(this.arvore.id);
        this.formGroup.get('identificacao')?.setValue(this.arvore.identificacao);
        this.formGroup.get('identificacao')?.disable();
      })
    } else {
      this.navController.navigateBack('/arvores');
    }

  }

  ngOnInit() {
  }


  async ionViewWillEnter() {
    this.carregarLista();
  }
  async carregarLista() {
    const loader = await this.carregarLoader(); // Cria o loadingController e obtém sua referência

    await this.ocorrenciaService.listar(this.arvore.id).then((json) => {
      this.ocorrencias = <Ocorrencia[]>(json);
    });

    this.fecharLoader();
  }

  async carregarLoader() {
    setTimeout(() => {
      const loader = this.loadingController.create({
        message: "Carregando..."
      }).then(() => {
      }).catch((erro) => {
        console.log("Erro: ", erro)
      });
    }, 500);

  }

  fecharLoader() {
    setTimeout(() => {
      this.loadingController.dismiss().then(() => {
      }).catch((erro) => {
        console.log("Erro: ", erro)
      });
    }, 500);
  }

  salvar() {
    this.ocorrencia.descricao = this.formGroup.value.descricao;
    this.ocorrencia.idArvore = this.arvore.id;
    const dataAtual = new Date();
    const ano = dataAtual.getFullYear();
    const mes = ('0' + (dataAtual.getMonth() + 1)).slice(-2);
    const dia = ('0' + dataAtual.getDate()).slice(-2);

    this.ocorrencia.data = `${ano}/${mes}/${dia}`;
    console.log(this.ocorrencia.data);
    this.ocorrenciaService.salvar(this.ocorrencia).then((json) => {
      this.ocorrencia = <Ocorrencia>(json);
      if (this.ocorrenciaService)
        if (this.ocorrencia) {
          this.exibirMensagem("Registro salvo com sucesso!!");
          this.ocorrencia.id = 0;
          this.ocorrencia.data = "";
          this.ocorrencia.descricao = "";
          this.formGroup.get('descricao')?.setValue("");
          this.carregarLista();
        } else {
          this.exibirMensagem('Erro ao salvar o registro.');
        }
    }).catch((erro) => {
      this.exibirMensagem('Erro aso salvar o registro! Erro: ' + erro["menssage"]);
    });

  }

  excluir(id: number) {
    this.ocorrenciaService.excluir(id).then((json) => {
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
