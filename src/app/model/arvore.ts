export class Arvore {
  id: number;
  identificacao: string;
  observacao: string;
  idUsuario: number;
  latitude: number;
  longitude: number;


  constructor(){
      this.id = 0;
      this.identificacao = '';
      this.observacao = '';
      this.idUsuario = 0;
      this.latitude = 0;
      this.longitude = 0;
  }
}
