export interface FormOrdem extends Record<string, any> {
    codOrdem?: string
    idUnidade: string
    idCliente: string
    funcionarios: number
    deslocamento: boolean
    valorDeslocamento: number
    createdAt?: Date
}
