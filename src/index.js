import idcExportButton from './components/idcExportButton';
import Table from './components/Table';

const components = {
    idcTable: Table,
    idcExportButton
};

const IdcUICommon = {
    ...components
};

const install = function(Vue, opts = {}) {
    Object.keys(IdcUICommon).forEach(key => {
        Vue.component(key, IdcUICommon[key]);
    });
};

// auto install
if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
}

const API = {
    version: process.env.VERSION,
    install,
    ...components
};

module.exports.default = module.exports = API;
