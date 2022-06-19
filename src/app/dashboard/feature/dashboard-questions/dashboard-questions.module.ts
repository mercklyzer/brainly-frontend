import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { NgxSkeletonLoaderModule } from "ngx-skeleton-loader";
import { RelativeDateModule } from "src/app/shared/utils/date/relative-date.module";
import { DashboardNewQuestionsModule } from "../../ui/dashboard-new-questions/dashboard-new-questions.module";
import { DashboardQuestionModule } from "../../ui/dashboard-question-ui/dashboard-question.module";
import { DashboardQuestionsComponent } from "./dashboard-questions.component";

@NgModule({
    declarations: [
        DashboardQuestionsComponent
    ],
    imports: [
        CommonModule,
        RouterModule,
        NgxSkeletonLoaderModule,
        RelativeDateModule,
        DashboardQuestionModule,
        DashboardNewQuestionsModule
    ],
    exports: [
        DashboardQuestionsComponent
    ]
})
export class DashboardQuestionsModule {}