import {DynamisAST} from "../datas/DynamisAST";
import {IDynamisNode} from "../datas/IDynamisNode";

export namespace DynamisASTVisualizer{
    export const Visualize = (ast:DynamisAST) => {

        const str = _visualize(ast,0);
        return str;
    };
    const _visualize = (node:IDynamisNode,depth:number) => {
        let str ="  ".repeat(depth) + "┗ " + node.constructor.name + `(${node.props.posId},${node.props.distId})\n`;
        for(let i = 0; i < node.child.length; i++){
            str += _visualize(node.child[i],depth + 1);
        }
        return str;
    };
}
