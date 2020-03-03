---
layout: heartbeat
title: Generating docs for your Swift Package and hosting on GitHub Pages
category: Apple
link: https://heartbeat.fritz.ai/generating-docs-for-your-swift-package-and-hosting-on-github-pages-2786b8ce28d
---

Swift Packages are one of the most exciting applications of the Swift programming language. Packages allow for development beyond your usual app — it even works on Linux!

It’s well-known that projects without documentation don’t get the attention they deserve. And rightfully so, because it’s very hard for new “users” (developers who consume your package) to get started with your project if documentation is lacking. However, writing and maintaining documentation is often seen as a boring task. Besides, your documentation will quickly be outdated if you don’t update it.

Luckily, great tools exist to _generate documentation for you_. In this post, I’d like to give you a quick introduction to `jazzy`: a Realm project to automatically generate great documentation pages for your project. And it even works with Objective-C.

We’ll also look at how to host the generated documentation on GitHub Pages, for free! Simply put, a deployed version of your documentation is much better than just sending your users some HTML files.

And as icing on the cake, you’ll also learn how to use GitHub Actions to generate new docs each time you deploy a new version of your package, format your code through SwiftLint, and run your tests. All automated and completely free!