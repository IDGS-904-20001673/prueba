import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { GeneralResponse } from '../../interfaces/general-response';
import { register, user } from '../../interfaces/auth';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  response: GeneralResponse<user> = null;

  constructor(private service: AuthService, private route : Router) {

  }

  formUser = new FormGroup({
    name: new FormControl(),
    lastName: new FormControl(),
    userName: new FormControl(),
    email: new FormControl(),
    password: new FormControl()
  })

  async submitData() {
    if(this.formUser.value.name == null || this.formUser.value.lastName == null || this.formUser.value.userName == null || this.formUser.value.email == null || this.formUser.value.password == null){
      alert("Llena todos los campos");
      return;
      }
    const body = this.formUser.value as register;   
    this.response = await this.service.register(body);
    if (this.response.success) {
      sessionStorage.setItem('success', 'Creaste tu cuenta correctamente');
      this.route.navigateByUrl("/login");
    }
  }


}
