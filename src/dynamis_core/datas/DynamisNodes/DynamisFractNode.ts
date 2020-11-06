import {IDynamisNode} from "../IDynamisNode";
import {CodeGenerateProps, CodeGenerateResult, DynamisNodeParams} from "../DynamisNodeData";
import {DynamisNameProvider} from "../../controllers/DynamisNameProvider";
import {DynamisTransformNode} from "./DynamisTransformNode";

export class DynamisFractNode extends DynamisTransformNode{
    generateCode = () => {
        const posName = DynamisNameProvider.GetPosValName(this.props.posId);
        const parentPosName = DynamisNameProvider.GetPosValName(this.parent ? this.parent.props.posId : -1);
        let str = "";
        if(this.params.Find("size")){
            const cellSize = this.params.Get("size","1.0");
            str += `vec3 ${posName} = (fract(${parentPosName}/${cellSize} + 0.5) - 0.5) * ${cellSize};\n`;
        }else{
            const x = this.params.Get("x","1.0");
            const y = this.params.Get("y","1.0");
            const z = this.params.Get("z","1.0");
            str += `vec3 ${posName} = ${parentPosName};\n`;
            str += `${posName}.x = (fract(${parentPosName}.x/(${x}) + 0.5) - 0.5) * (${x});\n`;
            str += `${posName}.y = (fract(${parentPosName}.y/(${y}) + 0.5) - 0.5) * (${y});\n`;
            str += `${posName}.z = (fract(${parentPosName}.z/(${z}) + 0.5) - 0.5) * (${z});\n`;
        }
        for(let i = 0; i < this.child.length; i++){
            const codeGenerateResult = this.child[i].generateCode();
            str += codeGenerateResult;
        }
        return str;
    };


}
