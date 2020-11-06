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
        let box:string = `max(max(abs(${posName}.x) - ${x}/2.0,abs(${posName}.y) - ${y}/2.0),abs(${posName}.z) - ${z}/2.0)`;
        let str:string = `${distName} = min(${distName},${box});\n`;
        return str;
    };
}
