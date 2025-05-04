import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { UserCardComponent } from './user-card/user-card.component';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { User } from '../../model/backend/InternalSwagger';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [NgFor, UserCardComponent, CommonModule, NgIf],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent {
  users$: Observable<User[]> = this.userService.getCachedUsers();

  searchedUsers: User[] | undefined = undefined;

  constructor(
    private userService: UserService
  ) {}

  ngOnInit(): void {}

  search($event: any) {
    this.users$.subscribe(users => {
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
