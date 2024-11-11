import { TipoMatricula as TipoMatriculaInterface } from 'src/app/interfaces/tipo-matricula'

export enum TipoMatricula {
    CNPJ = 1,
    CPF = 2
}

export const listaTipoMatricula = new Map<TipoMatricula, TipoMatriculaInterface>([
    [TipoMatricula.CNPJ, { id: 1, name: 'CNPJ (Pessoa jurídica)', mask: '', label: 'CNPJ' }],
    [TipoMatricula.CPF, { id: 2, name: 'CPF (Pessoa fisica)', mask: '', label: 'CPF' }]
])