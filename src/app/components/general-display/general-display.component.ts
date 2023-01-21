import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from "@angular/common/http";

@Component({
  selector: 'app-general-display',
  templateUrl: './general-display.component.html',
  styleUrls: ['./general-display.component.css']
})
export class GeneralDisplayComponent implements OnInit {
  ipAddress = '';
  weatherData: any;
  weatherLoaded: boolean = false;
  constructor(private http:HttpClient) {

  }

  ngOnInit(): void {
    this.getWeatherGeoData();
  }

  getWeatherGeoData()
  {
    this.http.get("https://ipgeolocation.abstractapi.com/v1/?api_key=80d592c14c0646ddaf9c354948ed1e74").subscribe((res:any)=>{
      this.ipAddress = res.ip_address;
        this.http.get("http://api.weatherapi.com/v1/current.json?key=001bb31f204345268f823425230701&q="+this.ipAddress+"&aqi=no\n").subscribe((response:any)=> {
            this.weatherData = response;
            console.log(this.weatherData);
            this.weatherLoaded = true;
        })
    });
  }
}
