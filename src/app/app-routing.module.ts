import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// components
import { HomeComponent } from './components/home/home.component';
import { UserCreateComponent } from './components/users/user-create/user-create.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'createUser', component: UserCreateComponent },

  { path: '', redirectTo: '/', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
