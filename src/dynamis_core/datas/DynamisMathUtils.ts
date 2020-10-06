export namespace DynamisMathUtils {
    export const validateAxis = (str:string) => {
        if(str == "x" || str == "y" || str == "z"){
            return true;
        }
        return false;
    }
    export const convertAxis2Plane = (str:string) => {
        if(validateAxis(str)){
            switch (str) {
                case "x":
                    return "yz";
                case "y":
                    return "zx";
                case "z":
                    return "xy";
            }
        }
        return "yz";
    }
}
