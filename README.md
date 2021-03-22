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

Le me (@bjacobel) know if you experience any installation errors with `libvips` or `sharp` - I have had intermittent issues with this component.

To test and develop some features locally you may need to add some environment variables. A list of current environment variables can be found in `.env.example`. To use variables, copy this file to `.env.development` and provide appropriate values. _Do not commit this file to source control._
