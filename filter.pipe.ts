import { Pipe, PipeTransform } from '@angular/core';

import { Person } from './person';

@Pipe({
    name: 'filterBy'
})

export class FilterByPipe implements PipeTransform {
    transform(value: Person[], filterBy: string): Person[] {
        if (value) {
            return value.filter(person => {
                let lowercaseName: string = person.name.toLowerCase();
                let lowercaseEmail: string = person.email.toLowerCase();
                let lowercaseAddress: string = person.address.toLowerCase();
                let lowercaseFilterBy: string = filterBy.toLowerCase();
                return lowercaseName.includes(lowercaseFilterBy)
                    || lowercaseEmail.includes(lowercaseFilterBy)
                    || lowercaseAddress.includes(lowercaseFilterBy)
                    || person.phone.includes(lowercaseFilterBy);
            });
        } else {
            return null;
        }
    }
}