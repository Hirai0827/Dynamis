import {DynamisCompiler} from "../dynamis_core/controllers/DynamisCompiler";
import {DynamisASTVisualizer} from "../dynamis_core/debug/DynamisASTVisualizer";
import {DynamisAST} from "../dynamis_core/datas/DynamisAST";

test('SpeedTest',() => {
    let code = `<render camZ="time" camX="0.5" camY="0.5">
    <fract>
        <box x="0.25" y="0.25" z="0.25"/>
        <abs axis="xyz">
            <translate x="0.1" y="0.1">
            <box x="0.025"z="1.0"y="0.025"/>
            </translate>
        </abs>
    </fract>
    <pillar a/>
</render>        
 `;
    let startTime = performance.now();
    let res = DynamisCompiler.Compile(code);
    console.log(DynamisASTVisualizer.Visualize(res.ast as DynamisAST));
    let endTime = performance.now();
    expect(res.state).toBe("success");
    expect(endTime - startTime).toBeLessThan(1000);
});
