exports = module.exports = {
    skip: true,
    test: () => {
        let a = "a";

        console.log(typeIs(a, "string"));
        console.log(typeIs(a, "string", "function"));
        console.log(typeIs(a, "array", "function"));
    }
}