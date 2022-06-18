import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { DashboardSidebarHeaderModule } from "../../ui/dashboard-sidebar-header/dashboard-sidebar-header.module";
import { DashboardSidebarComponent } from "./dashboard-sidebar.component";

@NgModule({
    declarations: [
        DashboardSidebarComponent
    ],
    imports: [
        RouterModule,
        CommonModule,
        DashboardSidebarHeaderModule
    ],
    exports: [
        DashboardSidebarComponent
    ]
})
export class DashboardSidebarModule {}