import { defineConfig, type OxfmtConfig } from 'oxfmt';

export default defineConfig<OxfmtConfig>({
  printWidth: 80,
  singleQuote: true,
  jsdoc: {
    commentLineStrategy: 'multiline',
  },
  sortImports: {},
  sortPackageJson: {
    sortScripts: true,
  },
});
