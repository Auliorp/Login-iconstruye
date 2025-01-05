import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar'
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import {LoginService} from './service/login.service'

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet, 
    CommonModule,
    ReactiveFormsModule,
    MatTooltipModule,
    MatSnackBarModule
  ],
  providers: [LoginService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'test-front-end-iconstruye';
  activeButton: string = 'user';
  userForm: FormGroup;
  emailForm: FormGroup;
  isLoading = false
  showModal: boolean = false;
  showSecondaryModal: boolean = false;

  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private snackBar: MatSnackBar
    ) {
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
    if (this.activeButton === 'user'){
      //TODO: A implementar
      this.isLoading = true;  
      setTimeout(() => {
        this.isLoading = false;
        this.userForm.reset();
      }, 1000);
    }else{
      this.handleSubmitEmailForm()
    }
  }

  private handleSubmitEmailForm(){
    
   if(!this.emailForm.valid) return;
  
    this.isLoading = true; 
    const credentials = `${this.emailForm.value.email}:${this.emailForm.value.password}`
    const encodedCredentials = btoa(credentials);

    this.loginService.loginWithEmail(encodedCredentials).subscribe({
      next: (response) => {
        this.isLoading = false;
        this.emailForm.reset();
        this.showSnackBar('Login exitoso', 'success');
      },
      error: (error) => {
        this.isLoading = false;
        if (error.status === 401 || error.status === 403) {
          this.showSecondaryModal = true;
        }
      },
    });
  }

  private showSnackBar(message: string, type: 'success' | 'error'): void {
    const panelClass = type === 'success' ? 'custom-snackbar-success' : 'custom-snackbar-error';

    this.snackBar.open(message, 'Cerrar', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: [panelClass]
    });
  }

  openModal(): void {
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
  }

  openSecondaryModal(): void {
    this.showSecondaryModal = true;
  }
  
  closeSecondaryModal(): void {
    this.showSecondaryModal = false;
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
