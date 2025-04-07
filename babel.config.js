module.exports = function(api) {
    api.cache(true);
    return {
        presets: ['module:metro-react-native-babel-preset'],
        plugins: ['react-native-reanimated/plugin'],
      presets: ['babel-preset-expo'],
      plugins: ['react-native-reanimated/plugin'], // 👈 debe ir al final
    };
  };
  