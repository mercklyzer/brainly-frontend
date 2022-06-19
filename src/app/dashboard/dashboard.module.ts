import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { DashboardRoutingModule } from "./dashboard-routing.module";
import { DashboardPage } from "./dashboard.page";
import { DashboardQuestionsModule } from "./feature/dashboard-questions/dashboard-questions.module";
import { DashboardSideUserModule } from "./feature/dashboard-side-user/dashboard-side-user.module";
import { DashboardSidebarModule } from "./feature/dashboard-sidebar/dashboard-sidebar.module";
import { DashboardSidebarMenuModule } from "./ui/dashboard-sidebar-menu/dashboard-sidebar-menu.module";

@NgModule({
    declarations: [
        DashboardPage,
    ],
    imports: [
        CommonModule,
        DashboardSidebarModule,
        DashboardSidebarMenuModule,
        DashboardQuestionsModule,
        DashboardRoutingModule,
        DashboardSideUserModule
    ]
})
export class DashboardModule {}