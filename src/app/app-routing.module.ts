import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginpageComponent } from "./loginpage/loginpage.component";
import { MainpanelComponent } from "./mainpanel/mainpanel.component";
import { GeneralDisplayComponent } from "./components/general-display/general-display.component";
import { NavigationComponent } from "./components/navigation/navigation.component";

const routes: Routes = [
  { path: '', component: LoginpageComponent },

  { path: 'home', component: MainpanelComponent,
    children: [
      { path: '', component: GeneralDisplayComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
