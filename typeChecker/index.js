export default (command, args, timeout) => {

    if(typeof command !== "string") throw Error("Command should be string");

    if(!(args instanceof Array)) throw Error("Args should be array");

    for(let arg of args) if(typeof arg !== "string") throw Error(" Args should be array of strings");

    if(typeof timeout !== "number") throw Error("Timeout should be number");
    
  }