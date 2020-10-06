import {DynamisNameProvider} from "../controllers/DynamisNameProvider";
import {CodeGenerateProps, CodeGenerateResult, DynamisNodeParams} from "./DynamisNodeData";

export interface IDynamisNode {
    params:DynamisNodeParams;
    props:CodeGenerateProps;
    child:Array<IDynamisNode>;
    parent:IDynamisNode|null;
    generateCode:() => string;
    allocateProps:(codeGenerateProps:CodeGenerateProps) => CodeGenerateProps;
}

