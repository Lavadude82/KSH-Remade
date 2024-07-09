//Imports
const cli = require("cli-color");
const rls = require("readline-sync");
const fs = require("fs");
const utils = require("./utils.js"); // Custom Utils (functions)
var config = require("../config/ksh.json");//Configuration

//initial variables
var user = process.env.USER
var path = process.env.PWD ?? process.env.HOME
var commands = {}

//integrated functions
async function scan(directory){
    fs.readdirSync(directory).forEach(async(e,i) => {
        if(!e.endsWith(".js") && !e.endsWith(".ts")) return;
       let tmp = require(`${directory}/${e}`);
       commands[tmp.name] = tmp.main
    });
}

//scan for commands
scan("/opt/KSH/commands/files/")

//Begin Loop
setInterval(async()=>{

//get input
let cmd = rls.question(`[${utils.MaxString(path,15,true)}] ${user} ${config.decoration} `)
let parameters = cmd.split(" ");
if(cmd == "") return;
if(!Object.keys(commands).includes(parameters[0])) return console.log(`Command '${parameters[0]}' not found.`)
    commands[parameters[0]](parameters,process.env,path,user);
})


