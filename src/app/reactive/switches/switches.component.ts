import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-switches',
  templateUrl: './switches.component.html',
  styles: [
  ]
})
export class SwitchesComponent implements OnInit {

  miFormulario: FormGroup = this.fb.group({
    genero: ['M', Validators.required],
    notificaciones: [true, Validators.required],
    condiciones: [false, Validators.requiredTrue]
  })

  persona = {
    genero: 'F',
    notifiaciones: true
  }
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.miFormulario.reset({ ...this.persona, condiciones: true })
  }
  guardar() {
    console.log(this.miFormulario.value)
  }

}
