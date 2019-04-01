import ExportButton from './exportButton';
import DescriptionList from './DescriptionListV2';
const { Description } = DescriptionList;
const Components = {
  ExportButton,
  DescriptionList,
  Description
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