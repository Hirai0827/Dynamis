export class DynamisStack{
    elementStack:Array<string>;
    constructor() {
        this.elementStack = new Array<string>();
    }
    public push(str:string){
        this.elementStack.push(str);
    }
    public top(){
        return this.elementStack[this.elementStack.length-1];
    }
    public pop(){
        this.elementStack.pop();
    }
    public getArray(){
        return this.elementStack;
    }
    public empty(){
        return this.elementStack.length == 0;
    }

}
