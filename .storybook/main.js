module.exports = {
  stories: [
    "../src/**/*.stories.mdx",
    "../src/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
     "storybook-css-modules-preset"
  ],
  framework: "@storybook/react",
  webpackFinal: async (config) => {
    config.module.rules[0].exclude = /node_modules\/(?!(@react-leaflet|react-leaflet)\/).*/;

    return config;
  },
}