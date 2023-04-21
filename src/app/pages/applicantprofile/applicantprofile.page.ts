import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { ProfilingService } from 'src/app/services/profiling.service';

@Component({
  selector: 'app-applicantprofile',
  templateUrl: './applicantprofile.page.html',
  styleUrls: ['./applicantprofile.page.scss'],
})
export class ApplicantprofilePage implements OnInit {
  profile: any = [];
  address: any = [];
  resume: any = [];
  certifications: any = []; 
  school: any = [];
  experience: any = [];
 


  constructor(
    private firestore: ProfilingService,
    private alertCtrl: AlertController,
    private router: Router
  ) {

    this.firestore.getprofile().subscribe(res=>{
      this.profile = res;

    })
    this.firestore.getaddress().subscribe(res=>{
      this.address = res;
      console.log(this.address)

    })
    this.firestore.getcertification().subscribe(res=>{
      this.certifications = res;

    })

    this.firestore.getexperience().subscribe(res=>{
      this.experience = res;

    })

    this.firestore.getschool().subscribe(res=>{
      this.school = res;

    })




   }

  ngOnInit(
    

  ) {

  }

  async about(){
    const alert = await this.alertCtrl.create({
      header: 'Tell me about yourself',
      inputs: [
        {
          name: 'AboutMe',
          type: 'textarea',
          value:  `${this.profile.aboutme}`
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Update',
          handler: (res) =>{
            this.firestore.editaboutme(res.AboutMe)
            //this.dataService.addNoteWithCustomId({title: res.title, text: res.text})
          }
        }
      ]
    });
    await alert.present();

  }
}
