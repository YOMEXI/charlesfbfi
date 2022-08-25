import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/views/login/login.component';
import { AppComponent } from './app.component';
import { MainComponent } from './components/main/main.component';
import { RegisterComponent } from './auth/views/register/register.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    // children: [
    //  {path: 'register', component: RegisterComponent},
    //    {path: 'login', component: LoginComponent},
    //],  Training@123 NiG_eria123@
  },
  { path: 'register', component: RegisterComponent },
  { path: 'dashboard', component: DashboardComponent },

  {
    path: 'login',
    component: LoginComponent,
    children: [{ path: 'register', component: RegisterComponent }],
  },

  //{path: 'app', component: AppComponent},
  //{path: 'landing', component: LandingPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
