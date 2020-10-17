import {DynamisCompiler} from "../dynamis_core/controllers/DynamisCompiler";

test("ParseTest",() => {
    //開始タグのみ
    let res = DynamisCompiler.Compile("<render>");
    expect(res.state).toBe("failed");
    //タグ不一致
    res = DynamisCompiler.Compile("<render></render1>");
    expect(res.state).toBe("failed");
    //OK
    res = DynamisCompiler.Compile("<render> </render>");
    expect(res.state).toBe("success");
    //空タグになっていない
    res = DynamisCompiler.Compile("<render><sphere></render>");
    expect(res.errorType).toBe("ParseError");
    //OK
    res = DynamisCompiler.Compile("<render><sphere/></render>");
    expect(res.state).toBe("success");
    //存在しないタグ
    res = DynamisCompiler.Compile("<render><hogehoge/></render>");
    expect(res.errorType).toBe("UnexpectedNodeError");
    //OK パラメータ付き
    res = DynamisCompiler.Compile("<render><sphere radius='12.0'/></render>");
    expect(res.state).toBe("success");
    //パラメータ不正
    res = DynamisCompiler.Compile("<render><hogehoge radius='12.0' hoge/></render>");
    expect(res.errorType).toBe("ParseError");
    //非タグの挿入
    res = DynamisCompiler.Compile("<render><sphere/>aaa</render>");
    expect(res.state).toBe("failed");
    //改行の挿入
    res = DynamisCompiler.Compile(`\n<render><sphere/>
</render>`);
    expect(res.state).toBe("success");
    //スペースの挿入
    res = DynamisCompiler.Compile(`<render>   <sphere/>\n</render>`);
    expect(res.state).toBe("success");
    //タブの挿入
    res = DynamisCompiler.Compile(`<render>\t   <sphere/>\n</render>`);
    expect(res.state).toBe("success");
    //OK パラメータ付き
    res = DynamisCompiler.Compile("<render><sphere radius = '12.0'/></render>");
    expect(res.state).toBe("success");
    //OK パラメータ付き
    res = DynamisCompiler.Compile("<render><box x = '12.0' y = '12.0'/></render>");
    expect(res.state).toBe("success");
});
