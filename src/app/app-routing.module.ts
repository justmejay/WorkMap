import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'authentication',
    loadChildren: () => import('./pages/authentication/authentication.module').then( m => m.AuthenticationPageModule)
  },
  {
    path: 'forgot',
    loadChildren: () => import('./pages/forgot/forgot.module').then( m => m.ForgotPageModule)
  },
  {
    path: 'resetpage',
    loadChildren: () => import('./pages/resetpage/resetpage.module').then( m => m.ResetpagePageModule)
  },
  {
    path: 'forgotconfirm',
    loadChildren: () => import('./pages/forgotconfirm/forgotconfirm.module').then( m => m.ForgotconfirmPageModule)
  },
  {
    path: 'moresignup',
    loadChildren: () => import('./pages/moresignup/moresignup.module').then( m => m.MoresignupPageModule)
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./pages/dashboard/dashboard.module').then( m => m.DashboardPageModule)
  },
  {
    path: 'moresignupc',
    loadChildren: () => import('./pages/moresignupc/moresignupc.module').then( m => m.MoresignupcPageModule)
  },
  {
    path: 'editexperience',
    loadChildren: () => import('./pages/editexperience/editexperience.module').then( m => m.EditexperiencePageModule)
  },
  {
    path: 'editaddress',
    loadChildren: () => import('./pages/editaddress/editaddress.module').then( m => m.EditaddressPageModule)
  },
  {
    path: 'editschool',
    loadChildren: () => import('./pages/editschool/editschool.module').then( m => m.EditschoolPageModule)
  },
  {
    path: 'editpersonalinfo',
    loadChildren: () => import('./pages/editpersonalinfo/editpersonalinfo.module').then( m => m.EditpersonalinfoPageModule)
  },
  {
    path: 'applicantprofile',
    loadChildren: () => import('./pages/applicantprofile/applicantprofile.module').then( m => m.ApplicantprofilePageModule)
  },
  {
    path: 'editcompanydetails',
    loadChildren: () => import('./pages/editcompanydetails/editcompanydetails.module').then( m => m.EditcompanydetailsPageModule)
  },
  {
    path: 'editaboutcompany',
    loadChildren: () => import('./pages/editaboutcompany/editaboutcompany.module').then( m => m.EditaboutcompanyPageModule)
  },




];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
