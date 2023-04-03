import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import {
  redirectUnauthorizedTo,
  redirectLoggedInTo,
  canActivate,
} from '@angular/fire/auth-guard';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['/authentication']);
const redirectLoggedInToHome = () => redirectLoggedInTo(['/dashboard']);


const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule),
    ...canActivate(redirectLoggedInToHome),

  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'authentication',
    loadChildren: () => import('./pages/authentication/authentication.module').then( m => m.AuthenticationPageModule),

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
    loadChildren: () => import('./pages/dashboard/dashboard.module').then( m => m.DashboardPageModule),
    ...canActivate(redirectUnauthorizedToLogin),

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
    path: 'experience',
    loadChildren: () => import('./pages/experience/experience.module').then( m => m.ExperiencePageModule)
  },
  {
    path: 'addexperience',
    loadChildren: () => import('./pages/addexperience/addexperience.module').then( m => m.AddexperiencePageModule)
  },
  {
    path: 'companyprofile',
    loadChildren: () => import('./pages/companyprofile/companyprofile.module').then( m => m.CompanyprofilePageModule)
  },
  {
    path: 'editcompanydetails',
    loadChildren: () => import('./pages/editcompanydetails/editcompanydetails.module').then( m => m.EditcompanydetailsPageModule)
  },
  {
    path: 'editaboutcompany',
    loadChildren: () => import('./pages/editaboutcompany/editaboutcompany.module').then( m => m.EditaboutcompanyPageModule)
  },
  {
    path: 'resumebuilder',
    loadChildren: () => import('./resumebuilder/resumebuilder.module').then( m => m.ResumebuilderPageModule)
  },
  {
    path: 'school',
    loadChildren: () => import('./pages/school/school.module').then( m => m.SchoolPageModule)
  },
  {
    path: 'addschool',
    loadChildren: () => import('./pages/addschool/addschool.module').then( m => m.AddschoolPageModule)
  },
  {
    path: 'aboutcompany',
    loadChildren: () => import('./aboutcompany/aboutcompany.module').then( m => m.AboutcompanyPageModule)
  },
  {
    path: 'editaboutme',
    loadChildren: () => import('./pages/editaboutme/editaboutme.module').then( m => m.EditaboutmePageModule)
  },
  {
    path: 'certifications',
    loadChildren: () => import('./pages/certifications/certifications.module').then( m => m.CertificationsPageModule)
  },
  {
    path: 'addcertification',
    loadChildren: () => import('./pages/addcertification/addcertification.module').then( m => m.AddcertificationPageModule)
  },  {
    path: 'editcertifications',
    loadChildren: () => import('./pages/editcertifications/editcertifications.module').then( m => m.EditcertificationsPageModule)
  },
  {
    path: 'editemployerprofile',
    loadChildren: () => import('./pages/editemployerprofile/editemployerprofile.module').then( m => m.EditemployerprofilePageModule)
  },


  



];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
