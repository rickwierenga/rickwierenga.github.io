---
layout: heartbeat
title: Deploying Core ML models using Vapor 
category: Apple
link: https://heartbeat.fritz.ai/deploying-core-ml-models-using-vapor-c562a70b1371 
---

Core ML is Apple’s framework for machine learning. With Core ML, everyone can use machine learning in their apps—as long as that app runs on an Apple platform, and Apple platforms only. Core ML cannot be used with Android, Windows, or on websites. This is very unfortunate because Core ML is such a great piece of technology.

It would be great if we could use Core ML with Python, for example. And as a programmer, you should know that if you want something bad enough, you can make it happen. And that’s what I’m going to show you in this post.

We’ll be building a REST API wrapper around a Core ML model using a new framework called [Vapor](https://vapor.codes/). This API will be running on a remote server, accepting requests _from every platform_. This particular API will classify images, but any Core ML model should do.
Building an API around your Core ML model is not only beneficial when you want your model to work cross platform—even if your app only supports Apple devices, you might still want to consider using this approach over sending a copy of your Core ML model to each individual device.

First, your app size will decrease dramatically — Core ML models can be quite big. Second, you don’t need to update your app every time you improve your model — deploying new models can be done without Apple’s intervention.

I’ll start by introducing some web programming terminology you’ll need to know before writing a web app. Then we’ll write our own web app that uses Core ML in Vapor, because interfacing with Core ML is easiest with Swift, and because Swift is such a nice language to code with. Finally, we’ll also look at how to consume the API in Python.

The final project can be viewed [on my GitHub](https://github.com/rickwierenga/CoreML-API). Don’t forget to leave a ⭐️ ;)
