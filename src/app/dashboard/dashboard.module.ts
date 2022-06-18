import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { NgxSkeletonLoaderModule } from "ngx-skeleton-loader";
import { SubjectTitlecaseModule } from "../shared/utils/subject-titlecase/subject-titlecase.module";
import { DashboardRoutingModule } from "./dashboard-routing.module";
import { DashboardPage } from "./dashboard.page";
import { DashboardQuestionsModule } from "./feature/dashboard-questions/dashboard-questions.module";
import { DashboardSidebarModule } from "./feature/dashboard-sidebar/dashboard-sidebar.module";

@NgModule({
    declarations: [
        DashboardPage,
    ],
    imports: [
        CommonModule,
        DashboardSidebarModule,
        DashboardQuestionsModule,
        DashboardRoutingModule,
    ]
})
export class DashboardModule {}