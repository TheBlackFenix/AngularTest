import { Component } from '@angular/core';
import { SidebarComponent } from '../../shared/ui/sidebar/sidebar.component';
import { NavbarComponent } from '../../shared/ui/navbar/navbar.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [SidebarComponent, NavbarComponent, RouterOutlet],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export default class DashboardComponent {}
