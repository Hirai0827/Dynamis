import {IDynamisNode} from "../IDynamisNode";
import {CodeGenerateProps, CodeGenerateResult, DynamisNodeParams} from "../DynamisNodeData";
import {DynamisNameProvider} from "../../controllers/DynamisNameProvider";
import {DynamisMathUtils} from "../DynamisMathUtils";
import {DynamisTransformNode} from "./DynamisTransformNode";

export class DynamisRotateNode extends DynamisTransformNode {
    generateCode = () => {
        const posName = DynamisNameProvider.GetPosValName(this.props.posId);
        const parentPosName = DynamisNameProvider.GetPosValName(this.parent ? this.parent.props.posId : -1);
        let axis:string = this.params.Get("axis","x");
        axis = DynamisMathUtils.validateAxis(axis) ? axis : "x";
        const plane = DynamisMathUtils.convertAxis2Plane(axis);
        let angle:string = this.params.Get("angle","0.0");
        let str = `vec3 ${posName} = ${parentPosName};\n`;
        str += `${posName}.${plane} = ${parentPosName}.${plane} * mat2(cos(${angle}),-sin(${angle}),sin(${angle}),cos(${angle}));\n`;
        for(let i = 0; i < this.child.length; i++){
            const codeGenerateResult = this.child[i].generateCode();
            str += codeGenerateResult;
        }
        return str;
    };


}
