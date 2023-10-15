module.exports = {
  transpilePackages: ['jsxgraph'],
  webpack: (config) => {
    return {
      ...config,
      externals: [...config.externals, 'fs'],
      module: {
        ...config.module,
        rules: [
          ...config.module.rules,
          {
            test: /\.md$/,
            loader: 'emit-file-loader',
            options: {
              name: 'dist/[path][name].[ext]',
            },
          },
          {
            test: /\.md$/,
            loader: 'raw-loader',
          },
        ],
      },
    };
  },
};
