import { Component, OnInit,ViewChild } from '@angular/core';
import { ActivatedRoute, Router, RouterEvent } from '@angular/router';
import { CompanyService } from 'src/app/services/company.service';
import { ProfilingService } from 'src/app/services/profiling.service';
import { first } from 'rxjs';
import { AlertController, LoadingController, ModalController, ToastController } from '@ionic/angular';


@Component({
  selector: 'app-messageviewcompany',
  templateUrl: './messageviewcompany.page.html',
  styleUrls: ['./messageviewcompany.page.scss'],
})
export class MessageviewcompanyPage implements OnInit {

  companydata: any = [];
  companydata2: any = [];
  companydata3: any = [];
  message: any = "";
  inboxid: any = [];
  messages: any = [];
  @ViewChild('trigger') closeBtn2: ModalController;



  constructor(
    private ac: ActivatedRoute,
    private company: CompanyService,
    private profile: ProfilingService,
    private alertController: AlertController,
    private toastController: ToastController,
    private loadingController: LoadingController,
    private router: Router

  ) { 

    this.ac.queryParams.subscribe((params)=>{
      this.companydata = params;
      console.log(this.companydata);


      this.company.getprofilebyid(this.companydata.id).pipe(first()).subscribe(res=>{
        this.companydata2 = res;
        console.log(this.companydata2);
       
      });

      this.company.getcompany().pipe(first()).subscribe(res=>{
        this.companydata3 = res;
        console.log(this.companydata2);
       
      });


       this.company.getinboxidc(this.companydata.id).subscribe(res=>{
      this.inboxid = res;
      console.log(this.inboxid)

      if (res.length == 1){
        this.company.getmessages(this.inboxid[0].userget).subscribe(res=>{
          this.messages = res;
  
          this.messages.sort((n1,n2) => n1.timeStamp - n2.timeStamp);
        });

      }
    });
    });

  }

  ngOnInit() {
  }
  send(){

    this.company.sendmessagecompany(this.message, this.companydata.id, this.companydata3.cname, this.companydata3.imageurl);
    this.message = "";

  }

  async delete(){
    const infoAlert = await this.alertController.create({
      header: 'Delete Conversation',
      message: 'All messages will be permanently deleted!!!',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        }, 
        {
          text: 'Ok',
          handler: async () => {

            const loading = await this.loadingController.create({
            message: 'Deleting',
            spinner: 'dots'
            });

            await loading.present();

           const result = this.company.deletemessage(this.inboxid[0].userget);

            if(result){
              this.toast('Deleted Successfully');
            }else{
              this.toast('Something went wrong');

            }

            await loading.dismiss();
            this.closeBtn2.dismiss();
            this.router.navigate(['messagescompany']);


          }
        }
        
      ]
    });

    await infoAlert.present();
  }

  async toast(message: any){
    const toast =await this.toastController.create({
      message,
      duration: 1000

    });
    await toast.present();
  }
}
