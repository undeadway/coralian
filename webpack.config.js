var path = require("path");

module.exports = {
	entry: { "coralian": "./coralian/index.js", "coralian.client": "./client/index.js" },
	output: {
		path: path.resolve(__dirname, "dist"),
		filename: "[name].js"
	},
	mode: 'development'
};