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
    loadChildren: () => import('./companysidepages/notifications/notifications.module').then( m => m.NotificationsPageModule)
  },
  {
    path: 'viewnotification',
    loadChildren: () => import('./companysidepages/viewnotification/viewnotification.module').then( m => m.ViewnotificationPageModule)
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
    loadChildren: () => import('./companysidepages/viewemployee/viewemployee.module').then( m => m.ViewemployeePageModule)
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
  },
  {
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
    path: 'notificationuser',
    loadChildren: () => import('./pages/notificationuser/notificationuser.module').then( m => m.NotificationuserPageModule)
  },
  {
    path: 'messagescompany',
    loadChildren: () => import('./companysidepages/messagescompany/messagescompany.module').then( m => m.MessagescompanyPageModule)
  },
  {
    path: 'messageviewcompany',
    loadChildren: () => import('./companysidepages/messageviewcompany/messageviewcompany.module').then( m => m.MessageviewcompanyPageModule)
  },
  {
    path: 'messagecreatecompany',
    loadChildren: () => import('./companysidepages/messagecreatecompany/messagecreatecompany.module').then( m => m.MessagecreatecompanyPageModule)
  },
  {
    path: 'hometabcompany',
    loadChildren: () => import('./companysidepages/hometabcompany/hometabcompany.module').then( m => m.HometabcompanyPageModule)
  },
  {
    path: 'addpostcompany',
    loadChildren: () => import('./companysidepages/addpostcompany/addpostcompany.module').then( m => m.AddpostcompanyPageModule)
  },
  {
    path: 'moresignupspecialization',
    loadChildren: () => import('./pages/moresignupspecialization/moresignupspecialization.module').then( m => m.MoresignupspecializationPageModule)
  },
  {
    path: 'moresignupaddress',
    loadChildren: () => import('./pages/moresignupaddress/moresignupaddress.module').then( m => m.MoresignupaddressPageModule)
  },
  {
    path: 'applicantlist',
    loadChildren: () => import('./companysidepages/applicantlist/applicantlist.module').then( m => m.ApplicantlistPageModule)
  },
  {
    path: 'editpreferredoption',
    loadChildren: () => import('./pages/editpreferredoption/editpreferredoption.module').then( m => m.EditpreferredoptionPageModule)
  },
  {
    path: 'editjoblist',
    loadChildren: () => import('./companysidepages/editjoblist/editjoblist.module').then( m => m.EditjoblistPageModule)
  },
  {
    path: 'mypostuser',
    loadChildren: () => import('./pages/mypostuser/mypostuser.module').then( m => m.MypostuserPageModule)
  },
  {
    path: 'mypostcompany',
    loadChildren: () => import('./companysidepages/mypostcompany/mypostcompany.module').then( m => m.MypostcompanyPageModule)
  },
  {
    path: 'editpostuser',
    loadChildren: () => import('./pages/editpostuser/editpostuser.module').then( m => m.EditpostuserPageModule)
  },
  {
    path: 'editpostcompany',
    loadChildren: () => import('./companysidepages/editpostcompany/editpostcompany.module').then( m => m.EditpostcompanyPageModule)
  },
  {
    path: 'viewapplicants',
    loadChildren: () => import('./companysidepages/viewapplicants/viewapplicants.module').then( m => m.ViewapplicantsPageModule)
  },
  {
    path: 'aboutus',
    loadChildren: () => import('./pages/aboutus/aboutus.module').then( m => m.AboutusPageModule)
  },
  {
    path: 'aboutusc',
    loadChildren: () => import('./companysidepages/aboutusc/aboutusc.module').then( m => m.AboutuscPageModule)
  },
  {
    path: 'privacypolicycompany',
    loadChildren: () => import('./companysidepages/privacypolicycompany/privacypolicycompany.module').then( m => m.PrivacypolicycompanyPageModule)
  },
  {
    path: 'dashboardadmin',
    loadChildren: () => import('./adminpages/dashboardadmin/dashboardadmin.module').then( m => m.DashboardadminPageModule)
  },
  {
    path: 'listemployees',
    loadChildren: () => import('./adminpages/listemployees/listemployees.module').then( m => m.ListemployeesPageModule)
  },
  {
    path: 'companyregister',
    loadChildren: () => import('./adminpages/companyregister/companyregister.module').then( m => m.CompanyregisterPageModule)
  },
  {
    path: 'companyreview',
    loadChildren: () => import('./adminpages/companyreview/companyreview.module').then( m => m.CompanyreviewPageModule)
  },
  {
    path: 'viewuserproile',
    loadChildren: () => import('./adminpages/viewuserproile/viewuserproile.module').then( m => m.ViewuserproilePageModule)
  },
  {
    path: 'viewemployerprofile',
    loadChildren: () => import('./adminpages/viewemployerprofile/viewemployerprofile.module').then( m => m.ViewemployerprofilePageModule)
  },
  {
    path: 'workorderlist',
    loadChildren: () => import('./companysidepages/workorderlist/workorderlist.module').then( m => m.WorkorderlistPageModule)
  },
  {
    path: 'workorderemployees',
    loadChildren: () => import('./companysidepages/workorderemployees/workorderemployees.module').then( m => m.WorkorderemployeesPageModule)
  },
  {
    path: 'workorderview',
    loadChildren: () => import('./companysidepages/workorderview/workorderview.module').then( m => m.WorkorderviewPageModule)
  },
  {
    path: 'addworkorder',
    loadChildren: () => import('./companysidepages/addworkorder/addworkorder.module').then( m => m.AddworkorderPageModule)
  },
  {
    path: 'editworkorder',
    loadChildren: () => import('./companysidepages/editworkorder/editworkorder.module').then( m => m.EditworkorderPageModule)
  },  {
    path: 'employeeworkorder',
    loadChildren: () => import('./pages/employeeworkorder/employeeworkorder.module').then( m => m.EmployeeworkorderPageModule)
  },
  {
    path: 'workorderviewall',
    loadChildren: () => import('./companysidepages/workorderviewall/workorderviewall.module').then( m => m.WorkorderviewallPageModule)
  },
  {
    path: 'editworkordersingle',
    loadChildren: () => import('./companysidepages/editworkordersingle/editworkordersingle.module').then( m => m.EditworkordersinglePageModule)
  },
  {
    path: 'sepublic',
    loadChildren: () => import('./pages/sepublic/sepublic.module').then( m => m.SepublicPageModule)
  },
  {
    path: 'rateemployeeedit',
    loadChildren: () => import('./pages/rateemployeeedit/rateemployeeedit.module').then( m => m.RateemployeeeditPageModule)
  },
  {
    path: 'myapplications',
    loadChildren: () => import('./pages/myapplications/myapplications.module').then( m => m.MyapplicationsPageModule)
  },
  {
    path: 'archived',
    loadChildren: () => import('./adminpages/archived/archived.module').then( m => m.ArchivedPageModule)
  },



  









  



];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
