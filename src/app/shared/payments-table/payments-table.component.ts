import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Payment } from '../../model/backend/InternalSwagger';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-payments-table',
  standalone: true,
  imports: [NgFor, NgIf, CommonModule],
  templateUrl: './payments-table.component.html',
  styleUrl: './payments-table.component.scss'
})
export class PaymentsTableComponent {
  @Input()
  payments: Payment[] | undefined;
}
