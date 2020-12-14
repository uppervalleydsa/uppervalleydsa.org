## [uppervalleydsa.org](https://uppervalleydsa.org)

Gatsby site for the Upper Valley DSA's home on the web

### Developing

You'll need:

- Node
- Yarn
- `libvips`, for image processing

I recommend developing on a macOS system using Homebrew. You can install and configure these requirements with:

```
brew install node yarn libvips
yarn global install n
n $(cat .node-version)
```

Then install the project's dependencies:

```
yarn
```

and start the local server:

```
yarn start
```
