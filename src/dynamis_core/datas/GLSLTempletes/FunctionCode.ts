import {DynamisStrVec3} from "../DynamisStrVec3";

export namespace FunctionCode{
    export const getMapPre = (distName:string,posName:string) => {
        return `float map(vec3 ${posName}){
float ${distName} = 10000000.0;
`;
    };
    export const getMapPost = (distName:string) => {
        return `return ${distName};
}

vec3 getNormal(vec3 p)
{ 
    float d = map(p); // Distance
    vec2 e = vec2(.01,0); // Epsilon
    vec3 n = d - vec3(
    map(p-e.xyy),  
    map(p-e.yxy),
    map(p-e.yyx));
   
    return normalize(n);
}

vec4 trace(vec3 c,vec3 r){
    float t = 0.0;
    for(int i = 0; i < 128; i++){
        vec3 p = c + r * t;
       t += map(p) * 0.5;
    }
    vec4 q = vec4(getNormal(c + r * t),t);
    return q;
}
`;
    };
    export const getMainFunc = (c:DynamisStrVec3,rz:string,color:DynamisStrVec3) => {
     return `

void main() {
    vec2 uv = (gl_FragCoord.xy * 2.0 - resolution.xy) / min(resolution.x, resolution.y);
    vec3 c = vec3(${c.x},${c.y},${c.z});
    vec3 r = normalize(vec3(uv,${rz}));
    vec4 t = trace(c,r);
    float d = t.w;
    vec3 n = t.xyz;
    float v = 1.0/(1.0 + t.w * t.w * 0.2);
    gl_FragColor = vec4(vec3(1.0 - dot(n,r) * dot(n,r))/(1.0 + d * d * 0.1), 1.0);
    gl_FragColor.x = ${color.x};
    gl_FragColor.y = ${color.y};
    gl_FragColor.z = ${color.z};
    gl_FragColor.w = 1.0;
}`
    }
}
