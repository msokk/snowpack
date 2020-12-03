---
layout: layouts/post.njk
title: 'Snowpack v3.0 Release Candidate'
tagline: Another leap forward for frontend development.
description: 'Snowpack v3.0 will release on January 6th, 2021 (the one-year anniversary of its original launch post). This is our biggest release yet with some serious new features, including a new npm package workflow that lets you skip the `npm install` step and load packages on-demand as you need them.'
date: 2020-12-03
bannerImage: '/img/banner-2.jpg'
---

**tl;dr:** Snowpack v3.0 will release on January 6th, 2021 (the one-year anniversary of its original launch post). This is our biggest release yet with some serious new features, including **a new way to load npm packages on-demand** that lets you skip the `npm install` step entirely.

Best of all: it's all available to try today!

## What's New?

Snowpack v3 will focus on the polish & official release of four features already available in the current version of Snowpack (v2.18.0) under their current `experiments` flag:

- `experiments.source`-  Load dependencies on-demand.
- `experiments.optimize` - Built-in bundling, preloading, and asset minifying.
- `experiments.routes` - Advanced config for HTML fallbacks and API proxies.
- `import 'snowpack'` - A brand new JavaScript API for Snowpack integrations.

<!-- ![js api](/img/guides/react/hmr.gif) -->

## New: Streaming ESM Packages

Snowpack has always pushed the limits of frontend development, and this release is no different. Snowpack v3.0 introduces an exciting new feature to speed up & simplify development. We call it: **Streaming ESM Packages.**

Typically, JavaScript dependencies are installed and managed locally by a package manager CLI like `npm`, `yarn` or `pnpm`. Installed packages almost never run directly in the browser. Instead, additional steps are required to process, build and bundle these installed packages so that they can actually run in browser.

**What if we could simplify this? What if Snowpack could skip the "npm install" step entirely and just fetch pre-built packages on-demand via ESM?**

```js
// you do this:
import * as React from 'react';

// but get behavior like this during development:
import * as React from 'https://cdn.skypack.dev/react@17.0.1';
```

That URL above points to [Skypack](https://skypack.dev/), a popular JavaScript CDN that we built to serve every npm package as ESM. Importing dependencies by URL is well supported in Snowpack, Deno, and all major browsers. But writing these URLs directly in your source code isn't ideal and makes development impossible without a network connection. 

**Snowpack v3.0 brings together the best of both worlds:** Get the simplicity of `import 'react'` in your own source code and let Snowpack fetch these dependencies behind the scenes, pre-built and ready to run in the browser. Snowpack caches everything for you, so you can continue to work offline.

This has several benefits over the traditional "npm install" approach:

- **Speed:** Skip the install + build steps for dependencies, and load your dependencies as pre-build ESM code directly from a CDN like Skypack.
- **Safety:** ESM packages are pre-built and never given access to [run code on your machine](https://www.usenix.org/system/files/sec19-zimmermann.pdf). Packages only run in the browser sandbox.
- **Simplicity:** ESM packages are managed by Snowpack, so frontend projects that don't need Node.js (Rails, PHP, etc.) can drop the npm CLI entirely if they choose. 
- **Identical Builds:** When you build your site for production, package code is transpiled with the rest of your site and tree-shaken to your exact imports, resulting in a final build that's nearly identical.

If this all sounds too wild, don't worry. This is **100% opt-in** behavior for those who want it. By default, Snowpack will continue to pull your npm package dependencies out of your project `node_modules` directory like it always has.

We're launching with built-in support for the [Skypack CDN](https://skypack.dev/). In a future release we hope to open this up to custom ESM package sources and CDNs as well.

Check out our guide on [Streaming NPM Packages](/guides/streaming-npm-packages) to learn more about how to enable this new behavior in your project today.

<!-- . 


This workflow comes with a few perks





has always leveraged ESM to push the limits of modern frontend development. 

Web development has been 

ESM has allowed Snowpack to push the limits of modern frontend development. Having a native module system in the browser means that light-weight build like Snowpack can be just as powerful can be and less complex. 

But ESM has another interesting feature that we haven't explored much yet: import  you could move faster with less complex build tooling Snowpack v1 & v2 sped up the development workflow by removing uneccesary work from your 

By leveraging ESM, Snowpack was able to remove unneccesary work (bundling) from your development workflow and deliver a faster .

Snowpack v3.0 offers the chance to remove another unnecessary tool from your frontend workflow: the `npm` CLI itself.

To do this, we're announcing a first-class integration with the Skypack CDN. Skypack is an ESM-first JavaScript CDN, hosting nearly every package on npm as browser-native ESM. Even if a package was originally written for Node.js or some older module format, Skypack does the work for you to optimize and upconvert the package to run directly in the browser.

 -->
![js api](/img/post-snowpackv3-esbuild.png)

## Built-in Optimizations, Powered by esbuild

[esbuild](https://esbuild.github.io/) is a marvel: it performs 100x faster than most other popular bundlers and over 300x faster than Parcel (by esbuilds own benchmarks). esbuild is written in Go, a compiled language that can parallelize heavy bundling workloads where other popular bundlers -- written in JavaScript -- cannot.

Snowpack already uses esbuild internally as our default single-file builder for JavaScript, TypeScript and JSX files. Snowpack v3.0 takes this integration one step further, with a new built-in build optimization pipeline. Bundle, minify, and transpile your site for production in 1/100th of the time of other bundlers.

Snowpack is able to adopt esbuild today thanks to an early bet that we made on the future of bundling: **bundling is a post-build optimization, and not the core foundation that everything is built on top of.** Thanks to this early design decision, esbuild can be plugged in and swapped out of your Snowpack build as easily as any other bundler.

esbuild is still a young project, but it's future looks promising. In the meantime, we will also continue to invest in the existing Webpack & Rollup bundler plugins for a long time to come.

To get started, check out the `experiments.optimize` option in our newest [Optimizing Your Snowpack Build](/guides/optimize-and-bundle) guide. 

![js api](/img/post-snowpackv3-routes.png)


## Routing

Snowpack's new `experiments.routes` configuration lets you define routes that align your dev environment with production. This unlocks some interesting new use-cases, including:

- **API Proxies** - Route all `/api/*` URLs to another URL or localhost port.
- **SPA Fallbacks** - Serve an app shell `index.html` to all requested routes.
- **Faster Site Loads** - Speed up your site and serve different HTML shell files for each route.
- **Island Architecture** - Serve HTML that renders individual components on the page, in parallel. (Made popular by [Jason Miller](https://twitter.com/_developit) in [this blog post](https://jasonformat.com/islands-architecture/)).
- **Mimic Vercel/Netlify** - Re-create your Vercel or Netlify routes in development. Or, create a Snowpack plugin to automatically generate these routes from your `vercel.json` or `_redirects` file at startup.

While API proxying and SPA fallbacks have already been supported in Snowpack for a while now, this brings them all together into a single, expressive new API.


![js api](/img/post-snowpackv3-jsapi.png)

## A New JavaScript API

Snowpack's new JavaScript API grants you more advanced control over Snowpack's dev server and build pipeline, helping you build more powerful integrations on top of Snowpack to unlock new kinds of dev tooling and server-side rendering (SSR) solutions.

The Svelte team recently made news with [SvelteKit](https://svelte.dev/blog/whats-the-deal-with-sveltekit): An official, zero-effort SSR app framework for Svelte apps. SvelteKit is powered internally by Snowpack, using our brand-new JavaScript API to manage your build pipeline and build files on-demand. Snowpack speeds up development and helps to cut SvelteKit's startup time to near-zero.

Check out our new [JavaScript API reference](/reference/javascript-interface) to start building your own custom integrations on top of Snowpack. Or, read through our new guide on [Server-Side Rendering](/guides/server-side-render) to get started with a custom SSR integration for production.

## Installation

You can install the Snowpack v3.0 release candidate today by running:

```
npm install snowpack@next
```
 
Since all v3.0 features already exist in Snowpack today, our existing documentation site applies to both v2 & v3. However, any features under the `experiments` flag may continue to change as we get closer to the official release date. By the end of the year, you can expect that these features will move out from behind the `experiments` flag.

Happy hacking! 