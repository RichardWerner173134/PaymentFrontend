import { Component } from '@angular/core';
import { Observable, filter, map } from 'rxjs';
import { Store } from '@ngrx/store';
import { HttpClient } from '@angular/common/http';
import { usersSelector } from '../../state/selector/app.selector';
import { fetchUsersSuccess } from '../../state/action/app.action';
import { UserCardComponent } from './user-card/user-card.component';
import { CommonModule, NgFor } from '@angular/common';
import { GetUsersResponse, User } from '../../model/backend/InternalSwagger';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [NgFor, UserCardComponent, CommonModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent {
  users$: Observable<User[]> = this.store.select(usersSelector);

  constructor(private readonly store:Store, private http:HttpClient) {}

  ngOnInit(): void {
    this.http
      .get<GetUsersResponse>("http://localhost:7066/api/users")
      .subscribe(data => {
        this.store.dispatch(fetchUsersSuccess({ users: data.userList }));
      });
  }

  search($event: any) {
    console.log("suchen nach nutzer " + $event.target.value);
    
  }
}
