import { Component, EventEmitter, Input, Output } from "@angular/core";
import { FormGroup } from "@angular/forms";

@Component({
    selector: 'signup-form',
    templateUrl: './signup-form.component.html',
    styleUrls: ['./signup-form.component.css']
})
export class SignupFormComponent{
    @Input() signupForm!:FormGroup
    @Output() onSubmit:EventEmitter<null> = new EventEmitter<any>()
    @Output() onSelectImage:EventEmitter<FileList | null> = new EventEmitter<FileList | null>()

    handleSubmit():void{
        this.onSubmit.emit(null);
    }

    handleSelectImage(event:Event):void{
        this.onSelectImage.emit((event.target as HTMLInputElement).files);
    }
}