import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { RelativeDateModule } from "src/app/shared/utils/date/relative-date.module";
import { DashboardQuestionComponent } from "./dashboard-question.component";

@NgModule({
    declarations: [DashboardQuestionComponent],
    imports: [
        CommonModule,
        RouterModule,
        RelativeDateModule
    ],
    exports: [DashboardQuestionComponent]
})
export class DashboardQuestionModule {}