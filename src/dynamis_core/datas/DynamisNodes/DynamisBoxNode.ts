import {IDynamisNode} from "../IDynamisNode";
import {DynamisNameProvider} from "../../controllers/DynamisNameProvider";
import {CodeGenerateProps, CodeGenerateResult, DynamisNodeParams} from "../DynamisNodeData";
import {DynamisShapeNode} from "./DynamisShapeNode";

export class DynamisBoxNode extends DynamisShapeNode{
    generateCode = () => {
        const posName = DynamisNameProvider.GetPosValName(this.props.posId);
        const distName = DynamisNameProvider.GetDistValName(this.props.distId);
        const x = this.params.Get("x","1.0");
        const y = this.params.Get("y","1.0");
        const z = this.params.Get("z","1.0");
        const offsetX = this.params.Get("offX","0.0");
        const offsetY = this.params.Get("offY","0.0");
        const offsetZ = this.params.Get("offZ","0.0");
        let box:string = `max(max(abs(${posName}.x - (${offsetX})) - ${x}/2.0,abs(${posName}.y - (${offsetY})) - ${y}/2.0),abs(${posName}.z - (${offsetZ})) - ${z}/2.0)`;
        let str:string = `${distName} = min(${distName},${box});\n`;
        return str;
    };
}
