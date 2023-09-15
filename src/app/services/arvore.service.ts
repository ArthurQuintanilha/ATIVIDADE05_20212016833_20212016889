import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Arvore } from '../model/arvore';


@Injectable({
  providedIn: 'root'
})
export class ArvoreService {
  httpHeaders = {
    headers: new HttpHeaders({'Content-Type':'application/json'})
  }

  url: string = 'https://api-arvore2.odiloncorrea.tech/arvore';

  constructor(private httpClient: HttpClient) { }

  async salvar(arvore: Arvore) {
    if (arvore.id === 0) {
      return await this.httpClient.post(this.url, JSON.stringify(arvore), this.httpHeaders).toPromise();
    } else {
      return await this.httpClient.put(this.url, JSON.stringify(arvore), this.httpHeaders).toPromise();
    }  }

  async listar(idUsuario: number) {
    let urlAuxiliar = this.url + "/" + idUsuario +"/usuario";
    return await this.httpClient.get(urlAuxiliar).toPromise();
  }

  async buscarPorId(id: number) {
    let urlAuxiliar = this.url + "/" + id;
    return await this.httpClient.get(urlAuxiliar).toPromise();
  }

  async excluir(id: number) {
    let urlAuxiliar = this.url + "/" + id;
    return await this.httpClient.delete(urlAuxiliar).toPromise();

  }
}
