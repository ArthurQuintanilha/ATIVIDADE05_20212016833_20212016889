import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Usuario } from '../model/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  httpHeaders = {
    headers: new HttpHeaders({'Content-Type':'application/json'})
  }

  url: string = 'https://api-arvore2.odiloncorrea.tech/usuario';

  constructor(private httpClient: HttpClient) { }

  async salvar(usuario: Usuario) {
    if(usuario.id === 0){
      return await this.httpClient.post(this.url, JSON.stringify(usuario), this.httpHeaders).toPromise();
    }else{
      return await this.httpClient.put(this.url, JSON.stringify(usuario), this.httpHeaders).toPromise();
    }
  }

  async isUsuarioExists(email: String) {
    let urlAuxiliar = this.url + "/" + email + "/exists";
    return await this.httpClient.get(urlAuxiliar).toPromise();
  }

  async verificarSenha(usuario: Usuario){
    let urlAuxiliar = this.url + "/" + usuario.email + "/" + usuario.senha + "/authenticate";
    return await this.httpClient.get(urlAuxiliar).toPromise();
  }

  async buscarPorId(id: number) {
    let urlAuxiliar = this.url + "/" + id;
    return await this.httpClient.get(urlAuxiliar).toPromise();
  }

  async recuperarSenha(email: String){
    let urlAuxiliar = this.url + "/" + email + "/recover";
    return await this.httpClient.get(urlAuxiliar).toPromise();
  }

  
}
