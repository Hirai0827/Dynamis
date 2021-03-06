import {IDynamisNode} from "../IDynamisNode";
import {CodeGenerateProps, DynamisNodeParams} from "../DynamisNodeData";

export class DynamisTraceNode implements IDynamisNode{
    child:Array<IDynamisNode> = new Array<IDynamisNode>();
    parent:IDynamisNode|null = null;
    generateCode = () => {
        let str:string = "";
        for(let i = 0; i < this.child.length; i++){
            str += this.child[i].generateCode();
        }
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
