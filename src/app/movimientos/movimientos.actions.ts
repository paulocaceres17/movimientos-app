import { createAction, props } from '@ngrx/store';
import { Movimientos } from '../models/movimientos.model';

export const setItem = createAction( '[Movimientos] setItem',
    props<{ items: Movimientos }>()
);

export const setItems = createAction( '[Movimientos] setItems',
    props<{ items: Movimientos[] }>()
);

export const delItem = createAction( '[Movimientos] delItem',
    props<{ uid: string }>()
);

export const unSetItems = createAction( '[Movimientos] unSetItems' );