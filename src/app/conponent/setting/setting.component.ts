import { Component } from '@angular/core';
import { NavComponent } from "../../nav/nav.component";
import {MatExpansionModule} from '@angular/material/expansion';
import {MatTableModule} from '@angular/material/table';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-setting',
    standalone: true,
    templateUrl: './setting.component.html',
    styleUrl: './setting.component.scss',
    imports: [NavComponent,MatExpansionModule,MatTableModule,RouterLink]
})
export class SettingComponent {
  panelOpenState = false;
}
