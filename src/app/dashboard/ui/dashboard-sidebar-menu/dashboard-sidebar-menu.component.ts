import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
    selector: 'dashboard-sidebar-menu',
    template: `
        <img src="../../assets/images/x.png" class="x" (click)="handleToggleMenu()">
    `,
    styles: [
        `.x{
            cursor: pointer;
            display: none;
            width: 25px;
            height: 25px;
            float: right;
            margin: 20px;
        }`
    ]
})
export class DashboardSidebarMenuComponent {
    @Input() showMenu:boolean = true;
    @Output() onToggleMenu:EventEmitter<null> = new EventEmitter<null>();

    handleToggleMenu() {
        this.onToggleMenu.emit()
    }

}