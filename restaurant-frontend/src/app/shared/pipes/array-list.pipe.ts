import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "arrayList"
})
export class ArrayListPipe implements PipeTransform {
  transform(value: any): string {
    console.log(value);
    return value.join(", ");
  }
}
