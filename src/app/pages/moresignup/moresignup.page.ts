import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-moresignup',
  templateUrl: './moresignup.page.html',
  styleUrls: ['./moresignup.page.scss'],
})
export class MoresignupPage implements OnInit {
  isInputEnabled = false;
  isInput2Enabled = false;

  constructor() { }

  ngOnInit() {
  }

  toggleInput(event: any) {
    this.isInputEnabled = event.detail.checked;
  }

  toggleInput2(event: any) {
    this.isInput2Enabled = event.detail.checked;
  }
  
  

}
