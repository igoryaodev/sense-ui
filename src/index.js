
// const components = [
  
// ]
// const install = function(Vue, opts = {}) {
//   locale.use(opts.locale);
//   locale.i18n(opts.i18n);

//   components.forEach(component => {
//     Vue.component(component.name, component);
//   });

//   Vue.use(Loading.directive);

//   Vue.prototype.$ELEMENT = {
//     size: opts.size || '',
//     zIndex: opts.zIndex || 2000
//   };

//   // Vue.prototype.$loading = Loading.service;

// };

/* istanbul ignore if */
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

module.exports = {
  Test: () => {
    console.log('test')
  }
};

module.exports.default = module.exports;
