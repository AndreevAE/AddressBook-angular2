import { Injectable } from '@angular/core';

import { Person } from './person';

@Injectable()
export class PersonLocalStorageService {
    
    private personLocalStorageKey: string = "personLocalStorageKey";

    initializeStorage() {
        var serialObj = JSON.stringify(new Array<Person>());
        localStorage.setItem(this.personLocalStorageKey, serialObj);
    }

    getPersons(): Person[] {
        var returnObj: Person[] = JSON.parse(localStorage.getItem(this.personLocalStorageKey));
        return returnObj;
    }

    saveList(persons: Person[]) {
        var serialObj = JSON.stringify(persons);
        try {
            localStorage.setItem(this.personLocalStorageKey, serialObj);
        } catch (error) {
            if (error.name == 'QUOTA_EXCEEDED_ERR') {
                alert('Превышен лимит');
            } else {
                alert('Что-то пошло не так. Попробуйте позже');
            }
        }
    }
}
