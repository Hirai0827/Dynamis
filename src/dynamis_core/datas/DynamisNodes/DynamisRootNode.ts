import {IDynamisNode} from "../IDynamisNode";
import {RootCode} from "../GLSLTempletes/RootCode";
import {CodeGenerateProps, CodeGenerateResult, DynamisNodeParams} from "../DynamisNodeData";
import {DynamisCompileOption} from "../DynamisCompileOption";

export class DynamisRootNode implements IDynamisNode{
    child:Array<IDynamisNode> = new Array<IDynamisNode>();
    parent:IDynamisNode|null = null;
    generateCode = (option?:DynamisCompileOption) => {
        let str:string = RootCode.GetRootPre(option);
        for(let i = 0; i < this.child.length; i++){
            str += this.child[i].generateCode();
        }
        str += RootCode.GetRootPost();
        return str;
    };
    params: DynamisNodeParams = new DynamisNodeParams();
    allocateProps: (codeGenerateProps: CodeGenerateProps) => CodeGenerateProps = codeGenerateProps => {
        this.props.posId = codeGenerateProps.posId;
        this.props.distId = codeGenerateProps.distId;
        for(let i = 0; i < this.child.length; i++){
            codeGenerateProps = this.child[i].allocateProps(codeGenerateProps);
        }
        return codeGenerateProps;
    };
    props: CodeGenerateProps = {posId:-1,distId:-1};
}
