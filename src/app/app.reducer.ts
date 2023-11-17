import { ActionReducerMap } from "@ngrx/store";
import * as ui from "./shared/ui.reducer";
import * as auth from "./auth/auth.reducer";
import * as movimientos from "./movimientos/movimientos.reducer";


export interface AppState {
    ui: ui.State,
    user: auth.State,
    // movimientos: movimientos.State
}

export const appReducers: ActionReducerMap<AppState> = {
    ui: ui.uiReducer,
    user: auth.authReducer,
    // movimientos: movimientos.movimientosReducer
}