import {IDynamisNode} from "../IDynamisNode";
import {DynamisNameProvider} from "../../controllers/DynamisNameProvider";
import {CodeGenerateProps, CodeGenerateResult, DynamisNodeParams} from "../DynamisNodeData";
import {DynamisShapeNode} from "./DynamisShapeNode";

export class DynamisSphereNode extends DynamisShapeNode{
    generateCode = () => {
        const posName = DynamisNameProvider.GetPosValName(this.props.posId);
        const distName = DynamisNameProvider.GetDistValName(this.props.distId);
        const rad = this.params.Get("radius","0.5");
        let str:string = `${distName} = min(${distName},length(${posName}) - ${rad});\n`;
        return str;
    };
}
