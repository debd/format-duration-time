echo "//registry.npmjs.org/:_authToken=$NPM_AUTH" > ~/.npmrc
npm run build
npm publish