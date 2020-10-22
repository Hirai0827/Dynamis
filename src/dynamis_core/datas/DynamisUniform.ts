export interface DynamisUniform {
    name:string;
    type:DynamisUniformType;
}
export const GenerateUniformDefinition = (uniforms?:Array<DynamisUniform>) => {
    if(!uniforms){
        return "";
    }
    let str = "";
    uniforms.forEach((uniform,i) => {
        str += `uniform ${uniform.type} ${uniform.name};\n`
    });
    return str;
};
export type DynamisUniformType = "float"|"vec2"|"vec3"|"sampler2D";
