import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cpf'
})
export class CpfPipe implements PipeTransform {

  transform(cpf: string): string {
    let formatado = '';

    if (cpf) {
      const value = cpf.toString().replace(/\D/g, '');

      if (value.length > 9) {
        formatado = value.replace(/(\d{3})?(\d{3})?(\d{3})?(\d{0,2})/, '$1.$2.$3-$4');
      } else if (value.length > 6) {
        formatado = value.replace(/^(\d{3})?(\d{3})?(\d{0,3})/, '$1.$2.$3');
      } else if (value.length > 3) {
        formatado = value.replace(/^(\d{3})?(\d{0,3})/, '$1.$2');
      } else {
        formatado = value
      }
    }
    return formatado;
  }

}
