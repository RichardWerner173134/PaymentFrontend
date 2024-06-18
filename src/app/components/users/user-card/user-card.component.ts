import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-user-card',
  standalone: true,
  imports: [],
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.css'
})
export class UserCardComponent {
  @Input()
  firstName!: string;

  @Input()
  lastName!: string;

  @Input()
  id!: number;

  @Input()
  email!: string;
}
