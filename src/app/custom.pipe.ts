import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name:"Filter",
    pure:true
})
export class CustomPipe implements PipeTransform {
    transform(data: any[], searchTerm: string): any[] {
        return data.filter(productlistArray =>(productlistArray.cityname != searchTerm));
    }
}