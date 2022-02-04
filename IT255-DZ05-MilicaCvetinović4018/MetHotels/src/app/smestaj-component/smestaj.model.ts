import Soba from "./soba.model"


class Smestaj{
    naziv:string
    lokacija:string
    sobe:Array<Soba>
    cena:number
    constructor(naziv:string,lokacija:string,sobe:Array<Soba>,cena:number){
        this.naziv = naziv
        this.lokacija = lokacija
        this.sobe = sobe
        this.cena = cena
    }
}

export default Smestaj