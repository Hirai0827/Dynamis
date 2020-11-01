# Dynamis
<a href="https://gyazo.com/e39c7127372229bc5039af9122dbbcb8"><img src="https://i.gyazo.com/e39c7127372229bc5039af9122dbbcb8.png" alt="Image from Gyazo" width="2400"/></a>
<img src="https://img.shields.io/badge/npm-preparing-dddddd.svg?longCache=true">
<img src="https://img.shields.io/badge/yarn-preparing-dddddd.svg?longCache=true">

## About
This is the project which enable us to do raymarching with XML.
<a href="https://gyazo.com/1f8b86fc8cd4f66fbda7ebabaf339a63"><img src="https://i.gyazo.com/1f8b86fc8cd4f66fbda7ebabaf339a63.gif" alt="Image from Gyazo" width="1462.5"/></a>
sandbox - https://dynamis-sample.web.app/
## Feature
- Using XML as Raymarching description language. you can make some shader arts without deep knowledge of math.
- You can make shader art of raymarching with simple geometry and calculation with XML.
- If you write `<box/>`, code about SDF of Box will be automatically generated.
- If you what you feel when use, please access (in this blank, I put sample website)
<a href="https://gyazo.com/f64ebb1b7c213c785c1392ab1569cbf0"><img src="https://i.gyazo.com/f64ebb1b7c213c785c1392ab1569cbf0.gif" alt="Image from Gyazo" width="1460"/></a>
## Contents
- Dynamis_core - the core parts of Dynamis.
- Dynamis_test - the test of Dynamis.
## Usage
Import the package.
```
yarn add https://github.com/Hirai0827/Dynamis
```
Then, compile DynamisCode to GLSL.
```typescript
const res = DynamisCompiler.Compile("<render><sphere></render>");
const generatedGLSL = res.data;

```
## Contact
If you have something about the project please contact us
- Hirai(@lucknknock)
<a href="https://gyazo.com/59f3c7234410054b27441adae39f6dae"><img src="https://i.gyazo.com/59f3c7234410054b27441adae39f6dae.png" alt="Image from Gyazo" width="400"/></a>
