import { Component, OnInit } from '@angular/core';
import { AuthService } from "../services/auth.service";
import { getCookie } from "typescript-cookie";

@Component({
  selector: 'app-loginpage',
  templateUrl: './loginpage.component.html',
  styleUrls: ['./loginpage.component.css']
})
export class LoginpageComponent implements OnInit {

  constructor(public auth: AuthService) { }

  ngOnInit(): void {}

}
