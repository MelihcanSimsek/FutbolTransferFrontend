import { Pipe, PipeTransform } from '@angular/core';
import { Club } from '../models/entities/club';

@Pipe({
  name: 'clubFilter'
})
export class ClubFilterPipe implements PipeTransform {

  transform(value: Club[], filterText:string): Club[] {
    filterText = filterText?filterText.toLocaleLowerCase():"";
    return filterText?value.filter((c:Club)=>c.team.toLocaleLowerCase().indexOf(filterText)!==-1):value;
  }

}
