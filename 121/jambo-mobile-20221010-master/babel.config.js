module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      "module-resolver",
      {
        alias: {
          // This needs to be mirrored in tsconfig.json
          components: "./src/components",
          pages: "./src/pages",
          store: "./src/store",
          src: "./src"
        },
      },
    ],
  ],
};
