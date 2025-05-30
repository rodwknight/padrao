interface PropostaServicos {
    valor: number
    servicos: Servico
}

interface Servico {
    codServico: string
    nome: string
    descricao: string
}

interface Usuario {
    nome: string
}

interface Cliente {
    codCliente: string
    nomeFantasia: string
}

interface Unidade {
    codUnidade: string
    nomeFantasia: string
}

export interface DetalheProposta {
    id: string
    codProposta: string
    funcionarios: number    
    deslocamento: boolean
    valorDeslocamento: number
    total: number
    createdAt: Date
    propostaServicos: PropostaServicos[]
    status: number
    usuario: Usuario
    cliente: Cliente
    unidade: Unidade
}