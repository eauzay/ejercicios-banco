import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'textUpper'
})
export class UpperLowerCasePipe implements PipeTransform {

    transform(value: string, isUpper: boolean = true): string {
        return (isUpper) ? value.toUpperCase() : value.toLowerCase();
    }
}