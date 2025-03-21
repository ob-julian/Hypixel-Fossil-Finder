import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { FossilListComponent } from './fossils/components/fossil-list/fossil-list.component';
import { SolverViewComponent } from './solver/components/solver-view/solver-view.component';

export const routes: Routes = [
    { path: 'fossils', component: FossilListComponent },
    { path: 'solver', component: SolverViewComponent },
    { path: '**', redirectTo: '/solver' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }