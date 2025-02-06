import { PropostasServicos } from "./propostas-servicos"

export interface DetalheContrato {
    id: string
    codContrato: string
    funcionarios: number
    deslocamento: boolean
    valorDeslocamento: number
    total: number
    createdAt: Date
    status: number
    idProposta: string
    codProposta: string
    statusProposta: number
    servicos: PropostasServicos[]
    codUnidade: string
    nomeUnidade: string
    codCliente: string
    nomeCliente: string
    nomeUsuario: string
}