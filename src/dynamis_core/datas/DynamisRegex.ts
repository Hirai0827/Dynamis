export class DynamisRegex {
    public static StartTag = new RegExp(/<(?:\s*)((?:\w|\d)+)(?:\s*)(?:(?:\s*)(?:((?:\w|\d)+)(?:\s*)=(?:\s*)((?:"(?:.+?)")|(?:'(?:.+?)'))))*(?:\s*)>/);
    public static EndTag = new RegExp(/<\/(?:\s*)((?:\w|\d)+)(?:\s*)>/);
    public static EmptyTag = new RegExp(/<(?:\s*)((?:\w|\d)+)(?:\s*)(?:(?:\s*)(?:((?:\w|\d)+)(?:\s*)=(?:\s*)((?:"(?:.+?)")|(?:'(?:.+?)'))))*(?:\s*)\/>/);
    public static GeneralRegex = new RegExp(DynamisRegex.StartTag.source+"|"+DynamisRegex.EndTag.source+"|"+DynamisRegex.EmptyTag.source,"g");
    public static CommentOutRegex = new RegExp(/\/\*(?:.*?)\*\//);
    public static OnlyTagCheckRegex = new RegExp("^(?:" + DynamisRegex.GeneralRegex.source+ "|" + DynamisRegex.CommentOutRegex.source + "|\\s|\t|\n)*$");
    public static ParamRegex = new RegExp(/((?:\w|\d)+)(?:\s*)=(?:\s*)((?:'(?:.+?)')|(?:"(?:.+?)"))/g);
}
