import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ip'
})
export class IpPipe implements PipeTransform {

  transform(ip: string): string {
    let formatado = '';    
    if (ip) {
      const value = ip.toString().replace(/\D/g, '');
      if (value.length > 7) {
        formatado = value.replace(/(\d{3})?(\d{3})?(\d{0,3})?(\d{1})/, '$1.$2.$3.$4');
      } else if (value.length > 6) {
        formatado = value.replace(/(\d{3})?(\d{0,3})?(\d{1})?(\d{1})/, '$1.$2.$3.$4');
      } else if (value.length > 5) {
        formatado = value.replace(/^(\d{3})?(\d{1})?(\d{1})?(\d{0,1})/, '$1.$2.$3.$4');
      } else if (value.length > 4) {
        formatado = value.replace(/^(\d{3})?(\d{1})?(\d{0,1})/, '$1.$2.$3');
      } else if (value.length > 3) {
        formatado = value.replace(/^(\d{3})?(\d{0,1})/, '$1.$2');
      } else 
        formatado = value
    }
    return formatado;
  }

}
