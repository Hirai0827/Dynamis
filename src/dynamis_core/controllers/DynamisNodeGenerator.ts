import {IDynamisNode} from "../datas/IDynamisNode";
import {DynamisRegex} from "../datas/DynamisRegex";
import {DynamisNodeName, DynamisNodeParams, GenerateDynamisNode} from "../datas/DynamisNodeData";

export class DynamisNodeGenerator {
    public static GenerateFromRegRes:(data:RegExpMatchArray) => IDynamisNode = (data:RegExpMatchArray) => {
        const name:DynamisNodeName = data[1] as DynamisNodeName;
        let params:DynamisNodeParams = {};

        const src:string = data[0];
        const paramRegex = DynamisRegex.ParamRegex;
        while(true){
            const res = paramRegex.exec(src);
            if(res){
                params[res[1]] = res[2].substring(1,res[2].length-1);
            }else{
                break;
            }
        }
        let node:IDynamisNode = GenerateDynamisNode(name);
        node.params = params;
        node.props = {posId:-1,distId:-1};
        return node;
    }
}
