import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CompanyService } from '../services/company.service';
import { first } from 'rxjs';
import { ProfilingService } from '../services/profiling.service';
import { AlertController, LoadingController, ModalController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-messageview',
  templateUrl: './messageview.page.html',
  styleUrls: ['./messageview.page.scss'],
})
export class MessageviewPage implements OnInit {
  companydata: any = [];
  companydata2: any = [];
  message: any = "";
  inboxid: any = [];
  messages: any = [];
  @ViewChild('trigger') closeBtn2: ModalController;




  constructor(
    private ac: ActivatedRoute,
    private company: CompanyService,
    private profile: ProfilingService,
    private toastController: ToastController,
    private router: Router,
    private alertController: AlertController,
    private loadingController: LoadingController
  ) {
    this.ac.queryParams.subscribe((params)=>{
      this.companydata = params;

      this.company.getcompanyid(this.companydata.id).pipe(first()).subscribe(res=>{
        this.companydata2 = res;

       
      });


       this.company.getinboxid(this.companydata.id).subscribe(res=>{
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

    this.company.sendmessageclient(this.message, this.companydata.id, this.companydata2.cname, this.companydata2.imageurl);
    this.message = "";

  }

  

  async toast(message: any){
    const toast =await this.toastController.create({
      message,
      duration: 1000

    });
    await toast.present();
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
            this.router.navigate(['messagespage']);


          }
        }
        
      ]
    });

    await infoAlert.present();
  }

}
