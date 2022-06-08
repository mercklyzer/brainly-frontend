import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { ErrorMessageModule } from "../shared/ui/error-message/error-message.module";
import { TaglineModule } from "../shared/ui/tagline/tagline.module";
import { LoginRoutingModule } from "./login-routing.module";
import { LoginPage } from "./login.page";
import { LoginFormComponent } from "./ui/login-form/login-form.component";

@NgModule({
    declarations: [
        LoginPage,
        LoginFormComponent
    ],
    imports: [
        TaglineModule,
        CommonModule,
        ReactiveFormsModule,
        ErrorMessageModule,
        LoginRoutingModule
    ]
})
export class LoginModule {}