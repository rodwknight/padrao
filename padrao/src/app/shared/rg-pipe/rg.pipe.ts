import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'rg'
})
export class RgPipe implements PipeTransform {

  transform(rg: string): string {
    let formatado = '';    
    if (rg) {
      const value = rg.toString().replace(/\D/g, '');
      if (value.length > 9) {
        formatado = value.replace(/(\d[0-9]{2})?(\d{3})?(\d{3})?(\d{0,1})/, '$1.$2.$3-$4');
      } else if (value.length > 5) {
        formatado = value.replace(/^(\d{2})?(\d{3})?(\d{0,3})/, '$1.$2.$3');
      } else if (value.length > 3) {
        formatado = value.replace(/^(\d[0-9]{2})?(\d{0,3})/, '$1.$2');
      } else 
        formatado = value
    }
    return formatado;
  }

}
