import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cep'
})
export class CepPipe implements PipeTransform {

  transform(cep: string): string {
    let formatado = '';

    if (cep) {
      const value = cep.toString().replace(/\D/g, '');

      if (value.length > 5) {
        formatado = value.replace(/^(\d{2})?(\d{3})?(\d{0,3})/, '$1.$2.$3');
      } else if (value.length > 2) {
        formatado = value.replace(/^(\d{2})?(\d{0,3})/, '$1.$2');
      } else {
        formatado = value
      }
    }
    return formatado;
  }

}
