import {IDynamisNode} from "../IDynamisNode";
import {CodeGenerateProps, CodeGenerateResult, DynamisNodeParams} from "../DynamisNodeData";
import {DynamisNameProvider} from "../../controllers/DynamisNameProvider";

export class DynamisFractNode implements IDynamisNode {
    child: Array<IDynamisNode> = new Array<IDynamisNode>();
    generateCode = () => {
        const posName = DynamisNameProvider.GetPosValName(this.props.posId);
        const parentPosName = DynamisNameProvider.GetPosValName(this.parent ? this.parent.props.posId : -1);
        const cellSize = this.params["size"] ? this.params["size"] : "1.0";
        let str = `vec3 ${posName} = (fract(${parentPosName}/${cellSize} + 0.5) - 0.5) * ${cellSize};\n`;
        for(let i = 0; i < this.child.length; i++){
            const codeGenerateResult = this.child[i].generateCode();
            str += codeGenerateResult;
        }
        return str;
    };
    params: DynamisNodeParams = {};
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
