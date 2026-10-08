export type Foto = {
  id: number
  smartphoneId: number
  url: string
  ordem: number
}

export type Leilao = {
  id: number
  smartphoneId: number
  valorInicial: string
  incrementoMinimo: string
  dataInicio: string
  dataFim: string
  status: string
  maiorLance: string
}

export type Smartphone = {
  id: number
  marca: string
  modelo: string
  armazenamento: string
  memoriaRam: string
  cor: string
  condicao: string
  descricao: string
  imei: string
  createdAt: string
  updatedAt: string
  destaque: boolean
  fotos: Foto[]
  leiloes: Leilao[]
}