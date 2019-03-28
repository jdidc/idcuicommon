import ExportButton from './exportButton';

const Components = {
  ExportButton
}

const install = function(Vue) {
  Object.keys(Components).forEach(key => {
      Vue.component(key, Components[key]);
  });
};

export default {
  install,
  ...Components,
}