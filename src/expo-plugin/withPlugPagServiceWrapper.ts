import {
  type ConfigPlugin,
  withAppBuildGradle,
  withProjectBuildGradle,
} from '@expo/config-plugins';

/**
 * Adds the PagSeguro Maven repository to the app-level build.gradle.
 */
const withPagSeguroMavenRepository: ConfigPlugin = (_config) => {
  return withProjectBuildGradle(_config, (config) => {
    if (config.modResults.language === 'groovy') {
      const mavenRepo = `maven { url 'https://github.com/pagseguro/PlugPagServiceWrapper/raw/master' }`;

      if (!config.modResults.contents.includes(mavenRepo)) {
        config.modResults.contents = config.modResults.contents.replace(
          /allprojects\s*{[^}]*repositories\s*{/,
          (match) => `${match}\n        ${mavenRepo}`
        );
      }
    }
    return config;
  });
};

/**
 * Adds the PlugPagServiceWrapper dependency to the app-level build.gradle.
 */
const withPlugPagServiceImplementation: ConfigPlugin = (_config) => {
  return withAppBuildGradle(_config, (config) => {
    if (config.modResults.language === 'groovy') {
      const plugPagDependency = `implementation 'br.com.uol.pagseguro.plugpagservice.wrapper:wrapper:1.29.5'`;

      if (!config.modResults.contents.includes(plugPagDependency)) {
        config.modResults.contents = config.modResults.contents.replace(
          /dependencies\s*{/,
          `dependencies {\n        ${plugPagDependency}`
        );
      }
    }
    return config;
  });
};

/**
 * Combines all sub-plugins to configure PlugPagServiceWrapper.
 */
const withPlugPagServiceWrapper: ConfigPlugin = (config) => {
  config = withPagSeguroMavenRepository(config);
  config = withPlugPagServiceImplementation(config);
  return config;
};

export default withPlugPagServiceWrapper;
