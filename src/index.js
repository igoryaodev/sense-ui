import XInput from './common/XInput'

const components = [
  XInput
]
// debugger
const install = function(Vue, opts = {}) {
  // locale.use(opts.locale);
  // locale.i18n(opts.i18n);

  components.forEach(component => {
    Vue.component(component.name, component);
  });

  // Vue.use(Loading.directive);

  // Vue.prototype.$ELEMENT = {
  //   size: opts.size || '',
  //   zIndex: opts.zIndex || 2000
  // };

  // Vue.prototype.$loading = Loading.service;

};

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

const SenseUI = {}
components.forEach(v => SenseUI[v.name] = v)

export default SenseUI

// module.exports = SenseUI
// module.exports.default = module.exports;