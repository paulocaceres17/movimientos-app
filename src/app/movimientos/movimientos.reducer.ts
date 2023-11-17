import { map } from 'rxjs';
import { createReducer, on } from '@ngrx/store';
import { delItem, setItem, setItems, unSetItems } from './movimientos.actions';
import { Movimientos } from '../models/movimientos.model';
import { AppState } from '../app.reducer';

export interface State {
    items: Movimientos[]
}

export interface AppStateMovimientos extends AppState {
    movimientos: State
}

export const estadoInicial: State = {
    items: []
};

export const movimientosReducer = createReducer(
    estadoInicial,
    // on( setItem, ( state, { items } ) => ( { ...state, items: state.items.map( registro => {
    //     return {
    //         ...registro,
    //         itemse: {...items}
    //     }
    // })  } ) ),
    on( setItem, ( state, { items } ) => ( { ...state, items: [...state.items, items ]  } ) ),
    on( setItems, ( state, { items } ) => ( { ...state, items: [...items] } ) ),
    on( unSetItems, state => ( { ...state, items: [] } ) ),
    on( delItem, ( state, { uid }) => ( { ...state, items: state.items.filter( item => item.uid !== uid ) } ) )
);