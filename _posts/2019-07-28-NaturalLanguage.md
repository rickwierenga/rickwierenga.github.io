---
layout: post
title: Introduction to natural language processing in Swift
category: apple
tags:
- natural language processing
- philosophy
---

As computers get smarter, the communication between machines and humans becomes more of a bottleneck. While humans are socially smarter, computers have surpassed us in many ways in areas like math and science. Perhaps the most important side of this bottleneck is communicating emotions. Although emotions are a fundamental part of human communications, computers often fail to comprehend. Luckily, there are people who are researching ways to use machine learning techniques to help computers understand humans emotions.

One of the best pieces of software available in this field, *natural language processing*, is being actively developed by Apple. This year at WWDC, Apple presented some great advances in their `NaturalLanguage` framework including advancements in how computer interpret human emotions. As with most of Apple’s frameworks, the API is very accessible, regardless of your knowledge of what’s happening under the hood. In this tutorial I’m going to show you what some of the new features are and how you can get started using them in your own projects.

> Note: You’ll need macOS 10.15 Catalina (currently in Beta) to use the new features of this framework.  

## The `NaturalLanguage` framework
The `NaturalLanguage` framework is a relatively new framework, introduced at WWDC 2018. 

The following is a schematic of what the natural language framework looks like. The green boxes are the steps the framework takes when it’s analyzing text.
![Schematic of the natural language framework](/assets/images/naturallanguage.png)

Intelligence includes things like identifying people, objects and places, classifying nouns, verbs, etc. and identifying languages. These categories are called tag schemes in `NaturalLanguage`.

## Building a program that matches an emoji with a paragraph
To demonstrate the capabilities of the framework, we’re building a playground that matches an emoji (😢, 😕, 🙂, 😁, 🤩) with a piece of text.

There are four steps we need to take:
1. Set up a `NLTagger` and specify the tag schemes (of type `NLTagScheme`).
2. Provide a paragraph as input
3. Have the tagger tag an expression using a tag scheme
4. Extract the results

Start by creating a new playground and importing the framework like so:
```swift
import NaturalLanguage
```

We’ll use a custom data type called `Emotion` to represent emotions throughout the playground. I’ll clarify the score in a second. Note that the enum has a [failable initializer](https://docs.swift.org/swift-book/LanguageGuide/Initialization.html#ID225).
```swift
enum Emotion: String {
    case superSad = “😭”
    case sad = “😢”
    case unhappy = “😕”
    case OK = “🙂”
    case happy = “😁”
    case awesome = “🤩”
    
    init?(score: Double) {
        if score < -0.8 {
            self = .superSad
        } else if score < -0.4 {
            self = .sad
        } else if score < 0 {
            self = .unhappy
        } else if score < 0.4 {
            self = .OK
        } else if score < 0.8 {
            self = .happy
        } else if score <= 1 {
            self = .awesome
        } else {
            return nil
        }
    }
}
```

Then write the declaration of the main function:
```swift
func emojiForExpression(_ epxression: String) -> Emotion? {
```

Now we’re able to set up the tagger. We’ll use the `NLTagScheme. sentimentScore` scheme to classify emotions. Because taggers support multiple tag schemes at once, we have to input an array.

```swift
let tagger = NLTagger(tagSchemes: [.sentimentScore])
```

Then we input our expression:
```swift
tagger.string = epxression
```

The tagger will return a sentiment score for the expression in a tuple. The first part is the part we are interested in. Note that we have to specify the tag scheme again, as a single value this time. The reason for this is that taggers, as mentioned before, support multiple tag schemes. Those require multiple API calls like this one. We also convert the sentiment score to a double.

> Note: you have to set the unit to `.paragraph` in order for sentiment analysis to work - even if the input is a sentence. I filed a feedback at FB6840860.  

```swift
if let sentiment = tagger.tag(at: epxression.startIndex, unit: .paragraph, scheme: .sentimentScore).0,
    let score = Double(sentiment.rawValue) {
```

The score will be in the following range $$[-1, 1]$$ where -1 is the saddest and 1 is the happiest. 0 is, naturally, the average value. Because we already wrote the conversation code in the `Emotion` enum, converting the score is easy:
```swift
return Emotion(score: score)
```

Finally, have the function return `nil` in case the user inputs an objective sentence which `NaturalLanguage` often, correctly, assigns the score “Other”.

## Testing the program
The following test cases make it evident that natural language is relatively accurate.
![Schematic of the natural language framework](/assets/images/results.png)

You should definitely try out some of your own sentences.

## A quick philosophical side note
A computer is able to interpret these expressions in a correct manner most of the time. Does it really “feel” what the expressions are like and communicate it back through a number? Or is the number just computed without the computer feeling anything? When humans experience emotions for an expression, do they even feel something or is it an illusion? It’s just neurones firing after all...

One might argue that we are alive and therefore we feel something and the computer is dead so it doesn’t. But if we made  a computer that’s able to perfectly clone your behaviour, will it feel the same as you do?

## Conclusion
Natural language processing is an important area of research for a number of reasons: it makes computers more accessible to older and disabled people because they might be unable to use touch controls.

Once computers are even better at recognizing emotions, they might be able to see relations no human can and therefore provide mental therapy.

Finally, extending the bandwidth of human-machine communication will benefit everyone. Interpreting emotions is just the start!

[Check out the finished playground on GitHub](https://github.com/rickwierenga/NaturalLanuage/)

## Where to go from here
If you want to learn more about natural language processing and the natural language framework check out the following websites:
* [Natural Language Apple Developer Documentation](https://developer.apple.com/documentation/naturallanguage)
* [Introducing Natural Language Framework - WWDC 2018 - Videos - Apple Developer](https://developer.apple.com/videos/play/wwdc2018/713/)
* [Advances in Natural Language Framework - WWDC 2019 - Videos - Apple Developer](https://developer.apple.com/videos/play/wwdc2019/232/)
* [Natural language processing - Wikipedia](https://en.wikipedia.org/wiki/Natural_language_processing)
