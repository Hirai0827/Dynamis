export class DynamisNameProvider {
    static GetPosValName = (id:number) => {
        let res:string = "P_";
        for(let i = 0; i < 4;i ++){
            let mod = id % 16;
            res += String.fromCharCode(mod +65);
            id = Math.floor((id - mod) /16);
        }
        return res;
    };
    static GetDistValName = (id:number) => {
        let res:string = "d_";
        for(let i = 0; i < 4;i ++){
            let mod = id % 16;
            res += String.fromCharCode(mod + 97);
            id = Math.floor((id - mod) /16);
        }
        return res;
    };
}
