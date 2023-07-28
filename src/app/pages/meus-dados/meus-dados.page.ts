import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastController, NavController, AlertController, LoadingController } from '@ionic/angular';
import { Usuario } from '../../model/usuario';

@Component({
  selector: 'app-meus-dados',
  templateUrl: './meus-dados.page.html',
  styleUrls: ['./meus-dados.page.scss'],
})
export class MeusDadosPage implements OnInit {
  formGroup: FormGroup;
  nome: String;
  email: String;
  usuario: Usuario;

  constructor(private activatedRoute: ActivatedRoute, private usuarioService: UsuarioService, private fBuilder: FormBuilder, private toastController: ToastController, private navcontroller: NavController, private alertController: AlertController, private loadingController: LoadingController) {
    this.nome = "";
    this.email = "";
    this.usuario = new Usuario();

    this.formGroup = this.fBuilder.group(
      {
        'nome': [{ value: this.nome, disabled: true }],
        'email': [{ value: this.email, disabled: true }],
      }

    )
     let id = JSON.parse(localStorage.getItem('id') || '[]');
     this.usuarioService.buscarPorId(parseInt(id)).then((json) => {
      this.usuario = <Usuario>(json);
      this.formGroup.get('nome')?.setValue(this.usuario.nome);
      this.formGroup.get('email')?.setValue(this.usuario.email);
    })
  }

  ngOnInit() {
  }

}
