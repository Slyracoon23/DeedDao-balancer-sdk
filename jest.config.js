module.exports = {
    preset: 'ts-jest',
    testMatch: ['**/?(*.)+(spec|test).[jt]s?(x)'],
    globals: {
        'ts-jest': {
          isolatedModules: true
        }
      },
    verbose: true,
}