import {IDynamisNode} from "../IDynamisNode";
import {DynamisNameProvider} from "../../controllers/DynamisNameProvider";
import {CodeGenerateProps, CodeGenerateResult, DynamisNodeParams} from "../DynamisNodeData";

export abstract class DynamisShapeNode implements IDynamisNode{
    child:Array<IDynamisNode> = new Array<IDynamisNode>();
    parent:IDynamisNode|null = null;
    abstract generateCode():string;
    params: DynamisNodeParams = new DynamisNodeParams();
    allocateProps: (codeGenerateProps: CodeGenerateProps) => CodeGenerateProps = codeGenerateProps => {
        this.props.posId = this.parent ? this.parent.props.posId : -1;
        this.props.distId =this.parent ? this.parent.props.distId : -1;
        for(let i = 0; i < this.child.length; i++){
            codeGenerateProps = this.child[i].allocateProps(codeGenerateProps);
        }
        return codeGenerateProps;
    };
    props: CodeGenerateProps = {posId:-1,distId:-1};
}
