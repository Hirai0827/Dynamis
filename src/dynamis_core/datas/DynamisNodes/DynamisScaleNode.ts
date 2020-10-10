import {IDynamisNode} from "../IDynamisNode";
import {CodeGenerateProps, DynamisNodeParams} from "../DynamisNodeData";
import {DynamisNameProvider} from "../../controllers/DynamisNameProvider";

export class DynamisScaleNode implements IDynamisNode {
    child: Array<IDynamisNode> = new Array<IDynamisNode>();
    generateCode = () => {
        const posName = DynamisNameProvider.GetPosValName(this.props.posId);
        const parentPosName = DynamisNameProvider.GetPosValName(this.parent ? this.parent.props.posId : -1);
        let str = `vec3 ${posName} = ${parentPosName};\n`;
        if(this.params["size"]){
            let scale:string = this.params["size"] ? this.params["size"] : "1.0";
            str += `${posName} = ${parentPosName} / ${scale};\n`;
        }else{
            let x:string = this.params["x"] ? this.params["x"] : "1.0";
            let y:string = this.params["y"] ? this.params["y"] : "1.0";
            let z:string = this.params["z"] ? this.params["z"] : "1.0";
            str += `${posName} = vec3(${parentPosName}.x / ${x},${parentPosName}.y / ${y},${parentPosName}.z / ${z});\n`;
        }
        for(let i = 0; i < this.child.length; i++){
            const codeGenerateResult = this.child[i].generateCode();
            str += codeGenerateResult;
        }
        return str;
    };
    params: DynamisNodeParams = {};
    parent: IDynamisNode | null = null;
    allocateProps: (codeGenerateProps: CodeGenerateProps) => CodeGenerateProps = codeGenerateProps => {
        codeGenerateProps.posId++;
        this.props.posId = codeGenerateProps.posId;
        this.props.distId = this.parent ? this.parent.props.distId : -1;
        for(let i = 0; i < this.child.length; i++){
            codeGenerateProps = this.child[i].allocateProps(codeGenerateProps);
        }
        return codeGenerateProps;
    };
    props: CodeGenerateProps = {posId:-1,distId:-1};


}
