export interface FormServico extends Record<string, any> {
    codServico?: string
    nome: string
    descricao: string
    descricaoProposta: string
    valor: string | number
    createdAt?: Date
}
