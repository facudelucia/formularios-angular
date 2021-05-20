import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dinamicos',
  templateUrl: './dinamicos.component.html',
  styles: [
  ]
})
export class DinamicosComponent implements OnInit {
  miFormulario: FormGroup = this.fb.group({
    nombre: [, [Validators.required, Validators.minLength(3)]],
    favoritos: this.fb.array([
      ['CS'],
      ['GTA']
    ], Validators.required)
  })
  nuevoFavorito: FormControl = this.fb.control('', Validators.required)
  get favoritosArr() {
    return this.miFormulario.get('favoritos') as FormArray
  }
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
  }
  agregarFavorito() {
    if (this.nuevoFavorito.invalid) return
    this.favoritosArr.push(new FormControl(this.nuevoFavorito.value, Validators.required))
    this.nuevoFavorito.reset()
  }
  borrar(idx: number) {
    console.log(idx)
    this.favoritosArr.removeAt(idx)
  }
  campoEsValido(campo: string) {
    return this.miFormulario.controls[campo].errors && this.miFormulario.controls[campo].touched
  }
  guardar() {
    if (this.miFormulario.invalid) {
      this.miFormulario.markAllAsTouched()
      return
    }
    this.miFormulario.reset()
  }
}
