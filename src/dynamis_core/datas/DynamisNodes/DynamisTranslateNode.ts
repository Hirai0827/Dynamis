import {IDynamisNode} from "../IDynamisNode";
import {CodeGenerateProps, CodeGenerateResult, DynamisNodeParams} from "../DynamisNodeData";
import {DynamisNameProvider} from "../../controllers/DynamisNameProvider";
import {DynamisTransformNode} from "./DynamisTransformNode";

export class DynamisTranslateNode extends DynamisTransformNode {
    generateCode = () => {
        const posName = DynamisNameProvider.GetPosValName(this.props.posId);
        const parentPosName = DynamisNameProvider.GetPosValName(this.parent ? this.parent.props.posId : -1);
        const x = this.params.Get("x","0.0");
        const y = this.params.Get("y","0.0");
        const z = this.params.Get("z","0.0");
        let str = `vec3 ${posName} = ${parentPosName} - vec3(${x},${y},${z});\n`;
        for(let i = 0; i < this.child.length; i++){
            const codeGenerateResult = this.child[i].generateCode();
            str += codeGenerateResult;
        }
        return str;
    };


}
