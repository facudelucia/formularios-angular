import { PaisSmall } from './../../interfaces/paises.interface';
import { PaisesService } from './../../services/paises.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { map, switchMap, tap } from 'rxjs/operators'
@Component({
  selector: 'app-selector-page',
  templateUrl: './selector-page.component.html',
  styles: [
  ]
})
export class SelectorPageComponent implements OnInit {
  miFormulario: FormGroup = this.fb.group({
    region: ['', Validators.required],
    pais: ['', Validators.required],
    frontera: ['', Validators.required]
  })
  regiones: string[] = []
  paises: PaisSmall[] = []
  fronteras: PaisSmall[] = []
  cargando: boolean = false
  constructor(private fb: FormBuilder, private paisesService: PaisesService) { }

  ngOnInit(): void {
    this.regiones = this.paisesService.regiones
    this.miFormulario.get('region')?.valueChanges
      .pipe(
        tap((_) => {
          this.miFormulario.get('pais')?.reset('')
          this.cargando = true
        }),
        switchMap(region => this.paisesService.getPaisesPorRegion(region)
        )
      )
      .subscribe((paises: any) => {
        this.cargando = false
        this.paises = paises
      })
    this.miFormulario.get('pais')?.valueChanges
      .pipe(
        tap(() => {
          this.miFormulario.get('frontera')?.reset('')
          this.cargando = true
        }),
        switchMap(codigo => this.paisesService.getPaisesPorCodigo(codigo)),
        switchMap((pais: any) => this.paisesService.getPaisesPorCodigos(pais?.borders!))

      ).subscribe((paises: any) => {
        this.fronteras = paises
        this.cargando = false
      })
  }
  guardar() {

  }
}
