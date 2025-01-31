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

interface ListaProposta {
    unidade: ListaUnidade
    cliente: ListaCliente
    usuario: ListaUsuario
}

export interface ListaContrato extends Record<string, any> {
    id: string
    codContrato: string
    propostas: ListaProposta[]
    status: number
    cliente: ListaCliente
    unidade: ListaUnidade
    usuario: ListaUsuario
    createdAt?: Date
}
