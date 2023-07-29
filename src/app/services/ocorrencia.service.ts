import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Ocorrencia } from '../model/ocorrencia';


@Injectable({
  providedIn: 'root'
})
export class OcorrenciaService {
  httpHeaders = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  url: string = 'https://api-arvore.odiloncorrea.tech/ocorrencia';

  constructor(private httpClient: HttpClient) { }

  async salvar(ocorrencia: Ocorrencia) {
    return await this.httpClient.post(this.url, JSON.stringify(ocorrencia), this.httpHeaders).toPromise();
  }

  async listar(idArvore: number) {
    let urlAuxiliar = this.url + "/" + idArvore + "/arvore";
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
