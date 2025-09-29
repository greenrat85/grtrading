
module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          root: ['./'],
          extensions: [
            '.ios.ts',
            '.android.ts',
            '.ts',
            '.ios.tsx',
            '.android.tsx',
            '.tsx',
            '.jsx',
            '.js',
            '.json',
          ],
          alias: {
            '@': './',
            '@components': './components',
            '@styles': './styles',
            '@hooks': './hooks',
            '@types': './types',
          },
        },
      ],
      '@babel/plugin-transform-export-namespace-from',
      'react-native-worklets/plugin', // react-native-worklets/plugin must be listed last!
    ],
  };
};
