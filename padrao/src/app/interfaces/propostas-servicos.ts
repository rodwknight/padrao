interface Servicos {
    codServico: string
    descricao: string
    nome: string
}

export interface PropostasServicos extends Record<string, any> {
    valor: number
    servicos: Servicos
}
