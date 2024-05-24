exports = module.exports = {
    skip: true,
    test: () => {
        console.log(String.upperCamelCase("upper-camel-case"));
        console.log(String.lowerCamelCase(["Lower", "camel", "CASE"]));
    }
};