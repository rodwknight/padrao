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

export interface FormOrdem extends Record<string, any> {
    id?: string
    codOrdem?: string
    status: number
    unidade?: Unidade
    cliente?: Cliente
    usuario?: Usuario
    createdAt?: Date
}
