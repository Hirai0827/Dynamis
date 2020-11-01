import {IDynamisNode} from "../IDynamisNode";
import {DynamisNameProvider} from "../../controllers/DynamisNameProvider";
import {CodeGenerateProps, DynamisNodeParams} from "../DynamisNodeData";
import {DynamisMathUtils} from "../DynamisMathUtils";

export class DynamisDonutNode implements IDynamisNode{
    child:Array<IDynamisNode> = new Array<IDynamisNode>();
    parent:IDynamisNode|null = null;
    generateCode = () => {
        const posName = DynamisNameProvider.GetPosValName(this.props.posId);
        const distName = DynamisNameProvider.GetDistValName(this.props.distId);
        let axis = this.params.Get("axis","x");
        axis = DynamisMathUtils.validateAxis(axis) ? axis : "x";
        const plane = DynamisMathUtils.convertAxis2Plane(axis);
        const rad = this.params.Get("radius","0.5");
        const width = this.params.Get("width","0.1");
        let str:string = `${distName} = min(${distName},length(vec2(length(${posName}.${plane})-(${rad}),${posName}.${axis})) - (${width}));\n`;
        return str;
    };
    params: DynamisNodeParams = new DynamisNodeParams();
    allocateProps: (codeGenerateProps: CodeGenerateProps) => CodeGenerateProps = codeGenerateProps => {
        this.props.posId = this.parent ? this.parent.props.posId : -1;
        this.props.distId = this.parent ? this.parent.props.distId : -1;
        for(let i = 0; i < this.child.length; i++){
            codeGenerateProps = this.child[i].allocateProps(codeGenerateProps);
        }
        return codeGenerateProps;
    };
    props: CodeGenerateProps = {posId:-1,distId:-1};
}
