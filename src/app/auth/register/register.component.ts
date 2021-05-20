import { EmailValidatorService } from './../../shared/validator/email-validator.service';
import { FormBuilder, FormGroup, Validators, FormControl, AbstractControl, ValidationErrors } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [
  ]
})
export class RegisterComponent implements OnInit {
  nombreApellidoPattern: string = "([a-zA-Z]+) ([a-zA-Z]+)"
  emailPattern: string = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";
  get emailStrError(): string {
    const errors = this.miFormulario.get('email')?.errors
    if (errors?.required) {
      return 'Email es obligatorio'
    } else if (errors?.pattern) {
      return 'Ingrese un email valido'
    } else if (errors?.emailTomado) {
      return 'Email ya existe'
    }
    return ''
  }
  userNoValido(arg: FormControl) {
    if (arg.value?.trim().toLowerCase() === 'strider') {
      return {
        noStrider: true
      }
    }
    return null
  }
  camposIguales(campo1: string, campo2: string) {
    return (control: AbstractControl): ValidationErrors | null => {
      const pass1 = control.get(campo1)?.value
      const pass2 = control.get(campo2)?.value
      if (pass1 !== pass2) {
        control.get(campo2)?.setErrors({ noIguales: true })
        return { noIguales: true }
      }
      control.get(campo2)?.setErrors(null)
      return null
    }
  }
  miFormulario: FormGroup = this.fb.group({
    nombre: ['', [Validators.required, Validators.pattern(this.nombreApellidoPattern)]],
    email: ['', [Validators.required, Validators.pattern(this.emailPattern)], [this.emailValidator]],
    username: ['', [Validators.required, this.userNoValido]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    confirmar: ['', [Validators.required]],
  }, {
    validators: [this.camposIguales('password', 'confirmar')]
  })
  constructor(private fb: FormBuilder, private emailValidator: EmailValidatorService) { }

  ngOnInit(): void {
  }
  campoNoValido(campo: string) {
    return this.miFormulario.get(campo)?.invalid && this.miFormulario.get(campo)?.touched
  }
  crear() {
    console.log(this.miFormulario.value)
    this.miFormulario.markAllAsTouched()
  }
}
