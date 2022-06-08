import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { ErrorMessageModule } from "../shared/ui/error-message/error-message.module";
import { SignupRoutingModule } from "./signup-routing.module";
import { SignupPage } from "./signup.page";
import { SignupFormComponent } from "./ui/signup-form/signup-form.component";
import { SignupTaglineComponent } from "./ui/signup-tagline/signup-tagline.component";

@NgModule({
    declarations: [
        SignupFormComponent,
        SignupTaglineComponent,
        SignupPage
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        ErrorMessageModule,
        SignupRoutingModule
    ]
})
export class SignupModule{}