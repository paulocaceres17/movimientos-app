
export class Movimientos {

    static fromFirebase( { descripcion, monto, tipo, user, uid }: any ) {
        return new Movimientos(descripcion, monto, tipo, user, uid);
    }

    constructor(
        public descripcion: string,
        public monto: number,
        public tipo: string,
        public user?: string,
        public uid?: string
    ) {}
    
}