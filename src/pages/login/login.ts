import {Component} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {IonicPage, NavController, ToastController} from 'ionic-angular';
import {Storage} from '@ionic/storage';
import {User} from '../../providers/providers';
import {MainPage} from '../pages';
import {Settings} from "../../providers/settings/settings";

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  // The account fields for the login form.
  // If you're using the username field with or without email, make
  // sure to add it to the type
  account: { email: string, password: string } = {
    email: '',
    password: ''
  };

  // Our translated text strings
  private loginErrorString: string;
  private networkErrorString: string;

  constructor(public navCtrl: NavController,
              public user: User,
              public settings: Settings,
              public storage: Storage,
              public toastCtrl: ToastController,
              public translateService: TranslateService) {

    this.translateService.get('LOGIN_ERROR').subscribe((value) => {
      this.loginErrorString = value;
    });
    this.translateService.get('NETWORK_ERROR').subscribe((value) => {
      this.networkErrorString = value;
    });
  }

  // Attempt to login in through our User service
  doLogin() {
    this.user.login(this.account).subscribe((resp: any) => {
      if (resp.success) {
        this.storage.set("token", resp.data.token);
        this.storage.set("user", resp.data);
        this.navCtrl.push(MainPage);
      } else {
        let toast = this.toastCtrl.create({
          message: this.loginErrorString,
          duration: 3000,
          position: 'top'
        });
        toast.present();
      }
    }, (err) => {
      // Unable to log in
      let toast = this.toastCtrl.create({
        message: this.networkErrorString,
        duration: 3000,
        position: 'top'
      });
      toast.present();
    });
  }

  forget() {
    //TODO yhq
    this.navCtrl.push('LoginPage');
  }

  signup() {
    this.navCtrl.push('SignupPage');
  }
}
