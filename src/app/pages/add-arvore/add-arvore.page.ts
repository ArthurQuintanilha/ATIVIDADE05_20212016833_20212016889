import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastController, NavController } from '@ionic/angular';
import { Arvore } from 'src/app/model/arvore';
import { ArvoreService } from 'src/app/services/arvore.service';

@Component({
  selector: 'app-add-arvore',
  templateUrl: './add-arvore.page.html',
  styleUrls: ['./add-arvore.page.scss'],
})
export class AddArvorePage implements OnInit {
  arvore: Arvore;
  formGroup: FormGroup;
  constructor(private arvoreService: ArvoreService, private fBuilder: FormBuilder, private activatedRoute: ActivatedRoute, private toastController: ToastController, private navController: NavController) {
    this.arvore = new Arvore();
    this.arvore.id = 0;
    this.formGroup = this.fBuilder.group(
      {
        'identificacao': [this.arvore.identificacao, Validators.compose([
          Validators.required
        ])],
        'observacao': [this.arvore.observacao, Validators.compose([
          Validators.required
        ])],

      }

    )
    let id = this.activatedRoute.snapshot.params['id'];
    if (id != null) {
      this.arvoreService.buscarPorId(parseInt(id)).then((json) => {
        this.arvore = <Arvore>(json);
        console.log(this.arvore.id);
        this.formGroup.get('identificacao')?.setValue(this.arvore.identificacao);
        this.formGroup.get('observacao')?.setValue(this.arvore.observacao);
      })
    } else {
      this.arvore.idUsuario = JSON.parse(localStorage.getItem('id') || '[]');
    }

  }

  salvar() {
    this.arvore.identificacao =  this.formGroup.value.identificacao;
    this.arvore.observacao = this.formGroup.value.observacao;
    this.arvoreService.salvar(this.arvore).then((json) => {
      this.arvore = <Arvore>(json);
      if (this.arvoreService)
        if (this.arvore) {
          console.log(this.arvore.idUsuario)
          this.exibirMensagem("Registro salvo com sucesso!!");
          this.navController.navigateBack('/arvores');
        } else {
          this.exibirMensagem('Erro ao salvar o registro.');
        }
    }).catch((erro) => {
      this.exibirMensagem('Erro aso salvar o registro! Erro: ' + erro["menssage"]);
    });

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
