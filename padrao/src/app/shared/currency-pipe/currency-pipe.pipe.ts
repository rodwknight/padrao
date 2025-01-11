import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'valorPipe',
  standalone: true
})
export class ValorPipe implements PipeTransform {

  transform(currency: string): unknown {
    let formatado = '';

    if (currency) {
      const value = currency.toString().replace(/\D/g, '');

      if (value.length > 5) {
        formatado = value.replace(/^(\d{1})?(\d{3})?(\d{0,2})/, '$1.$2,$3');
      } else if (value.length > 4) {
        formatado = value.replace(/^(\d{3})?(\d{0,2})/, '$1,$2');
      } else if (value.length > 3) {
        formatado = value.replace(/^(\d{2})?(\d{0,2})/, '$1,$2');
      } else if (value.length > 2) {
        formatado = value.replace(/^(\d{1})?(\d{0,2})/, '$1,$2');
      } else {
        formatado = value
      }
    }
    return formatado;
  }

}
