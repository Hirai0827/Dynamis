import {DynamisCompiler} from "../dynamis_core/controllers/DynamisCompiler";

test("ParseTest",() => {
    //開始タグのみ
    let res = DynamisCompiler.Compile("<render>");
    expect(res.state).toBe("failed");
    //タグ不一致
    res = DynamisCompiler.Compile("<render></render1>");
    expect(res.state).toBe("failed");
    //OK
    res = DynamisCompiler.Compile("<render></render>");
    expect(res.state).toBe("success");
    //空タグになっていない
    res = DynamisCompiler.Compile("<render><sphere></render>");
    expect(res.state).toBe("failed");
    //OK
    res = DynamisCompiler.Compile("<render><sphere/></render>");
    expect(res.state).toBe("success");
    //存在しないタグ
    res = DynamisCompiler.Compile("<render><hogehoge/></render>");
    expect(res.errorType).toBe("UnexpectedNodeError");
});
