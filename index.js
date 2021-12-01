const StyleDictionary = require("style-dictionary");

StyleDictionary.registerTransform({
  name: "sizes/px",
  type: "value",
  matcher: function (prop) {
    const isMatch = [
      "fontSizes",
      "spacing",
      "borderRadius",
      "borderWidth",
      "sizing",
    ].includes(prop.type);

    return isMatch;
  },
  transformer: function (prop) {
    return parseFloat(prop.original.value) + "px";
  },
});

const getStyleDictionaryConfig = (theme) => {
  return {
    source: [`style-dictionary/input/${theme}.json`],
    platforms: {
      web: {
        transforms: ["attribute/cti", "name/cti/kebab", "sizes/px"],
        buildPath: `build/`,
        files: [
          {
            destination: `variables-${theme}.css`,
            format: "css/variables",
          },
        ],
      },
    },
  };
};

["base", "light"].forEach((theme) => {
  StyleDictionary.extend(getStyleDictionaryConfig(theme)).buildAllPlatforms();
});
