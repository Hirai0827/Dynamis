import {IDynamisNode} from "../IDynamisNode";
import {DynamisNameProvider} from "../../controllers/DynamisNameProvider";
import {CodeGenerateProps, DynamisNodeParams} from "../DynamisNodeData";
import {DynamisMathUtils} from "../DynamisMathUtils";
import {DynamisShapeNode} from "./DynamisShapeNode";

export class DynamisPillarNode extends DynamisShapeNode{
    generateCode = () => {
        const posName = DynamisNameProvider.GetPosValName(this.props.posId);
        const distName = DynamisNameProvider.GetDistValName(this.props.distId);
        let axis = this.params.Get("axis","x");
        axis = DynamisMathUtils.validateAxis(axis) ? axis : "x";
        const plane = DynamisMathUtils.convertAxis2Plane(axis);
        const rad = this.params.Get("radius","0.5");
        let str:string = `${distName} = min(${distName},length(${posName}.${plane}) - ${rad});\n`;
        if(this.params.Get("type","circle") == "square"){
            str = `${distName} = min(${distName},max(abs(${posName}.${plane[0]}),abs(${posName}.${plane[1]})) - ${rad}/2.0);\n`;
        }
        return str;
    };
}
