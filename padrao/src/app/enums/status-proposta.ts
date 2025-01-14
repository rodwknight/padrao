import { Status } from 'src/app/interfaces/status'

export enum StatusProposta {
    EM_ANALISE = 1,
    APROVADO = 2,
    REJEITADO = 3
}

export const listaStatusProposta = new Map<StatusProposta, Status>([
    [StatusProposta.EM_ANALISE, { label: 'Em analise', type: 'warning' }],
    [StatusProposta.APROVADO, { label: 'Aprovado', type: 'success' }],
    [StatusProposta.REJEITADO, {label: 'Rejeitado', type: 'Danger'}]
])