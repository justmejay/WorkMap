import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import {
  redirectUnauthorizedTo,
  redirectLoggedInTo,
  canActivate,
} from '@angular/fire/auth-guard';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['/authentication']);
const redirectLoggedInToHome = () => redirectLoggedInTo(['/checkrole']);


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
    loadChildren: () => import('./companysidepages/companyprofile/companyprofile.module').then( m => m.CompanyprofilePageModule)
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
    loadChildren: () => import('./pages/aboutcompany/aboutcompany.module').then( m => m.AboutcompanyPageModule)
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
  },
  {
    path: 'editcertifications',
    loadChildren: () => import('./pages/editcertifications/editcertifications.module').then( m => m.EditcertificationsPageModule)
  },
  {
    path: 'editemployerprofile',
    loadChildren: () => import('./pages/editemployerprofile/editemployerprofile.module').then( m => m.EditemployerprofilePageModule)
  },
  {
    path: 'editchar',
    loadChildren: () => import('./pages/editchar/editchar.module').then( m => m.EditcharPageModule)
  },
  {
    path: 'editresume',
    loadChildren: () => import('./pages/editresume/editresume.module').then( m => m.EditresumePageModule)
  },
  {
    path: 'dashboardcompany',
    loadChildren: () => import('./companysidepages/dashboardcompany/dashboardcompany.module').then( m => m.DashboardcompanyPageModule)
  },
  {
    path: 'messagespage',
    loadChildren: () => import('./messagespage/messagespage.module').then( m => m.MessagespagePageModule)
  },
  {
    path: 'messagecreate',
    loadChildren: () => import('./messagecreate/messagecreate.module').then( m => m.MessagecreatePageModule)
  },
  {
    path: 'messageview',
    loadChildren: () => import('./messageview/messageview.module').then( m => m.MessageviewPageModule)
  },
  {
    path: 'notifications',
    loadChildren: () => import('./pages/notifications/notifications.module').then( m => m.NotificationsPageModule)
  },
  {
    path: 'viewnotification',
    loadChildren: () => import('./pages/viewnotification/viewnotification.module').then( m => m.ViewnotificationPageModule)
  },
  {
    path: 'searchengine',
    loadChildren: () => import('./searchengine/searchengine.module').then( m => m.SearchenginePageModule)
  },
  {
    path: 'employees',
    loadChildren: () => import('./companysidepages/employees/employees.module').then( m => m.EmployeesPageModule)
  },
  {
    path: 'viewemployee',
    loadChildren: () => import('./pages/viewemployee/viewemployee.module').then( m => m.ViewemployeePageModule)
  },
  {
    path: 'rateemployee',
    loadChildren: () => import('./companysidepages/rateemployee/rateemployee.module').then( m => m.RateemployeePageModule)
  },
  {
    path: 'addjoblisting',
    loadChildren: () => import('./companysidepages/addjoblisting/addjoblisting.module').then( m => m.AddjoblistingPageModule)
  },
  {
    path: 'applytojob',
    loadChildren: () => import('./pages/applytojob/applytojob.module').then( m => m.ApplytojobPageModule)
  },
  {
    path: 'subscriptions',
    loadChildren: () => import('./paymentpages/subscriptions/subscriptions.module').then( m => m.SubscriptionsPageModule)
  },
  {
    path: 'checkrole',
    loadChildren: () => import('./checkrole/checkrole.module').then( m => m.CheckrolePageModule)
  },  {
    path: 'hometab',
    loadChildren: () => import('./pages/hometab/hometab.module').then( m => m.HometabPageModule)
  },
  {
    path: 'addpost',
    loadChildren: () => import('./pages/addpost/addpost.module').then( m => m.AddpostPageModule)
  },
  {
    path: 'privacypolicy',
    loadChildren: () => import('./pages/privacypolicy/privacypolicy.module').then( m => m.PrivacypolicyPageModule)
  },
  {
    path: 'editjoblisting',
    loadChildren: () => import('./companysidepages/editjoblisting/editjoblisting.module').then( m => m.EditjoblistingPageModule)
  },







  



];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
