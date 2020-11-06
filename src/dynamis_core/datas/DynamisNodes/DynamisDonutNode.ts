import {IDynamisNode} from "../IDynamisNode";
import {DynamisNameProvider} from "../../controllers/DynamisNameProvider";
import {CodeGenerateProps, DynamisNodeParams} from "../DynamisNodeData";
import {DynamisMathUtils} from "../DynamisMathUtils";
import {DynamisShapeNode} from "./DynamisShapeNode";

export class DynamisDonutNode extends DynamisShapeNode{
    generateCode = () => {
        const posName = DynamisNameProvider.GetPosValName(this.props.posId);
        const distName = DynamisNameProvider.GetDistValName(this.props.distId);
        let axis = this.params.Get("axis","x");
        axis = DynamisMathUtils.validateAxis(axis) ? axis : "x";
        const plane = DynamisMathUtils.convertAxis2Plane(axis);
        const rad = this.params.Get("radius","0.5");
        const width = this.params.Get("width","0.1");
        let str:string = `${distName} = min(${distName},length(vec2(length(${posName}.${plane})-(${rad}),${posName}.${axis})) - (${width}));\n`;
        return str;
    };
}
