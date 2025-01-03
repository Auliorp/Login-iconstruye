import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet, 
    CommonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'test-front-end-iconstruye';
  activeButton: string = 'user';
  userForm: FormGroup;
  emailForm: FormGroup;
  isLoading = false

  constructor(private fb: FormBuilder) {
    this.userForm = this.fb.group({
      username: ['', Validators.required],
      company: ['', Validators.required],
      password: ['', Validators.required],
    });

    this.emailForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  toggleButton(button: string): void {
    this.activeButton = button;
  }

  isActive(button: string): boolean {
    return this.activeButton === button;
  }

  onSubmit(): void {
    if ((this.activeButton === 'user' && this.userForm.valid) || 
        (this.activeButton === 'email' && this.emailForm.valid)) {
      
      this.isLoading = true;  
      setTimeout(() => {
        console.log('Formulario enviado:', this.activeButton === 'user' ? this.userForm.value : this.emailForm.value);
        
        this.isLoading = false;
      }, 1000);
    }
  }
  get isSubmitDisabled(): boolean {
    if (this.isLoading) return true;
    if (this.activeButton === 'user') {
      return !this.userForm.valid;
    } else if (this.activeButton === 'email') {
      return !this.emailForm.valid;
    }
    return true;
  }
}
