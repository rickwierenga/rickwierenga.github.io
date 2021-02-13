---
layout: post
title: "EI: Ethical Intelligence (Philosophy Olympiad)"
category: philosophy
---

Last week I had the pleasure to take part in the national Philosophy Olympiad and write an essay discussing one of 4 quotes. I am proud that my essay on ethical artificial intelligence was selected by the judges as the best essay. I have pasted my essay with some very minor typo fixes below. I should note that we had only three hours to write the essay, so in retrospect I would have done a few things differently.

First, I would like to thank the [Nederlandse Filosofie Olympiade](https://filosofieolympiade.nl) for organizing this event, and, above all, mr. Bahorie, my philosophy teacher.

---

> “People say, oh, we need to make ethical AI. What nonsense. Humans still have the monopoly on evil. The problem is not AI. The problem is humans using new technologies to harm other humans.”

―Garry Kasparov. In: Will Knight, Defeated Chess Champ Garry Kasparov Has Made Peace With AI. Wired Magazine, 2020.

## §1 Introduction

In his quote, Garry Kasparov claims we (society) ought not to worry about artificial intelligence (“AI”) because it is solely us who control the evil. In this essay I will argue that hidden in this claim is the exact reason why we should, no, even have to, worry about artificial intelligence.

Upon reading this quote by Kasparov, I immediately remembered one of the most frightening experiences I have had in my own work in AI. A few years ago, I was just starting to learn about AI and decided it would be cool if I could make a robot that automatically figured out what the quickest path through a maze would be. I quickly wrote a maze app and then built a self-learning AI (which should not be considered sophisticated in any way). I let the AI do its thing and after just a couple of seconds, astonishing results presented themselves--the robot could solve the maze in just a handful of moves while the theoretical limit should be at least in the hundreds. Upon investigation, I discovered my maze code had a critical bug, allowing the robot to skip parts of the grid entirely. This was scary: I had written the maze code as well as the AI from scratch myself and the AI found a bug in just a couple of seconds. In a sense, my own AI became smarter than me. Of course, this project was just an experiment and real world systems are more well-tested, right? Someone who thinks about ‘well-tested’ misses the point: AI--especially much more sophisticated AIs than mine, like the one that defeated Kasparov at chess--can do things it was not explicitly programmed to do, and worse, it might even do things its creators did not even imagine.

I will start by giving a bird’s eye view of the field of artificial intelligence. Then I will explain how it follows that AI is unlike any technology humanity has ever seen. Next, I will move on to discuss Aristotle’s and Kant’s view on ethics. Finally, I will conclude by applying their philosophies to Kasparov’s claim and AI in general to show how AI is, in fact, a threat to humanity.

## §2 A quick inquiry into the world of artificial intelligence

In this section, I will give a quick overview of artificial intelligence and highlight some concepts I think are of importance in this essay.

There are two main approaches to AI: expert systems and learning systems. Expert systems are huge databases containing thousands of human-defined rules and facts. A search algorithm combines these facts and rules into what would be the best answer to a question, where ‘best’ is, again, based on a set of human-defined criteria. It should be intuitive that these systems will never outperform human intellect.

Personally, I would argue only so-called “learning systems” can be considered “artificially intelligent.” Such a system makes an observation about the world, takes an action, and observes the results of that action. Based on whether the results are in correspondence with some predefined ‘objective’, the AI knows whether the underlying action was “good” or “bad” and updates its systems accordingly, getting better continuously<sup>1</sup>. In other words, the concept of “machine learning” can be understood as a computer optimizing some ‘objective.’ Finally, learning systems have two interesting properties: 1) theoretically they can get infinitely--most definitely superhuman--good at any particular task (where a task can be quite complex like “drive a car” or “write a book”) and 2) humans have no way to interpret the way these systems reach conclusions <sup>2</sup>.

For the rest of this essay, I will use “AI” to refer specifically to the learning systems.

## §3 Weaponizing technology

I will make a quick note on AI versus other kinds of technology. While it is true that technology has been very destructive when used as a weapon, just the Manhattan Project alone speaks volumes, AI is fundamentally different. Where every weapon up until this point has required human supervision, or at least its use required human initiation, AI can operate independently. Furthermore, because learning systems can quickly outlearn humans, it is impossible for us to even understand AI the way we understand everything else we build.

## §4 Kant, Aristotle and intrinsic human ethics

In this section I will clarify the positions of Kant and Aristotle and how their philosophies demonstrate ethics are unique to humankind.

Aristotle talks about ethics in terms of “arete”, or virtues--certain positive qualities, or traits, which can be considered the driving force behind “good” actions. A virtuous person is led by their virtues, hence making the “right” choices and doing “good” things, as their actions are in harmony with the virtues. This philosophy assumes the idea of humans as _animale rationale_, rational animals, who can make rational decisions about whether an action is good or bad judging by the relevant virtues. Animals lack these virtues and can therefore be good nor evil.

Immanuel Kant argued that the only unquestionably good virtue is what he calls the “good will”, because other virtues could be misused to do bad things. After all, what good is loyalty if one is loyal to a bad king? According to Kant, actions stemming from the good will are considered to be “good.” Humans, then, should use ‘reason’ to determine whether their actions correspond with the good will to determine whether or not they are morally right. This is possible because where animals act based on instincts, humans actions stem from reason, referring to the _animale rationale_ again. Kant noticed that different motivations, maybe even just pure randomness, might lead to the exact same outcome as actions that were carefully examined. While they should be appreciated, Kant says they are not necessarily “good” actions because they have no foundation in the good will. It then follows that unlike humans, animals, which act solely based on their instincts and they lack reason, cannot reason about the ethics of their actions nor be held responsible for them.

## §5 - Applying Aristotle’s and Kant’s ethics to Kasparov’s claims

Aristotle’s and Kant’s ethics reveal some interesting truths about the claims and their underlying assumptions in Kaspraov’s claim, which I will discuss next.

Just like animals, which act solely based on their innate instincts, artificially intelligent computers lack reason as well as virtues. Consequently, according to both Aristotle and Kant, it is impossible for a computer to “do the right thing”, by definition. This proves Kasparov’s claim that “humans still have the monopoly on evil”, as they are the only ones capable of doing evil things in the first place. In fact, humanity’s monopoly on evil is perpetual. Before that, Kasparov said: “People say, oh, we need to make ethical AI. What nonsense,” which, as I have proved, is not just nonsense, but actually fundamentally impossible.

The problem lies in the second part of the quote: “The problem is not AI. The problem is humans using new technologies to harm other humans.” While historically speaking new technology is extremely likely to be used for evil purposes, it is not our main issue in the case of AI. As I have personally experienced in my little maze experiment, AI can do things its creator did not intend, and cannot even imagine. Hence, subscribing to the idea that “the problem is humans using ...” seems morally wrong to me. Moreover, the complete lack of a ‘safety net’ combined with the extraordinary power AI possesses is where the danger lies. <ins>We should not worry about AI because it might turn evil; we should worry about AI exactly because it cannot turn evil as evil is a concept of ethics and thus a human construct.</ins> A machine has no morale; it lacks what I call _ethical intelligence_. It does not reason about what is good and what is bad. It just “does”.

We will be playing a game of ‘Russian Roulette’ at an unfathomably large scale. One accidentally ill-defined ‘objective’ could lead an AI to decide humanity is an obstacle in its mission and it better be annihilated. AI’s ‘good’ (meaning corresponding with its ‘objective’) is completely different from human ‘good’ (which is based on human qualities).

## §6 Conclusion

To summarize, I have explained how computers can use machine learning to teach themselves how to be intelligent and how AI is fundamentally different from all technology humanity has ever seen, because of its relative autonomy and unpredictability. After that, I demonstrated how the virtue ethics of Aristotle and Kant’s philosophy of reason and a good will prove ethics is something intrinsically human. From there, it follows that Kasparov was right in saying “humans still have the monopoly on evil”. However, in my opinion Kasparov was too naive in assuming AI needs ethics to be destructive, and it is its inherent lack of ethics that make an AI even more dangerous.

## §7 Afterthoughts; discussion

An interesting question remains. Imagine we train an AI to mirror human decision making<sup>3</sup>. After learning and improving on itself for a long time, let’s say it is impossible for anyone to tell the difference between this system and a real human (in other words, it passes the “Turing Test”). Should we consider it human? Virtue ethics tells us the answer is ‘no’ because this AI lacks virtues and thus proper motivation behind its actions. Kant would say we should appreciate this human-like computer, but its actions can still not be considered “good.” Personally, however, I think this case requires further investigation because if we were to trace back the actions of the AI to where it learnt them, we will eventually end up with a real human, and with them their virtues. These virtues are, in a way, what inspired the AI to do what it did, and so it could be argued that the AI is, interestingly enough, still acting on human virtues. Here is the dilemma: is a human responsible, or the AI? The former seems evil, the latter impossible.

## Footnotes

<sup>1</sup> I should note that “good” and “bad” in this context refer to the ‘objective’ and explicitly not ethics in any way.

<sup>2</sup> For the purpose of conciseness, I will not explain why this is true. Human interoperability is an active area of research beyond the scope of this essay.

<sup>3</sup> Assuming this is possible.
