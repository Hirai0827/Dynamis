import {DynamisRegex} from "../datas/DynamisRegex";

export class DynamisXMLValidatior {
    public static Validate:(str:string) => boolean = (str:string) => {
        const pointAngle = /(>|<)/g;
        let isInBrackets:boolean = false;
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
    public static ValidateTagOnly:(str:string) => boolean = (str:string) => {
        let isInBracket = false;
        let isInComment = false;
        for(let i = 0; i < str.length; i++){
            if(isInComment){
                if(i + 1 < str.length){
                    if(str[i] == "*" && str[i + 1] == "/"){
                        isInComment = false;
                        i++;
                        continue;
                    }
                }
            }else{
                if(i + 1 < str.length){
                    if(str[i] == "/" && str[i + 1] == "*"){
                        isInComment = true;
                        i++;
                        continue;
                    }
                }
                if(isInBracket){
                    if(str[i] == ">"){
                        isInBracket = false;
                        continue;
                    }
                }else{
                    if(str[i] == "<"){
                        isInBracket = true;
                        continue;
                    }
                    if(str[i] == " " || str[i] == "\n" || str[i] == "\t"){
                        continue;
                    }
                    return false;
                }
            }
        }
        if(isInComment || isInBracket){
            return false;
        }
        return true;
    }
}
