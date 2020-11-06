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
        const offX = this.params.Get("offX","0.0");
        const offY = this.params.Get("offY","0.0");
        const offZ = this.params.Get("offZ","0.0");
        const vec = `vec3(${offX},${offY},${offZ})`;
        let str:string = `${distName} = min(${distName},length(vec2(length(${posName}.${plane} - ${vec}.${plane})-(${rad}),${posName}.${axis} - ${vec}.${axis})) - (${width}));\n`;
        return str;
    };
}
