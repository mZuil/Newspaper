import { Component, Input, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  @Input()
  canGoBack?: boolean;

  constructor(private location: Location) { }

  ngOnInit(): void {
  }

  goBack() : void {
    this.location.back();
  }

}
