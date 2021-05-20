import { SwitchesComponent } from './switches/switches.component';
import { DinamicosComponent } from './dinamicos/dinamicos.component';
import { BasicosComponent } from './basicos/basicos.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    children : [
      {path: 'basicos', component: BasicosComponent},
      {path: 'dinamicos', component: DinamicosComponent},
      {path: 'switches', component: SwitchesComponent},
      {path: '**', redirectTo: 'basicos'}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReactiveRoutingModule { }
