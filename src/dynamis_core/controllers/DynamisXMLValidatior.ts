export class DynamisXMLValidatior {
    public static Validate:(str:string) => boolean = (str:string) => {
        const pointAngle = /(>|<)/g;
        let isInBrackets:boolean = false;
        // @ts-ignore
        const arr:Array<RegExpMatchArray> = Array.from(str.matchAll(pointAngle));
        for(let i = 0; i < arr.length; i++){
            const char = arr[i][0];
            switch (char) {
                case "<":
                    if(isInBrackets){
                        return false;
                    }
                    isInBrackets = true;
                    break;
                case ">":
                    if(!isInBrackets){
                        return false;
                    }
                    isInBrackets = false;
                    break;
            }
        }
        if(isInBrackets){
            return false;
        }
        return true;
    }
}
