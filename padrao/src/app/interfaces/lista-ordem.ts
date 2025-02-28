interface ListaUnidade {
    codUnidade: string
    nomeFantasia: string
}

interface ListaCliente {
    codCliente: string
    nomeFantasia: string
}

interface ListaUsuario {
    nome: string
}

export interface ListaOrdem extends Record<string, any> {
    id: string
    codOrdem: string
    unidade: ListaUnidade
    cliente: ListaCliente 
    usuario: ListaUsuario
    status: number
    createdAt?: Date
}
