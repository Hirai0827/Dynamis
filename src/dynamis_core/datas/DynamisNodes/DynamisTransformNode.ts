import {IDynamisNode} from "../IDynamisNode";
import {CodeGenerateProps, DynamisNodeParams} from "../DynamisNodeData";
import {DynamisNameProvider} from "../../controllers/DynamisNameProvider";

export abstract class DynamisTransformNode implements IDynamisNode {
    child: Array<IDynamisNode> = new Array<IDynamisNode>();
    abstract generateCode():string;
    params: DynamisNodeParams = new DynamisNodeParams();
    parent: IDynamisNode | null = null;
    allocateProps: (codeGenerateProps: CodeGenerateProps) => CodeGenerateProps = codeGenerateProps => {
        codeGenerateProps.posId++;
        this.props.posId = codeGenerateProps.posId;
        this.props.distId = this.parent ? this.parent.props.distId : -1;
        for(let i = 0; i < this.child.length; i++){
            codeGenerateProps = this.child[i].allocateProps(codeGenerateProps);
        }
        return codeGenerateProps;
    };
    props: CodeGenerateProps = {posId:-1,distId:-1};


}
