import {IDynamisNode} from "../IDynamisNode";
import {CodeGenerateProps, CodeGenerateResult, DynamisNodeParams} from "../DynamisNodeData";
import {DynamisNameProvider} from "../../controllers/DynamisNameProvider";
import {DynamisMathUtils} from "../DynamisMathUtils";

export class DynamisTwistNode implements IDynamisNode {
    child: Array<IDynamisNode> = new Array<IDynamisNode>();
    generateCode = () => {
        const posName = DynamisNameProvider.GetPosValName(this.props.posId);
        const parentPosName = DynamisNameProvider.GetPosValName(this.parent ? this.parent.props.posId : -1);
        let axis:string = this.params["axis"] ? this.params["axis"] : "x";
        axis = DynamisMathUtils.validateAxis(axis) ? axis : "x";
        let plane:string = DynamisMathUtils.convertAxis2Plane(axis);
        let weight:string = this.params["weight"] ? this.params["weight"] : "1.0";
        let angle:string = `${parentPosName}.${axis} * ${weight}`;
        let str = `vec3 ${posName} = ${parentPosName};\n`;
        str += `${posName}.${plane} = ${parentPosName}.${plane} * mat2(cos(${angle}),-sin(${angle}),sin(${angle}),cos(${angle}));\n`;
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
