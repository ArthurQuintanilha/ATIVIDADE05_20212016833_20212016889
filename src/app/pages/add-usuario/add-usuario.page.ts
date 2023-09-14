import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastController, NavController } from '@ionic/angular';
import { Usuario } from 'src/app/model/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-add-usuario',
  templateUrl: './add-usuario.page.html',
  styleUrls: ['./add-usuario.page.scss'],
})
export class AddUsuarioPage implements OnInit {

  usuario: Usuario;
  formGroup: FormGroup;

  constructor(private activatedRoute: ActivatedRoute, private toastController: ToastController, private navController: NavController, private formBuilder: FormBuilder, private usuarioService: UsuarioService) {
    this.usuario = new Usuario();
    this.formGroup = this.formBuilder.group({
      'nome': [null, Validators.compose([
        Validators.required,
      ])],
      'email': [null, Validators.compose([
        Validators.required,
      ])]
    })
   }

  ngOnInit() {
  }

  async cadastrar() {
    let nome = this.formGroup.value.nome;
    let email = this.formGroup.value.email;
    this.usuarioService.isUsuarioExists(email).then((json) =>{
      let qtd = <number>(json);
      if (qtd === 0) {
        this.usuario.email = email;
        this.usuario.nome = nome;
        this.usuario.senha =  Math.random().toString(36).substring(2,7);
        this.usuarioService.recuperarSenha(this.usuario.email);
        this.usuarioService.salvar(this.usuario).then((json) =>{
          this.usuario = <Usuario>(json);
          console.log(this.usuario)
          if (this.usuario.id > 0) {
            debugger
            this.exibirMensagem('Cadastro realizado com sucesso! Senha enviada para o email de cadastro')
            this.usuarioService.recuperarSenha(this.usuario.email);
            this.navController.navigateBack('/login');
          } else {
            this.exibirMensagem('Erro ao cadastrar!')
          }
        }).catch((erro) => {
          this.exibirMensagem("Erro ao cadastrar usuário! Erro:" +  erro['menssage'])
        });
      } else {
        this.exibirMensagem('E-mail já cadastrado')
      }
    }).catch((erro) => {
      this.exibirMensagem("Erro ao verificar email! Erro:" +  erro['menssage'])
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
