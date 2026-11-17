const { withProjectBuildGradle } = require('expo/config-plugins');

/**
 * Config plugin untuk memaksa versi transitive dependency Android (seperti Guava)
 * ke versi yang aman dari celah keamanan Snyk pada seluruh sub-project Gradle.
 */
module.exports = function withGradleSecurityFixes(config) {
  return withProjectBuildGradle(config, (config) => {
    if (config.modResults.language === 'groovy') {
      const resolutionBlock = `
allprojects {
    configurations.all {
        resolutionStrategy {
            force "com.google.guava:guava:33.7.2-jre"
        }
    }
}
`;
      if (!config.modResults.contents.includes('com.google.guava:guava:33.7.2-jre')) {
        config.modResults.contents += resolutionBlock;
      }
    }
    return config;
  });
};

