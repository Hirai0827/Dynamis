import {DynamisCompileOption} from "../DynamisCompileOption";
import {GenerateUniformDefinition} from "../DynamisUniform";

export namespace RootCode{
    export const GetRootPre = (options?:DynamisCompileOption) => {
        if(options){
            return `precision highp float;
${`uniform vec3 resolution;
uniform float time;
`+GenerateUniformDefinition(options.uniforms)}
`;
        }else{
            return `precision highp float;
uniform vec3 resolution;
uniform float time;
`;
        }
    };
    export const GetRootPost = () => {
        return ``;
    }
}
