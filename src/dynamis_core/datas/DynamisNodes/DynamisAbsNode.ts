import {IDynamisNode} from "../IDynamisNode";
import {CodeGenerateProps, CodeGenerateResult, DynamisNodeParams} from "../DynamisNodeData";
import {DynamisNameProvider} from "../../controllers/DynamisNameProvider";
import {DynamisMathUtils} from "../DynamisMathUtils";

export class DynamisAbsNode implements IDynamisNode {
    child: Array<IDynamisNode> = new Array<IDynamisNode>();
    generateCode = () => {
        const posName = DynamisNameProvider.GetPosValName(this.props.posId);
        const parentPosName = (this.parent) ? DynamisNameProvider.GetPosValName(this.parent.props.posId) : null;
        let axis:string = this.params.Get("axis","x");
        if(axis != "xyz"){
            axis = DynamisMathUtils.validateAxis(axis) ? axis : "x";
        }
        let str = `vec3 ${posName} = ${parentPosName};\n`;
        str += `${posName}.${axis} = abs(${parentPosName}.${axis});\n`;
        for(let i = 0; i < this.child.length; i++){
            const codeGenerateResult = this.child[i].generateCode();
            str += codeGenerateResult;
        }
        return str;
    };
    params: DynamisNodeParams = new DynamisNodeParams();
    parent: IDynamisNode | null = null;
    allocateProps: (codeGenerateProps: CodeGenerateProps) => CodeGenerateProps = codeGenerateProps => {
        codeGenerateProps.posId++;
        this.props.posId = codeGenerateProps.posId;
        this.props.distId = (this.parent) ?this.parent.props.distId:-1;
        for(let i = 0; i < this.child.length; i++){
            codeGenerateProps = this.child[i].allocateProps(codeGenerateProps);
        }
        return codeGenerateProps;
    };
    props: CodeGenerateProps = {posId:-1,distId:-1};


}
