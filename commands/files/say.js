function main(parameters,env){
console.log(parameters.splice(1,parameters.length).join(" "));
}
module.exports = {
    name:"say",
    main
}