import { Pipe, PipeTransform } from '@angular/core';
import { Movimientos } from '../models/movimientos.model';

@Pipe({
  name: 'ordenMovimientos'
})
export class OrdenMovimientosPipe implements PipeTransform {

  transform( items: Movimientos[] ): Movimientos[] {
    return items.slice().sort((a, b) => a.monto - b.monto);
  }

}
