export interface FormServico extends Record<string, any> {
    codServico?: string
    nome: string
    descricao: string
    descricaoOrcamento: string
    valor: string | number
    createdAt?: Date
}
