import {IDynamisNode} from "../IDynamisNode";
import {CodeGenerateProps, DynamisNodeParams} from "../DynamisNodeData";

export class DynamisUndefinedNode implements IDynamisNode{
    child: Array<IDynamisNode> = new Array<IDynamisNode>();
    generateCode = () => {return ""};
    params: DynamisNodeParams = new DynamisNodeParams();
    parent: IDynamisNode | null = null;
    allocateProps: (codeGenerateProps: CodeGenerateProps) => CodeGenerateProps = (codeGenerateProps) => {
        return codeGenerateProps;
    };
    props: CodeGenerateProps = {posId:-1,distId:-1};

}
