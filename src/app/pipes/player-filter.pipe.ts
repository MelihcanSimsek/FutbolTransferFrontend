import { Pipe, PipeTransform } from '@angular/core';
import { Player } from '../models/entities/player';

@Pipe({
  name: 'playerFilter'
})
export class PlayerFilterPipe implements PipeTransform {

  transform(value: Player[],filterText:string): Player[] {
    filterText = filterText?filterText.toLocaleLowerCase():"";
    return filterText?value.filter((c:Player)=>c.name.toLocaleLowerCase().indexOf(filterText)!==-1):value;
  }

}
