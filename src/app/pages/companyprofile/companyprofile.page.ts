import { Component,} from '@angular/core';
import { ActionSheetController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { CompanyService } from 'src/app/services/company.service';


@Component({
  selector: 'app-companyprofile',
  templateUrl: './companyprofile.page.html',
  styleUrls: ['./companyprofile.page.scss'],
})
export class CompanyprofilePage {
  userget: any;
  company: any = [];
  employer: any = [];
  result!: string;

  constructor(private actionSheetCtrl: ActionSheetController,
    private firestore: CompanyService,
    private alertCtrl: AlertController,) {
      
    this.firestore.getcompany().subscribe(res=>{
      this.company = res;
      console.log(this.company)

    })

    this.firestore.getemployer().subscribe(res=>{
      this.employer = res;
      console.log(this.employer)

    })
    }

  ngOnInit(

    ) {
    }

  async presentActionSheet() {
    const actionSheet = await this.actionSheetCtrl.create({
      buttons: [
        {
          text: 'Upload from gallery',
          data: {
          },
        },
        {
          text: 'Cancel',
          role: 'cancel',
          data: {
            action: 'cancel',
          },
        },
      ],
    });

    await actionSheet.present();

    const result = await actionSheet.onDidDismiss();
    this.result = JSON.stringify(result, null, 2);
  }
}
