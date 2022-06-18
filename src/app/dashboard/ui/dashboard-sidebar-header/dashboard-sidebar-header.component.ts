import { Component } from "@angular/core";
// <img src="../../assets/images/x.png" class="x" *ngIf="hamburgerOn" (click)="toggleHamburger()">
@Component({
    selector: 'dashboard-sidebar-header',
    template: `
        <div class="subjects-header">
            Subjects
            <img src="../../assets/images/x.png" class="x">
        </div>
    `,
    styles: [
        `
        .subjects-header{
            padding: 10px 10px 16px 10px;
            border-bottom: 2px solid #EBF2F7;
            font-weight: 500;
            font-size: 16px;
            line-height: 16px;
        }

        .x{
            cursor: pointer;
            display: none;
            width: 25px;
            height: 25px;
            float: right;
            margin: 20px;
        }
        `
    ]
})
export class DashboardSidebarHeaderComponent {}