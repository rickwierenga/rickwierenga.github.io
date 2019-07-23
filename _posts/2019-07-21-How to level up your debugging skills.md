---
layout: post
title: How to level up your debugging skills 
category: apple
tags:
- debugging
---

Debugging is a crucial skill for every developer. Although debugging can be hard and frustrating, it can also be a lot of fun to track down the problems. Either way, Apple has done a great job at making debugging as fun and convenient as possible with some handy tools.

The thing most people do first when they get an error is adding print statements everywhere. There are two main reasons for this: (1) print statements can provide information about the current state of the application, and (2) print statements give insight into the order of execution. Great, right? Well, they work ok but there are better tools to get this information. Breakpoints are a great example of that.

## Understanding the execution order

Adding breakpoints is easy, just click the line number in Xcode, and voilà there’s your breakpoint. When you rerun your program, Xcode will stop at the breakpoint. This might seem insignificant, or even worse than print statements, but there’s more to breakpoints. Xcode brings you right the to file and line where the breakpoint is, something I’ve found incredibly useful.

Instead of clicking ![](/assets/images/continue.png){:class="inline"} to continue the execution right where it left off, you can also use ![](/assets/images/stepover.png){:class="inline"} to execution only the following line. Something that’s very powerful considering the next few tips.

## Getting insight into the state of your application at any point

Breakpoints allow you to take a look at the current state of your application. Where print statements only print out some information, often in an unorganised fashion, breakpoints allow you to take a look at every variable in memory. In the bottom right of the debugger, click ![](/assets/images/variableview.png){:class="inline"} to open the ‘Variables View’. Only after you try this will you realise how incredible this feature is.

## Exception breakpoints

Adding breakpoints manually is already much better than print statements, but it gets a lot better with xxception breakpoints. Those stop the execution right before an error occurs. When the application crashes, Xcode will very often print out some unreadable error message and bring you to `class AppDelegate: UIResponder, UIApplicationDelegate {` which is very annoying, to say the least. Exception breakpoints change that. They provide all the same benefits as normal breakpoint right at the most crucial point.

Adding an exception breakpoint is easy. Open the breakpoint inspector using ⌘8 and press + in the bottom left corner. Choose exception breakpoint.

![](/assets/images/exceptionbreakpoint.png)

If examining the state of the program doesn’t help, you can press the continue execution button to have the program crash so you can take a look at the error message. 

## Some handy keyboard shortcuts
- `⌘\`: Add a breakpoint to the current line.
- `F6`: Step over (continue to the next line).
- `⌘Y`: Enable/disable all breakpoints.

## Conclusion
As we’ve seen in this tutorial, there’s a simpler yet more sophisticated to use breakpoints instead of print statements to debug your apps. I hope this will help you debug your apps faster and more effortlessly. 
