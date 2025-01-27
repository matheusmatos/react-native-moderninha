const {
  withProjectBuildGradle,
  withAppBuildGradle,
  createRunOncePlugin,
} = require('@expo/config-plugins');

function addMavenRepository(buildGradle) {
  const mavenRepo = `
        maven { 
            url "https://pagseguro.uol.com.br/maven-repository" 
        }
    `;
  if (!buildGradle.includes(mavenRepo)) {
    return buildGradle.replace(/repositories\s*{[^}]*}/, (match) =>
      match.replace(/repositories\s*{/, `repositories {\n${mavenRepo}`)
    );
  }
  return buildGradle;
}

function addDependency(appBuildGradle) {
  const dependency = `implementation "br.com.uol.pagseguro.plugpagservice.wrapper:wrapper:1.29.2"`;
  if (!appBuildGradle.includes(dependency)) {
    return appBuildGradle.replace(/dependencies\s*{[^}]*}/, (match) =>
      match.replace(/dependencies\s*{/, `dependencies {\n${dependency}`)
    );
  }
  return appBuildGradle;
}

const withReactNativeModerninha = (config) => {
  return (
    withProjectBuildGradle(config, (config) => {
      if (config.modResults.language === 'groovy') {
        config.modResults.contents = addMavenRepository(
          config.modResults.contents
        );
      }
      return config;
    }),
    withAppBuildGradle(config, (config) => {
      if (config.modResults.language === 'groovy') {
        config.modResults.contents = addDependency(config.modResults.contents);
      }
      return config;
    })
  );
};

module.exports = createRunOncePlugin(
  withReactNativeModerninha,
  'react-native-moderninha',
  '1.0.0'
);
