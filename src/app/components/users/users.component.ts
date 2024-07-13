import { Component } from '@angular/core';
import { Observable, filter, map } from 'rxjs';
import { Store } from '@ngrx/store';
import { HttpClient } from '@angular/common/http';
import { usersSelector } from '../../state/selector/app.selector';
import { fetchUsersSuccess } from '../../state/action/app.action';
import { UserCardComponent } from './user-card/user-card.component';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { GetUsersResponse, User } from '../../model/backend/InternalSwagger';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [NgFor, UserCardComponent, CommonModule, NgIf],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent {
  users$: Observable<User[]> = this.store.select(usersSelector);
  url: string = "http://localhost:7066/api/";
  usersPath: string = "users";

  searchedUsers: User[] | undefined = undefined;

  constructor(private readonly store:Store, private http:HttpClient) {}

  ngOnInit(): void {
    this.users$.pipe(map(u => u.length > 0)).subscribe(data => {
      console.log(data);
      if(data === false) {
        this.http.get<GetUsersResponse>(this.url + this.usersPath)
        .subscribe(data => {
          this.store.dispatch(fetchUsersSuccess({users: data.userList}));
        });
      }
    });
  }

  search($event: any) {
    console.log("suchen nach nutzer " + $event.target.value);

    this.store.select(usersSelector)
      .subscribe(users => {
        this.searchedUsers = users.filter(user => this.lookup($event.target.value, user));
      });
  }

  reset() {
    this.searchedUsers = undefined;
    (<HTMLInputElement>document.getElementById("user-search-bar")).value = '';
  }

  lookup(searchTerm: string, user: User): boolean {
    let usernameMatch = user.username.toLowerCase().startsWith(searchTerm.toLowerCase());
    let firstNameMatch = user.firstName.toLowerCase().startsWith(searchTerm.toLowerCase());
    let lastNameMatch = user.lastName.toLowerCase().startsWith(searchTerm.toLowerCase());
    
    return usernameMatch || firstNameMatch || lastNameMatch;
  }
}
