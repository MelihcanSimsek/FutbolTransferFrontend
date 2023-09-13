import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'postContent'
})
export class PostContentPipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): string {
    let myTxt
      if(value.length > 50)
      {
         let spaceIndex = value.indexOf(" ",50);
         myTxt = value.substr(0,spaceIndex) + "\n" + value.substr(spaceIndex+1);
      }
      return myTxt
  }

}
