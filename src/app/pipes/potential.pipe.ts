import { Pipe, PipeTransform } from '@angular/core';
import { TransferPostDto } from '../models/dtos/transferPostDto';

@Pipe({
  name: 'potential'
})
export class PotentialPipe implements PipeTransform {

  transform(value: TransferPostDto[], ...args: unknown[]): TransferPostDto[] {
    const sortedData = value.sort((a,b)=> b.transferRate - a.transferRate );
    return sortedData;
  }

}
