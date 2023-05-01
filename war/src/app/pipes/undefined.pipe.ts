import { Pipe, PipeTransform } from '@angular/core';
import { Region } from '../interface/Region';

@Pipe({
  name: 'undefined'
})
export class UndefinedPipe implements PipeTransform {

  transform(value: (any | undefined), replaceText : any = 'N/A' ): any {
    return value === undefined ? replaceText : value;
  }

}
