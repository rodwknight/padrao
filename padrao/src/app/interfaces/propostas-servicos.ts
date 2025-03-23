export interface Servicos {
    codServico: string
    descricao: string
    descricaoProposta?: string
    nome: string
}

export interface PropostasServicos extends Record<string, any> {
    valor: number
    servicos: Servicos
}
