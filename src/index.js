import idcExportButton from './components/idcExportButton';
import idcExportTable from './components/idcExportTable';
import testButton from './components/testButton';

const components = {
    testButton,
    idcTable: idcExportTable,
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
