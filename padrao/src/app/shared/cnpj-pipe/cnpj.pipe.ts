import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cnpj'
})
export class CnpjPipe implements PipeTransform {

  transform(cnpj: string): string {
    let formatado = '';

    if (cnpj) {
      const value = cnpj.toString().replace(/\D/g, '');

      if (value.length > 12) {
        formatado = value.replace(/(\d{2})?(\d{3})?(\d{3})?(\d{4})?(\d{0,2})/, '$1.$2.$3/$4-$5');
      } else if (value.length > 8) {
        formatado = value.replace(/(\d{2})?(\d{3})?(\d{3})?(\d{0,4})/, '$1.$2.$3/$4');

      } else if (value.length > 5) {
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
