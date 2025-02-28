import { PropostasServicos } from "./propostas-servicos"

interface Contrato {
    codContrato: string
}

export interface DetalheOrdem {
    id: string
    codOrdem: string
    status: number
    funcionarios: number
    deslocamento: boolean
    valorDeslocamento: number
    total: number
    dataInicial?: Date
    dataFinal?: Date
    contratos?: Contrato[]
    servicos: PropostasServicos[]
    codUnidade: string
    nomeUnidade: string
    codCliente: string
    nomeCliente: string
    nomeUsuario: string
    createdAt?: Date
}

