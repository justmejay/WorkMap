import { Component,} from '@angular/core';
import { ActionSheetController } from '@ionic/angular';


@Component({
  selector: 'app-companyprofile',
  templateUrl: './companyprofile.page.html',
  styleUrls: ['./companyprofile.page.scss'],
})
export class CompanyprofilePage {
  result!: string;

  constructor(private actionSheetCtrl: ActionSheetController) {}

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
