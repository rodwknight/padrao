import { Status } from 'src/app/interfaces/status'

export enum StatuUnidade {
    EM_ANALISE = 1,
    APROVADO = 2,
    REJEITADO = 3
}

export const listaStatusUnidade = new Map<StatuUnidade, Status>([
    [StatuUnidade.EM_ANALISE, { label: 'Em analise', type: 'warning' }],
    [StatuUnidade.APROVADO, { label: 'Aprovado', type: 'success' }],
    [StatuUnidade.REJEITADO, {label: 'Rejeitado', type: 'Danger'}]
])