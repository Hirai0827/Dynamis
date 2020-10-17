import {DynamisXMLValidatior} from "./DynamisXMLValidatior";
import {DynamisParser} from "./DynamisParser";
import {DynamisAST} from "../datas/DynamisAST";
import {DynamisASTGenerator} from "./DynamisASTGenerator";
import {DynamisASTVisualizer} from "../debug/DynamisASTVisualizer";

export namespace DynamisCompiler {
    export const Compile : (src:string,option?:CompileOption) => CompileResult =(src:string) => {
        let state:CompileState = "failed";
        let errorMessage:ErrorMessage = "";
        if(!DynamisXMLValidatior.Validate(src)){
            console.error("Validation Failed");
            return {
                state:"failed",
                errorType:"ParseError",
                errorMessage:errorMessage,
                data:"error"
            } as CompileResult;
        }
        const dynamisParser = new DynamisParser(src);
        const res = dynamisParser.Parse();
        let ast:DynamisAST;
        try {
            ast = DynamisASTGenerator.Generate(res);
        }catch (e) {
            if(e.message == "Syntax Error"){
                return {
                    state:"failed",
                    errorType:"ParseError",
                    errorMessage:errorMessage,
                    data:"error"
                } as CompileResult;
            }else{
                return {
                    state:"failed",
                    errorType:"UnexpectedNodeError",
                    errorMessage:errorMessage,
                    data:"error"
                } as CompileResult;
            }
        }
        ast.props  = {posId:0,distId:0};
        ast.allocateProps({posId:0,distId:0});
        let data = "";
        data = ast.generateCode();

        return {
            state:"success",
            errorType:null,
            errorMessage:errorMessage,
            data:data,
            ast:ast
        } as CompileResult;
    }
    export interface CompileOption {

    }
    export type CompileState = "success"|"failed";
    export type ErrorType = null|"ParseError"|"UnexpectedNodeError";
    export type ErrorMessage = string;
    export interface CompileResult {
        state:CompileState;
        errorType:ErrorType;
        errorMessage:ErrorMessage;
        data:string;
        ast?:DynamisAST;
    }
}
