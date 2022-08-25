import { Component, OnInit, HostListener } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  navbarfixed:boolean = false;
  @HostListener('window:scroll', [`$event`]) onscroll(){
    if(window.scrollY > 30) {
      this.navbarfixed = true;
    }
    else{
      this.navbarfixed = false;
    }
  }

  toggled:boolean = false;
  
  toggle() {
    this.toggled = !this.toggled;
  }
  


  list = [
    {
      number: '1',
      name: "Dashboard",
      icon: 'bx bx-grid-alt'
    },
    {
      number: '2',
      name: "Posts",
      icon: 'bx bx-book-alt'
    },
    {
      number: '3',
      name: "Chart",
      icon: 'bx bx-line-chart'
    },
    {
      number: '4',
      name: "Subjects",
      icon: 'bx bxs-chevron-down arrow'
    },
    {
      number: '5',
      name: "Dashboard",
      icon: 'bx bx-grid-alt'
    },
    {
      number: '6',
      name: "Time-table",
      icon: 'bx bx-compass'
    },
    {
      number: '7',
      name: "Bio-data",
      icon: 'bx bx-history'
    },
    {
      number: '8',
      name: "Setting",
      icon: 'bx bx-cog'
    },
  ];
}
