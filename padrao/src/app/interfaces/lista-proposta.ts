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

export interface ListaProposta extends Record<string, any> {
    id: string
    codProposta: string
    unidade: ListaUnidade
    cliente: ListaCliente 
    usuario: ListaUsuario
    status: number
    createdAt?: Date
}
