import { NgForm } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';

interface Persona {
  nombre: string,
  favoritos: Favorito[]
}
interface Favorito {
  id: number,
  nombre: string
}


@Component({
  selector: 'app-dinamicos',
  templateUrl: './dinamicos.component.html',
  styles: [
  ]
})
export class DinamicosComponent implements OnInit {
  @ViewChild('miFormulario') miFormulario!: NgForm
  nuevoJuego: string = ""
  constructor() { }

  ngOnInit(): void {
  }
  persona: Persona = {
    nombre: 'Facundo',
    favoritos: [
      { id: 1, nombre: 'GTA' },
      { id: 2, nombre: 'CS' }
    ]
  }
  nombreValido(): boolean {
    return this.miFormulario?.controls.nombre?.invalid && this.miFormulario?.controls.nombre?.touched
  }
  eliminar(i: number) {
    this.persona.favoritos.splice(i, 1)
  }
  guardar() {
    console.log(this.miFormulario.value)
  }
  agregarJuego() {
    const nuevoJuego: Favorito = {
      id: this.persona.favoritos.length + 1,
      nombre: this.nuevoJuego
    }
    this.persona.favoritos.push({ ...nuevoJuego })
  }
}
