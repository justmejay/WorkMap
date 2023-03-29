import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { ProfilingService } from '../services/profiling.service';

@Component({
  selector: 'app-resumebuilder',
  templateUrl: './resumebuilder.page.html',
  styleUrls: ['./resumebuilder.page.scss'],
})
export class ResumebuilderPage implements OnInit {
  profile: any = [];
  address: any = [];
  resume: any = [];
  certifications: any = []; 
  school: any = [];
  experience: any = [];

  constructor(
    private firestore: ProfilingService,
    private alertCtrl: AlertController,
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

    this.firestore.getresume().subscribe(res=>{
      this.resume = res;

    })
   }

  ngOnInit() {
  }


  async ref(){
    const alert = await this.alertCtrl.create({
      header: 'Character Reference',
      inputs: [
        {
          name: 'MotherName',
          placeholder: 'Enter Mother Name',
          type: 'text',
          value: `${this.resume.mo}`
        },
        {
          name: 'MotherContact',
          placeholder: 'Enter Mother Contact',
          type: 'number',
          value: `${this.resume.moc}`

        },
        {
          name: 'FatherName',
          placeholder: 'Enter Father Name',
          type: 'text',
          value: `${this.resume.fa}`

        },
        {
          name: 'FatherContact',
          placeholder: 'Enter Father Contact',
          type: 'number',
          value: `${this.resume.fac}`


        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Update',
          handler: (res) =>{
            this.firestore.editref({mo: res.MotherName, moc: res.MotherContact, fa: res.FatherName, fac: res.FatherContact,})
            //this.dataService.addNoteWithCustomId({title: res.title, text: res.text})
          }
        }
      ]
    });
    await alert.present();

  }

}
