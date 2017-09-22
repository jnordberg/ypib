
ypib
====

**y**arn **p**ost**i**nstall **b**uild, like [postinstall-build](https://github.com/exogen/postinstall-build) but with yarn.

Usage
-----

In your package.json

```json
{
  "scripts": {
    "build": "<something that builds lib>",
    "postinstall": "ypib lib"
  },
}
```

---

***DON'T RELY SOLELY ON THIS MODULE -- ALWAYS PUBLISH YOUR BUILD ARTIFACTS TO NPM***

