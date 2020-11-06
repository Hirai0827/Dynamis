import {IDynamisNode} from "../IDynamisNode";
import {DynamisNameProvider} from "../../controllers/DynamisNameProvider";
import {CodeGenerateProps, CodeGenerateResult, DynamisNodeParams} from "../DynamisNodeData";
import {DynamisShapeNode} from "./DynamisShapeNode";

export class DynamisSphereNode extends DynamisShapeNode{
    generateCode = () => {
        const posName = DynamisNameProvider.GetPosValName(this.props.posId);
        const distName = DynamisNameProvider.GetDistValName(this.props.distId);
        const rad = this.params.Get("radius","0.5");
        const offX = this.params.Get("offX","0.0");
        const offY = this.params.Get("offY","0.0");
        const offZ = this.params.Get("offZ","0.0");
        let str:string = `${distName} = min(${distName},length(${posName} - vec3(${offX},${offY},${offZ})) - ${rad});\n`;
        return str;
    };
}
