import Vue from 'vue';

const requireComponent = require.context('./', true, /\.vue$/);
requireComponent.keys().forEach((fileName: string) => {
  const componentConfig: any = requireComponent(fileName);
  const componentName: string = fileName.replace(/(\.\/|\S*\/|\.vue)/g, '');
  Vue.component(componentName, componentConfig.default || componentConfig);
});