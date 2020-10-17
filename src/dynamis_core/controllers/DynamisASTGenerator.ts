import {DynamisStack} from "../datas/DynamisStack";
import {DynamisTagType} from "../datas/DynamisTagType";
import {DynamisRegex} from "../datas/DynamisRegex";
import {DynamisRootNode} from "../datas/DynamisNodes/DynamisRootNode";
import {DynamisNodeGenerator} from "./DynamisNodeGenerator";
import {IDynamisNode} from "../datas/IDynamisNode";

export class DynamisASTGenerator {
    public static Generate:(source:Array<string>) => IDynamisNode = (source:Array<string>) => {
        const dynamisStack = new DynamisStack();
        const dynamisRootNode = new DynamisRootNode();
        let currentNode:IDynamisNode = dynamisRootNode;
        for(let i = 0; i < source.length; i++){
            const currentStr = source[i];
            const tagType:DynamisTagType = DynamisTagType.getTagType(currentStr);
            //console.log( i.toString()+":"+tagType);
            let data:RegExpMatchArray;
            let node:IDynamisNode;
            switch (tagType) {
                case "StartTag":
                    data = currentStr.match(DynamisRegex.StartTag) as RegExpMatchArray;
                    node = DynamisNodeGenerator.GenerateFromRegRes(data);
                    dynamisStack.push(data[1]);
                    node.parent = currentNode;
                    currentNode.child.push(node);
                    currentNode = node;
                    break;
                case "EmptyTag":
                    data = currentStr.match(DynamisRegex.EmptyTag) as RegExpMatchArray;
                    node = DynamisNodeGenerator.GenerateFromRegRes(data);
                    node.parent = currentNode;
                    currentNode.child.push(node);
                    break;
                case "EndTag":
                    data = currentStr.match(DynamisRegex.EndTag) as RegExpMatchArray;
                    currentNode = currentNode.parent ? currentNode.parent : currentNode;
                    if(data[1] == dynamisStack.top()){
                        dynamisStack.pop();
                    }else{
                        console.error("Syntax Error");
                        throw Error("Syntax Error");
                    }
                    break;
            }
        }
        if(!dynamisStack.empty()){
            console.error("Syntax Error");
            throw Error("Syntax Error");
        }
        return dynamisRootNode;
    }
}
