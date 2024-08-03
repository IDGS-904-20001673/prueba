import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule,RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  name="";
  constructor(private route : Router){
    this.name = sessionStorage.getItem('name');

  }

  logout(){
    sessionStorage.removeItem('name');
    sessionStorage.removeItem('token');
    this.route.navigateByUrl("/login");
  }

}
