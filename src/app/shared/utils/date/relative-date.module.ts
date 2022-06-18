import { NgModule } from "@angular/core";
import { RelativeDatePipe } from "./relative-date.pipe";

@NgModule({
    declarations: [RelativeDatePipe],
    exports: [RelativeDatePipe]
})
export class RelativeDateModule {}