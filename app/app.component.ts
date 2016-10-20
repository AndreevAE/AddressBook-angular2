import { Component, OnInit } from '@angular/core';
import { Input, trigger, state, style, transition, animate } from '@angular/core';

import { Person } from './person';
import { PersonLocalStorageService } from './person-local-storage.service';

@Component({
    moduleId: module.id,
    selector: 'task-app',
    templateUrl: 'app.component.html',
    styleUrls: [ 'app.component.css' ],
    animations: [
        trigger('showform', [
            state('show', style({opacity: '1', height: '*'})),
            state('hide', style({opacity: '0', height: '0px'})),
            transition('show <=> hide', [
                animate(500)
            ])
        ]),
        trigger('hideform', [
            state('hide', style({opacity: '0', height: '0px'})),
            transition('hide => *', [
                animate(500)
            ])
        ])
    ]
})

export class AppComponent implements OnInit { 

    state: string = 'hide';
    personState: string = '';

    persons: Person[] = [];
    stringFilter: string = '';

    constructor(private personService: PersonLocalStorageService) {}

    togglestates() {
        this.state = (this.state === 'hide' ? 'show' : 'hide');
    }

    hidePerson() {
        this.personState = 'hide';
    }

    ngOnInit(): void {
        this.personService.initializeStorage();
        this.getPersons();
    }

    getPersons(): void {
        this.persons = this.personService.getPersons();
    }

    savePerson(name: string, email: string, phone: string, address: string) {
        name = name.trim();
        email = email.trim();
        phone = phone.trim();
        address = address.trim();
        
        var uniqueId = function() {
            return 'id-' + Math.random().toString(36).substr(2, 16);
        };

        let person: Person = {
            id: uniqueId(),
            name: name,
            email: email,
            phone: phone,
            address: address
        }
        this.persons.unshift(person);
        this.personService.saveList(this.persons);
        this.getPersons();
        this.togglestates();
    }

    deletePerson(person: Person) {
        if (confirm("Вы точно хотите удалить запись?")) {
            this.persons = this.persons.filter(p => p !== person);
            this.personService.saveList(this.persons);
            this.getPersons();
        }

    }

    updatePerson(person: Person) {
        this.persons.filter(p => {
            if (p.id === person.id) {
                p.name = person.name;
                p.email = person.email;
                p.phone = person.email;
                p.address = person.address;
            }
        });
        this.personService.saveList(this.persons);
    }
}
