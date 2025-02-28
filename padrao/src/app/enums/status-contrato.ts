import { Status } from 'src/app/interfaces/status'

export enum StatusContrato {
    EM_ANALISE = 1,
    APROVADO = 2,
    REJEITADO = 3
}

export const listaStatusContrato = new Map<StatusContrato, Status>([
    [StatusContrato.EM_ANALISE, { label: 'Em analise', type: 'warning' }],
    [StatusContrato.APROVADO, { label: 'Aprovado', type: 'success' }],
    [StatusContrato.REJEITADO, {label: 'Rejeitado', type: 'danger'}]
])