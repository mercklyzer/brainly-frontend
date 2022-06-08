import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { ErrorMessageModule } from "../shared/ui/error-message/error-message.module";
import { TaglineModule } from "../shared/ui/tagline/tagline.module";
import { SignupRoutingModule } from "./signup-routing.module";
import { SignupPage } from "./signup.page";
import { SignupFormComponent } from "./ui/signup-form/signup-form.component";

@NgModule({
    declarations: [
        SignupFormComponent,
        SignupPage
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        ErrorMessageModule,
        SignupRoutingModule,
        TaglineModule
    ]
})
export class SignupModule{}