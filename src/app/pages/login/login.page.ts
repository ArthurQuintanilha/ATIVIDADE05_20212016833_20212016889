import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NavController, ToastController } from '@ionic/angular';
import { Usuario } from 'src/app/model/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  usuario: Usuario;
  formGroup: FormGroup;

  constructor(private usuarioService: UsuarioService,  private fBuilder: FormBuilder, private toastController: ToastController, private navController: NavController) {
    this.usuario = new Usuario();
    this.formGroup = this.fBuilder.group(
      {
        'email': [this.usuario.email, Validators.compose([
          Validators.required
        ])],

        'senha': [this.usuario.senha, Validators.compose([
          Validators.required
        ])],
      }

    )
  }

  ngOnInit() {
  }

  autenticar(){
    this.usuario.email = this.formGroup.value.email;
    this.usuario.senha = this.formGroup.value.senha;
    this.usuarioService.isUsuarioExists(this.usuario.email).then((json) => {
      let quantidade = <number>(json);
      if(quantidade > 0) {
        this.usuarioService.verificarSenha(this.usuario).then((json) => {
          let teste = <any>(json);
          if(teste === "{}"){
            this.exibirMensagem('Senha incorreta');
          }else{
            this.usuario = teste;
            localStorage.setItem('id', JSON.stringify(this.usuario.id));
            this.navController.navigateBack('/home');
          }
        }).catch((erro) => {
          this.exibirMensagem("Erro ao verificar senha! Erro:" + erro['menssage'])
        });
      }else{
        this.exibirMensagem('Email não cadastrado');
      }
    }).catch((erro) => {
      this.exibirMensagem("Erro ao verificar email! Erro:" + erro['menssage'])
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
