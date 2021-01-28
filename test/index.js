require("../");
const fs = require("fs");
const modules = fs.readdirSync("./modules");

for (let i = 0, len = modules.length; i < len; i++) {
	let module = require(`./modules/${modules[i]}`);
	module.test();
}