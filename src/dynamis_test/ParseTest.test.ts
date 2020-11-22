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
});

test("ParseTestWithParams",() => {
    //Paramに関する要素が含まれたテスト
    //OK パラメータ付き
    let res = DynamisCompiler.Compile("<render><sphere radius='12.0'/></render>");
    expect(res.state).toBe("success");
    //パラメータ不正
    res = DynamisCompiler.Compile("<render><sphere radius='12.0' hoge/></render>");
    expect(res.errorType).toBe(null);
    //パラメータ不正
    res = DynamisCompiler.Compile("<render><sphere radius!='12.0'/></render>");
    expect(res.errorType).toBe(null);
    //OK パラメータ付き
    res = DynamisCompiler.Compile("<render><sphere radius = '12.0'/></render>");
    expect(res.state).toBe("success");
    //OK パラメータ付き
    res = DynamisCompiler.Compile("<render><box x = '12.0' y = '12.0'/></render>");
    expect(res.state).toBe("success");
});

test("ParseTestWithNoise",() => {
   //構文には関係ない要素が含まれたテスト
    //非タグの挿入
    let res = DynamisCompiler.Compile("<render><sphere/>aaa</render>");
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
    //コメントの挿入
    res = DynamisCompiler.Compile(`<render>/**/<sphere/></render>`);
    expect(res.state).toBe("success");
    //コメントの挿入
    res = DynamisCompiler.Compile(`<render>/*hogehogehugahuga*/<sphere/></render>`);
    expect(res.state).toBe("success");
    //コメント数不全
    res = DynamisCompiler.Compile(`<render>/*/*hogehogehugahuga*/<sphere/></render>`);
    expect(res.state).toBe("success");
    //コメント数不全
    res = DynamisCompiler.Compile(`<render>/*hogehogehugahuga*/*/<sphere/></render>`);
    expect(res.state).toBe("failed");
    //コメント数不全
    res = DynamisCompiler.Compile(`<render>/*/<sphere/></render>`);
    expect(res.state).toBe("failed");
    //コメントのスラッシュ逆
    //コメント数不全
    res = DynamisCompiler.Compile(`<render>/*/*hogehogehugahuga*/*/<sphere/></render>`);
    expect(res.state).toBe("failed");
    //コメントのスラッシュ逆
    res = DynamisCompiler.Compile(`<render>\**\<sphere/></render>`);
    expect(res.state).toBe("failed");
    //コメント閉じてない
    res = DynamisCompiler.Compile(`<render>\*<sphere/></render>`);
    expect(res.state).toBe("failed");
    //コメント閉じてない
    res = DynamisCompiler.Compile(`<render><sphere/></render>\*`);
    expect(res.state).toBe("failed");
    //コメント閉じてない
    res = DynamisCompiler.Compile(`<render><sphere/></render>*\ `);
    expect(res.state).toBe("failed");
    //Tag in Comment
    res = DynamisCompiler.Compile(`<render><sphere/>\*</render>*\ `);
    expect(res.state).toBe("failed");
    //Comment in Tag
    res = DynamisCompiler.Compile(`<render><sphere/></render\*hoge*\> `);
    expect(res.state).toBe("failed");
});
