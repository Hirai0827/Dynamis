import {DynamisCompiler} from "../dynamis_core/controllers/DynamisCompiler";

test("ParseTest",() => {
    let res = DynamisCompiler.Compile("<render>");
    expect(res.state).toBe("failed");
    res = DynamisCompiler.Compile("<render></render>");
    expect(res.state).toBe("success");
    res = DynamisCompiler.Compile("<render></render1>");
    expect(res.state).toBe("failed");
});
