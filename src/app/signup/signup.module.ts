import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { SignupRoutingModule } from "./signup-routing.module";
import { SignupPage } from "./signup.page";
import { SignupErrorComponent } from "./ui/signup-error/signup-error.component";
import { SignupFormComponent } from "./ui/signup-form/signup-form.component";
import { SignupTaglineComponent } from "./ui/signup-tagline/signup-tagline.component";

@NgModule({
    declarations: [
        SignupFormComponent,
        SignupErrorComponent,
        SignupTaglineComponent,
        SignupPage
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        SignupRoutingModule
    ]
})
export class SignupModule{}