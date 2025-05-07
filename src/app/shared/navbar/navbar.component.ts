import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PaymentContextComponent } from '../../components/payment-context/payment-context.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, PaymentContextComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  selectedLi: HTMLElement | null = null;

  protected changeSelected($event: any) {
    const target = $event.target as HTMLElement;
    const li = target.closest('li');

    if (!li || !li.parentElement?.classList.contains('navbar')) return;

    // Vorheriges aktives <li> deaktivieren
    if (this.selectedLi) {
      this.selectedLi.classList.remove('active');
    }

    // Neues <li> aktivieren
    this.selectedLi = li;
    this.selectedLi.classList.add('active');
  }
}
