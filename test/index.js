require("../");
const fs = require("fs");

const modules = fs.readdirSync("./test/modules");

modules.map(module => {
	try {
		console.log("---------------" + module);
		let instance = require(`./modules/${module}`);
		if (instance.test) instance.test();
	} catch(e) {
		console.log(e);
	}
});