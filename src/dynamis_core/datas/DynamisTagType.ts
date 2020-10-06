export type DynamisTagType = "StartTag"|"EndTag"|"EmptyTag";
export namespace DynamisTagType{
    export const getTagType:(str:string) => DynamisTagType = (str:string) => {
        if(str[1] == '/'){
            return "EndTag";
        }else{
            if(str[str.length-2] == '/'){
                return "EmptyTag";
            }else{
                return "StartTag";
            }
        }
    }
}
