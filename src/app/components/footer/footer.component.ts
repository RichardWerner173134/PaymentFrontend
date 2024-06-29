import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [NgIf],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent implements OnInit{
  show: boolean = true;

  ngOnInit(): void {
    setTimeout(() => this.show = false, 3000);
  }
}
