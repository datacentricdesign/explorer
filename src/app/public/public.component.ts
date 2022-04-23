import { Component, OnInit } from '@angular/core';


export interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}

const exampleRoute = { path: '/example', title: 'Example', icon: 'nc-user-run', class: '' }

export const ROUTES: RouteInfo[] = [exampleRoute];

@Component({
  selector: 'app-public',
  templateUrl: './public.component.html',
  styleUrls: ['./public.component.scss']
})
export class PublicComponent implements OnInit {

  public menuItems: any[];
  
  constructor() {

  }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
}
