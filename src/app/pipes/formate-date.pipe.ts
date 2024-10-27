import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formateDate'
})
export class FormateDatePipe implements PipeTransform {
  transform(timestamp: any): string {
    if (!timestamp || !timestamp.seconds) {
      return '';
    }

    const milliseconds = timestamp.seconds * 1000 + Math.round(timestamp.nanoseconds / 1e6);
    const date = new Date(milliseconds);
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const month = monthNames[date.getMonth()];
    const day = date.getDate();
    const year = date.getFullYear();
    return `${month} ${day < 10 ? '0' + day : day}, ${year}`;
  }

}
