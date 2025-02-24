import { Status } from 'src/app/interfaces/status'

export enum StatusOrdem {
    EM_ANALISE = 1,
    APROVADO = 2,
    FINALIZADO = 3
}

export const listaStatusOrdem = new Map<StatusOrdem, Status>([
    [StatusOrdem.EM_ANALISE, { label: 'Em analise', type: 'warning' }],
    [StatusOrdem.APROVADO, { label: 'Aprovado', type: 'success' }],
    [StatusOrdem.FINALIZADO, { label: 'Finalizado', type: 'Danger' }]
])