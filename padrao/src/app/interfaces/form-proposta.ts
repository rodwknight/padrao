export interface FormProposta extends Record<string, any> {
    idUnidade: string
    idCliente: string
    funcionarios: number
    deslocamento: boolean
    valorDeslocamento: number
    createdAt?: Date
}
