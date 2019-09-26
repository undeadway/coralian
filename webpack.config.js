var path = require("path");

module.exports = {
	entry: {"coralian" : "./src/index.js", "coralian.client" : "./client/index.js"},
	output: {
		path:path.resolve(__dirname ,"dist"),
		filename:"[name].js"
	}
};
