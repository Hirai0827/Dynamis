import {IDynamisNode} from "../IDynamisNode";
import {FunctionCode} from "../GLSLTempletes/FunctionCode";
import {DynamisNameProvider} from "../../controllers/DynamisNameProvider";
import {CodeGenerateProps, CodeGenerateResult, DynamisNodeParams} from "../DynamisNodeData";
import {DynamisStrVec3} from "../DynamisStrVec3";

export class DynamisRenderNode implements IDynamisNode{
    child:Array<IDynamisNode> = new Array<IDynamisNode>();
    parent:IDynamisNode|null = null;
    generateCode = () => {
        const posName = DynamisNameProvider.GetPosValName(this.props.posId);
        const distName = DynamisNameProvider.GetDistValName(this.props.distId);
        const iter = this.params.Get("iter","128");
        const weight = this.params.Get("weight","0.5");
        let str:string = FunctionCode.getMapPre(distName,posName);
        for(let i = 0; i < this.child.length; i++){
            const codeGenerateResult = this.child[i].generateCode();
            str += codeGenerateResult;
        }
        str += FunctionCode.getMapPost(distName,iter,weight);

        const camera:DynamisStrVec3 = {
            x:this.params.Get("camX","0.0"),
            y:this.params.Get("camY","0.0"),
            z:this.params.Get("camZ","-1.5")
        };
        const rz = this.params.Get("rayZ","1.5");
        const color:DynamisStrVec3 = {
            x:this.params.Get("colX","gl_FragColor.x"),
            y:this.params.Get("colY","gl_FragColor.y"),
            z:this.params.Get("colZ","gl_FragColor.z"),
        }

        str += FunctionCode.getMainFunc(camera,rz,color);
        return str;
    };
    params: DynamisNodeParams = new DynamisNodeParams();
    allocateProps: (codeGenerateProps: CodeGenerateProps) => CodeGenerateProps = codeGenerateProps => {
        this.props.posId = codeGenerateProps.posId;
        this.props.distId = codeGenerateProps.distId;
        for(let i = 0; i < this.child.length; i++){
            codeGenerateProps = this.child[i].allocateProps(codeGenerateProps);
        }
        return codeGenerateProps;
    };
    props: CodeGenerateProps = {posId:-1,distId:-1};
}
