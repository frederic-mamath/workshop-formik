module.exports = function(plop) {
  plop.setGenerator('component', {
    description: 'Create a generic component',
    prompts: [
      {
        type: 'confirm',
        name: 'isConnectedToReduxStore',
        message: 'Will the new component be connected to the store ?',
      }, {
        type: 'input',
        name: 'name',
        message: 'What\'s the component\'s name ?'
      }
    ],
    actions: (data) => {
      const actions = [{
        type: 'add',
        path: 'components/{{name}}/{{name}}.scss',
        templateFile: 'plop-templates/component.scss',
      }, {
        type: 'add',
        path: 'components/{{name}}/index.tsx',
        templateFile: 'plop-templates/index.js',
      }];

      if (data.isConnectedToReduxStore) {
        actions.push({
          type: 'add',
          path: 'components/{{name}}/{{name}}.tsx',
          templateFile: 'plop-templates/componentConnectedToRedux.js',
        });
      } else {
        actions.push({
          type: 'add',
          path: 'components/{{name}}/{{name}}.tsx',
          templateFile: 'plop-templates/component.js',
        });
      };

      return actions;
  }});
};
