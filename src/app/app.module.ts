import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { MatTabsModule } from '@angular/material/tabs';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatCommonModule } from '@angular/material/core';
import { MatListModule } from '@angular/material/list';
import { MatRippleModule } from '@angular/material/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavigationComponent } from './components/navigation/navigation.component';
import { MainpanelComponent } from './mainpanel/mainpanel.component';
import { LoginpageComponent } from './loginpage/loginpage.component';
import { GeneralDisplayComponent } from './components/general-display/general-display.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { FIREBASE_OPTIONS } from '@angular/fire/compat';
import { firebaseConfig } from '../config';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    MainpanelComponent,
    LoginpageComponent,
    GeneralDisplayComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatTabsModule,
    MatSlideToggleModule,
    MatSidenavModule,
    MatCommonModule,
    MatListModule,
    MatRippleModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatCardModule,
    MatGridListModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [{ provide: FIREBASE_OPTIONS, useValue: firebaseConfig }],
  bootstrap: [AppComponent],
})
export class AppModule {}
