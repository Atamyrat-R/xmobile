module.exports = {
  // Type check TypeScript files in /apps/api
  "./apps/api/**/*.(ts|tsx)": () =>
    "yarn tsc --noEmit --pretty -p ./apps/api/tsconfig.json",

  // Type check TypeScript files in /apps/web
  "./apps/web/**/*.(ts|tsx)": () =>
    "yarn tsc --noEmit --pretty -p ./apps/web/tsconfig.json",

  // Lint & Prettify TS and JS files
  "**/*.(ts|tsx|js)": (filenames) => [
    `yarn eslint ${filenames.join(" ")}`,
    `yarn prettier --write ${filenames.join(" ")}`,
  ],

  // Prettify only Markdown and JSON files
  "**/*.(md|json)": (filenames) =>
    `yarn prettier --write ${filenames.join(" ")}`,
};
