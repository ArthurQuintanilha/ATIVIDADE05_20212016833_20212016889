import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Foto} from "../model/foto";
import {Camera, CameraResultType, CameraSource, Photo} from "@capacitor/camera";

@Injectable({
  providedIn: 'root'
})
export class ArvoreFotoService {

  httpHeaders = {
    headers: new HttpHeaders({'Content-Type':'application/json'})
  }
  url: string = 'https://api-arvore2.odiloncorrea.tech/foto';
  urlUpload: string = 'https://api-arvore2.odiloncorrea.tech/foto/upload';
  constructor(private httpClient: HttpClient) {
  }

  async salvar(foto: Foto) {
    return await this.httpClient.post(this.url, JSON.stringify(foto), this.httpHeaders).toPromise();
  }

  async excluir(id: number){
    let urlAuxiliar = this.url + "/" + id;
    return await this.httpClient.delete(urlAuxiliar).toPromise();
  }

  async listar(){
    let urlAuxiliar = this.url;
    return await this.httpClient.get(urlAuxiliar).toPromise();
  }

  async listarPorIdArvore(idPonto: number){
    let urlAuxiliar = this.url + "/" + idPonto + "/arvore";
    return await this.httpClient.get(urlAuxiliar).toPromise();
  }

  async buscarPorId(id: number){
    let urlAuxiliar = this.url + "/" + id;
    return await this.httpClient.get(urlAuxiliar).toPromise();
  }


  async registrar(idArvore: number) {
    const fotoCapturada = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
      quality: 100
    });

    let nmFoto = new Date().getTime() +"."+ fotoCapturada.format;
    console.log(nmFoto)
    this.upload(fotoCapturada, nmFoto);

    let foto = new Foto();
    foto.imagem = nmFoto;
    foto.data = new Date(Date.now()).toISOString();
    foto.idArvore = idArvore;

    return await this.salvar(foto);
  }

  private async upload(photo: Photo, nomeImagem: string){
    let response = await fetch(photo.webPath!);
    let blob = await response.blob();

    const formData = new FormData();
    formData.append('file', blob, nomeImagem);
    await this.httpClient.post(this.urlUpload, formData).toPromise();
  }

}
