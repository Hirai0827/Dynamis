import {DynamisRootNode} from "./DynamisNodes/DynamisRootNode";
import {DynamisRenderNode} from "./DynamisNodes/DynamisRenderNode";
import {DynamisBoxNode} from "./DynamisNodes/DynamisBoxNode";
import {DynamisTranslateNode} from "./DynamisNodes/DynamisTranslateNode";
import {DynamisMinusNode} from "./DynamisNodes/DynamisMinusNode";
import {DynamisRotateNode} from "./DynamisNodes/DynamisRotateNode";
import {DynamisUndefinedNode} from "./DynamisNodes/DynamisUndefinedNode";
import {IDynamisNode} from "./IDynamisNode";
import {DynamisFractNode} from "./DynamisNodes/DynamisFractNode";
import {DynamisSphereNode} from "./DynamisNodes/DynamisSphereNode";
import {DynamisPillarNode} from "./DynamisNodes/DynamisPillarNode";
import {DynamisTwistNode} from "./DynamisNodes/DynamisTwistNode";
import {DynamisAbsNode} from "./DynamisNodes/DynamisAbsNode";
import {DynamisScaleNode} from "./DynamisNodes/DynamisScaleNode";
import {DynamisDonutNode} from "./DynamisNodes/DynamisDonutNode";
import {DynamisPmodNode} from "./DynamisNodes/DynamisPmodNode";

export type DynamisShapeNodeName = "box"|"sphere"|"pillar"|"donut";
export type DynamisTransformNodeName = "translate"|"minus"|"rot"|"fract"|"twist"|"abs"|"scale"|"pmod";
export type DynamisCoreNodeName = "root"|"render";
export type DynamisNodeName = DynamisCoreNodeName|DynamisShapeNodeName|DynamisTransformNodeName;
export const GenerateDynamisNode:(name:DynamisNodeName) => IDynamisNode = (name:DynamisNodeName) => {
    let node:IDynamisNode;
    switch (name) {
        case "root":
            node = new DynamisRootNode();
            break;
        case "render":
            node = new DynamisRenderNode();
            break;
        case "box":
            node = new DynamisBoxNode();
            break;
        case "sphere":
            node = new DynamisSphereNode();
            break;
        case "translate":
            node = new DynamisTranslateNode();
            break;
        case "minus":
            node = new DynamisMinusNode();
            break;
        case "rot":
            node = new DynamisRotateNode();
            break;
        case "fract":
            node = new DynamisFractNode();
            break;
        case "pillar":
            node = new DynamisPillarNode();
            break;
        case "twist":
            node = new DynamisTwistNode();
            break;
        case "abs":
            node = new DynamisAbsNode();
            break;
        case "scale":
            node = new DynamisScaleNode();
            break;
        case "donut":
            node = new DynamisDonutNode();
            break;
        case "pmod":
            node = new DynamisPmodNode();
            break;
        default:
            console.error(name + " is not defined");
            throw new Error("Undefined Node Error");
            node = new DynamisUndefinedNode();
    }
    return node;
};
export type DynamisNodeParams = {[name:string]:string};
export interface CodeGenerateProps {
    posId:number;
    distId:number;
}
export interface CodeGenerateResult {
    result:string;
    updatedProps:CodeGenerateProps;
}
