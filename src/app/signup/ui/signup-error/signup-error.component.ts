import { Component, Input } from "@angular/core";

@Component({
    selector: 'signup-error',
    template: `
    <div class="alert alert-danger" role="alert">
        {{errorMessage}}
    </div>
    `
})
export class SignupErrorComponent {
    @Input() errorMessage!:string
}