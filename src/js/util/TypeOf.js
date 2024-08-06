export default class TypeOf {
    static NUMBER = "number";
    static BIGINT = "bigint";
    static STRING = "string";
    static BOOLEAN = "boolean";
    static SYMBOL = "symbol";
    static FUNCTION = "function";
    static OBJECT = "object";
    static UNDEFINED = "undefined";
    //This looks weird, but typeof(null) returns object
    static NULL = TypeOf.OBJECT;

    getClass(object) { 
        return object.constructor;
    }
}