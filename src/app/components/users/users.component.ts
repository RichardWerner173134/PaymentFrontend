import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../model/internal/User';
import { Store } from '@ngrx/store';
import { HttpClient } from '@angular/common/http';
import { usersSelector } from '../../state/selector/app.selector';
import { GetUsersResponse } from '../../model/backend/GetUsersResponse';
import { fetchUsersSuccess } from '../../state/action/app.action';
import { UserCardComponent } from './user-card/user-card.component';
import { CommonModule, NgFor } from '@angular/common';

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

  search() {
    throw new Error("Not implemented yet");
  }
}
