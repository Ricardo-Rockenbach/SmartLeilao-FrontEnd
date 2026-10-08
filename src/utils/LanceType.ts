export type ClienteLance = {
    id: string
    nome: string
    email: string
    cidade: string
}

export type SmartphoneLance = {
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
}

export type LeilaoLance = {
    id: number
    smartphoneId: number
    valorInicial: string
    incrementoMinimo: string
    dataInicio: string
    dataFim: string
    status: string
    smartphone: SmartphoneLance
}

export type Lance = {
    id: number
    clienteId: string
    leilaoId: number
    valor: string
    createdAt: string
    cliente: ClienteLance
    leilao: LeilaoLance
    maiorLance: number
}