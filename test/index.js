require("../");
const fs = require("fs");

const modules = fs.readdirSync("./test/modules");

for (let i = 0, len = modules.length; i < len; i++) {
	try {
		console.log("---------------" + modules[i]);
		let module = require(`./modules/${modules[i]}`);
		if (module.test) module.test();
	} catch(e) {
		console.log(e);
	}
}