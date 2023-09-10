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

  constructor(private activatedRoute: ActivatedRoute, private usuarioService: UsuarioService, private fBuilder: FormBuilder, private toastController: ToastController, private navController: NavController, private alertController: AlertController, private loadingController: LoadingController) {
    this.nome = "";
    this.email = "";
    this.usuario = new Usuario();

    this.formGroup = this.fBuilder.group(
      {
        'nome': [{ value: this.nome}],
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

  async salvar(){
    this.usuario.nome = this.formGroup.value.nome;
    this.usuarioService.salvar(this.usuario).then((json)=>{
      this.usuario = <Usuario>(json);
      if (this.usuario.id > 0) {
        this.usuario = <Usuario>(json);
        localStorage.setItem('usuario', JSON.stringify(this.usuario));
        this.exibirMensagem('Dados atualizados com sucesso')
        this.navController.navigateBack('/home');
      } else {
        this.exibirMensagem('Erro ao atualizar dados')
      }
    })
  }

  async recuperarSenha(){
    debugger
    this.usuario.email = this.formGroup.value.email;
    this.usuarioService.recuperarSenha(this.usuario.email).then((json)=>{
      let teste = <boolean>(json);
      if(teste = true){
        this.exibirMensagem("Senha enviada para o email de cadastro!");
        this.usuarioService.recuperarSenha(this.usuario.email);
        this.navController.navigateBack('/home');
      }else{
        this.exibirMensagem("Erro ao recuperar senha!");
      }
    }).catch((erro) => {
      this.exibirMensagem("Erro ao realizar função! Erro:" + erro['menssage'])
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
