import { configure } from '@storybook/react';

// automatically import all files ending in *.stories.js
const reqRoutes = require.context('../src/routes', true, /\.stories\.((js|ts)x?)$/);
const reqComponents = require.context('../src/components', true, /\.stories\.((js|ts)x?)$/);
const req = require.context('../stories', true, /.stories.js$/);

function loadStories() {
  reqRoutes.keys().forEach((filename) => reqRoutes(filename));
  reqComponents.keys().forEach((filename) => reqComponents(filename));
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
