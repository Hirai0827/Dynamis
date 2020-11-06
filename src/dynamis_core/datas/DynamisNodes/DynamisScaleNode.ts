import {IDynamisNode} from "../IDynamisNode";
import {CodeGenerateProps, DynamisNodeParams} from "../DynamisNodeData";
import {DynamisNameProvider} from "../../controllers/DynamisNameProvider";
import {DynamisTransformNode} from "./DynamisTransformNode";

export class DynamisScaleNode extends DynamisTransformNode {
    generateCode = () => {
        const posName = DynamisNameProvider.GetPosValName(this.props.posId);
        const parentPosName = DynamisNameProvider.GetPosValName(this.parent ? this.parent.props.posId : -1);
        let str = `vec3 ${posName} = ${parentPosName};\n`;
        if(this.params.Find("size")){
            let scale:string = this.params.Get("size","1.0");
            str += `${posName} = ${parentPosName} / ${scale};\n`;
        }else{
            let x:string = this.params.Get("x","1.0");
            let y:string = this.params.Get("y","1.0");
            let z:string = this.params.Get("z","1.0");
            str += `${posName} = vec3(${parentPosName}.x / (${x}),${parentPosName}.y / (${y}),${parentPosName}.z / (${z}));\n`;
        }
        for(let i = 0; i < this.child.length; i++){
            const codeGenerateResult = this.child[i].generateCode();
            str += codeGenerateResult;
        }
        return str;
    };


}
