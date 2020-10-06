import {DynamisRegex} from "../datas/DynamisRegex";

export class DynamisParser {
    val:string;
    constructor(val:string) {
        this.val = val;
    }
    public Parse(){
        const regex = DynamisRegex.GeneralRegex;
        // @ts-ignore
        const res = [...this.val.matchAll(regex)];
        return res.map(e => e[0]);

    }
}
