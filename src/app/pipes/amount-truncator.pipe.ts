import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'trunc',
  
})
export class AmountTruncatorPipe implements PipeTransform {

  transform(value: number, ...args: unknown[]): unknown {
    return `${Math.round(value * 100) / 100}`;
  }

}
