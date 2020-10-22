import {DynamisCompiler} from "../dynamis_core/controllers/DynamisCompiler";
type CompileResult = "success"|"failed"|"no_context"|"no_shader";
const CompileForTest:(src:string) => CompileResult = (src) => {
    const headlessGl = require("gl");
    const gl = headlessGl(200, 200, { preserveDrawingBuffer: true });
    //console.log(canvas);
    if(gl){
        let tmp_s = gl.createShader(gl.FRAGMENT_SHADER);
        if(tmp_s){
            gl.shaderSource(tmp_s, src);
            gl.compileShader(tmp_s);
            var status = gl.getShaderInfoLog(tmp_s);
            if(status?.length == 0){
                return "success";
            }else{
                console.error(status);
                return "failed"
            }
        }else{
            return "no_shader"
        }
    }else{
        return "no_context";
    }
};

test("CompileTest",() => {
    //開始タグのみ


    expect(CompileForTest("111")).toBe("failed");
    //構造不良
    let res = DynamisCompiler.Compile("<box/>",{uniforms:[{name:"hoge",type:"float"}]});
    expect(CompileForTest(res.data)).toBe("failed");
    //最小構成
    res = DynamisCompiler.Compile("<render></render>");
    expect(CompileForTest(res.data)).toBe("success");
    //最小構成(変なUniform追加)
    res = DynamisCompiler.Compile("<render></render>",{uniforms:[{name:"hoge",type:"float"}]});
    expect(CompileForTest(res.data)).toBe("success");
    res = DynamisCompiler.Compile("<render><box/></render>");
    expect(CompileForTest(res.data)).toBe("success");
    res = DynamisCompiler.Compile("<render><sphere/></render>");
    expect(CompileForTest(res.data)).toBe("success");
    res = DynamisCompiler.Compile("<render><pillar/></render>");
    expect(CompileForTest(res.data)).toBe("success");
    res = DynamisCompiler.Compile("<render><donut/></render>");
    expect(CompileForTest(res.data)).toBe("success");
    res = DynamisCompiler.Compile("<render><fract><box/></fract></render>");
    expect(CompileForTest(res.data)).toBe("success");
    res = DynamisCompiler.Compile("<render><abs><box/></abs></render>");
    expect(CompileForTest(res.data)).toBe("success");
    res = DynamisCompiler.Compile("<render><translate><box/></translate></render>");
    expect(CompileForTest(res.data)).toBe("success");
    res = DynamisCompiler.Compile("<render><rot><box/></rot></render>");
    expect(CompileForTest(res.data)).toBe("success");
    res = DynamisCompiler.Compile("<render><twist><box/></twist></render>");
    expect(CompileForTest(res.data)).toBe("success");
    res = DynamisCompiler.Compile("<render><pmod><box/></pmod></render>");
    expect(CompileForTest(res.data)).toBe("success");
    res = DynamisCompiler.Compile("<render><scale><box/></scale></render>");
    expect(CompileForTest(res.data)).toBe("success");
    res = DynamisCompiler.Compile("<render><minus><box/></minus></render>");
    expect(CompileForTest(res.data)).toBe("success");
});
