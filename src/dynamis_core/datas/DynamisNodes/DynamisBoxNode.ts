import {IDynamisNode} from "../IDynamisNode";
import {DynamisNameProvider} from "../../controllers/DynamisNameProvider";
import {CodeGenerateProps, CodeGenerateResult, DynamisNodeParams} from "../DynamisNodeData";

export class DynamisBoxNode implements IDynamisNode{
    child:Array<IDynamisNode> = new Array<IDynamisNode>();
    parent:IDynamisNode|null = null;
    generateCode = () => {
        const posName = DynamisNameProvider.GetPosValName(this.props.posId);
        const distName = DynamisNameProvider.GetDistValName(this.props.distId);
        const x = this.params["x"] ? this.params["x"] : "1.0";
        const y = this.params["y"] ? this.params["y"] : "1.0";
        const z = this.params["z"] ? this.params["z"] : "1.0";
        let box:string = `max(max(abs(${posName}.x) - ${x}/2.0,abs(${posName}.y) - ${y}/2.0),abs(${posName}.z) - ${z}/2.0)`;
        let str:string = `${distName} = min(${distName},${box});\n`;
        return str;
    };
    params: DynamisNodeParams = {};
    allocateProps: (codeGenerateProps: CodeGenerateProps) => CodeGenerateProps = codeGenerateProps => {
        this.props.posId = this.parent ? this.parent.props.posId : -1;
        this.props.distId =this.parent ? this.parent.props.distId : -1;
        for(let i = 0; i < this.child.length; i++){
            codeGenerateProps = this.child[i].allocateProps(codeGenerateProps);
        }
        return codeGenerateProps;
    };
    props: CodeGenerateProps = {posId:-1,distId:-1};
}
