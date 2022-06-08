import { Component, EventEmitter, Input, Output } from "@angular/core";
import { FormGroup } from "@angular/forms";

@Component({
    selector: 'login-form',
    templateUrl: './login-form.component.html',
    styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent {
    @Input() loginForm!:FormGroup
    @Output() onSubmit:EventEmitter<null> = new EventEmitter<null>()

    handleSubmit():void{
        this.onSubmit.emit(null)
    }
}