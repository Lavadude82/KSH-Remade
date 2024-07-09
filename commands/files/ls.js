const fs = require("fs");
const cli = require("cli-color");
function main(parameters, env, p, u) { 
    parameters[1] = parameters[1] ?? env.HOME

    function absPath(relDir) {
        if (relDir.startsWith("~")) {
            return env.HOME + relDir.slice(1)
        }
        if (relDir.startsWith("./")) {
            return __dirname + relDir.slice(2)
        }
        return relDir
    }

    let dirFiles = fs.readdirSync(absPath(parameters[1]));
    let string = "";
    let longest = dirFiles.reduce(
        function (a, b) {
            return a.length > b.length ? a : b;
        }
    );
    let per_row = longest / env.COLUMNS
    console.log(per_row)
    let col = 0;

    dirFiles.forEach((e,i) => {
        if(string.length + col > env.columns) return string += "\n"
        if(fs.statSync(parameters[1] + "/" + e).isFile()) return string += `${e} `;
        string += `${cli.blue(e)} `
    });

    console.log(string)
    
}
module.exports = {
    name: "ls",
    main
}