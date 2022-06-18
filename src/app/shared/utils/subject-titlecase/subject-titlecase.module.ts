import { TitleCasePipe } from "@angular/common";
import { NgModule } from "@angular/core";
import { SubjectTitlecasePipe } from "./subject-titlecase.pipeline";

@NgModule({
    declarations: [
        SubjectTitlecasePipe
    ],
    exports: [
        SubjectTitlecasePipe
    ]
})
export class SubjectTitlecaseModule {}