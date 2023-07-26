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

  constructor(private usuarioService: UsuarioService,  private fBuilder: FormBuilder, private activatedRoute: ActivatedRoute, private toastController: ToastController, private navController: NavController) { 
    this.usuario = new Usuario();
    this.formGroup = this.fBuilder.group(
      {
        'email': [this.usuario.email, Validators.compose([
          Validators.required
        ])],

        'descricao': [this.usuario.senha, Validators.compose([
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
        
      }
    })
  }

}
