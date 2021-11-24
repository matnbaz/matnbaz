module.exports = (config, _context) => {
  const tsLoader = config.module.rules.find((r) =>
    r.loader.includes('ts-loader')
  );

  if (tsLoader) {
    tsLoader.options.transpileOnly = false;
    tsLoader.options.getCustomTransformers = (program) => {
      return {
        before: [
          require('@nestjs/graphql/plugin').before(
            {
              introspectComments: true,
              typeFileNameSuffix: [
                '.input.ts',
                '.args.ts',
                '.entity.ts',
                '.model.ts',
                '.payload.ts',
              ],
            },
            program
          ),
        ],
      };
    };
  }

  return config;
};
