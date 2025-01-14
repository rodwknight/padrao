export interface FormProposta extends Record<string, any> {
    codProposta?: string
    idUnidade: string
    idCliente: string
    funcionarios: number
    deslocamento: boolean
    valorDeslocamento: number
    createdAt?: Date
}
