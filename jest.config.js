module.exports = {
    setupFilesAfterEnv: ["./jest.setup.js"],
    moduleNameMapper: {
        "^@components(.*)$": "<rootDir>/components$1"
    },
    moduleDirectories: ['node_modules', '<rootDir>']
};