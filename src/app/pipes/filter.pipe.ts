import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(allstudents: any[], searchTerm: string, propertyName: string): any[] {
    if (!allstudents || searchTerm === '' || propertyName === '') {
      return allstudents;
    }

    return allstudents.filter((student: any) => {
      const propertyValue = student[propertyName].trim().toLowerCase();
      return propertyValue.includes(searchTerm.trim().toLowerCase());
    });
  }

}
