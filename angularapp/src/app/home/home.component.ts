import { Component } from '@angular/core';
import { faBarsProgress, faDashboard, faMoneyBill, faSearch } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  faStats = faBarsProgress;
  faMoney = faMoneyBill;
  faSearch = faSearch;
  faDashboard = faDashboard;
}
