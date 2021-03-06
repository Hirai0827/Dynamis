import {IDynamisNode} from "../IDynamisNode";
import {CodeGenerateProps, CodeGenerateResult, DynamisNodeParams} from "../DynamisNodeData";
import {DynamisNameProvider} from "../../controllers/DynamisNameProvider";
import {DynamisMathUtils} from "../DynamisMathUtils";
import {DynamisTransformNode} from "./DynamisTransformNode";

export class DynamisPmodNode extends DynamisTransformNode{
    generateCode = () => {
        const posName = DynamisNameProvider.GetPosValName(this.props.posId);
        const parentPosName = DynamisNameProvider.GetPosValName(this.parent ? this.parent.props.posId : -1);
        let axis:string = this.params.Get("axis","x");
        axis = DynamisMathUtils.validateAxis(axis) ? axis : "x";
        const plane = DynamisMathUtils.convertAxis2Plane(axis);
        let div:string = this.params.Get("div","6.0");
        let str = `vec3 ${posName} = ${parentPosName};\n`;
        str += `float ${posName}_r = length(${parentPosName}.${plane});\n`;
        str += `float ${posName}_theta = atan(${parentPosName}.${plane[1]}/${parentPosName}.${plane[0]});\n`;
        str += `${posName}_theta = (fract(${posName}_theta / (6.2830/(${div})) + 0.5) - 0.5) * (6.2830/(${div}));\n`;
        str += `${posName}.${plane} = vec2(cos(${posName}_theta),sin(${posName}_theta))*${posName}_r;\n`;
        for(let i = 0; i < this.child.length; i++){
            const codeGenerateResult = this.child[i].generateCode();
            str += codeGenerateResult;
        }
        return str;
    };


}
