import { Component, OnInit } from '@angular/core';

interface MenuItem {
  texto: string,
  ruta: string
}

@Component({
  selector: 'app-sidemenu',
  templateUrl: './sidemenu.component.html',
  styles: [
  ]
})
export class SidemenuComponent implements OnInit {
  templateMenu: MenuItem[] = [
    { texto: 'Basicos', ruta: '/template/basicos' },
    { texto: 'Dinamicos', ruta: '/template/dinamicos' },
    { texto: 'Switches', ruta: '/template/switches' },
  ]
  reactiveMenu: MenuItem[] = [
    { texto: 'Basicos', ruta: '/reactive/basicos' },
    { texto: 'Dinamicos', ruta: '/reactive/dinamicos' },
    { texto: 'Switches', ruta: '/reactive/switches' },
  ]
  authMenu: MenuItem[] = [
    { texto: 'Login', ruta: '/auth/login' },
    { texto: 'Register', ruta: '/auth/register' }
  ]
  constructor() { }

  ngOnInit(): void {
  }

}
