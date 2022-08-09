---
title: The Good Parts of Open Source
date: "2022-08-09T00:00:00"
draft: false
---

If you read my blog in the past, you know I'm often complaining about Open Source, but today I'm here to say something supportive for once. This doesn't change the fact that I'm still running [Software You Can Love](https://sycl.it) this October as an explicit departure from the general "Microsoft ❤️ Open Source" mentality, but recent events are a good excuse to talk about **the one thing that Open Source does well: reduce risk when using somebody else's code**.

I'm going to give a full introduction to the context that I'm referring to, but 
I also want to point out that I'm writing this in part for the benefit of the 
[Handmade Network](https://handmade.network/), since the events that I'm about
to mention impacted the community directly.


## Our Machinery, but not yours

Our Machinery is (was?) a small company that developed The Machinery, a game engine and IDE. It was similar to Godot in some ways, but more minimalistic and extendable, and thus closer to the Handmade ethos. In a relatively short time it had become a very popular choice for many indie game makers, also thanks to the fact that The Machinery was free for studios that had yet to make big money.

[A few weeks ago](https://gameworldobserver.com/2022/08/01/our-machinery-terminates-machinery-game-engine-changes-eula) The Machinery was abruptly terminated and an update to the EULA even forced users to delete all copies of The Machinery from their computer. As of the date of writing we don't know the exact reason why The Machinery was terminated this way, but it's reasonable to speculate that the company faced a big legal threat and that forcing end users to delete The Machinery was part of a private settlement.

Ryan Fleury (former Head Admin of the Handmade Network) [has written](https://www.rfleury.com/p/ships-icebergs-game-engines) about this incident and many discussions have been had in the Handmade Discord server. The general consensus seems to be that it's important to be aware that investing in somebody else's stack is risky, and that while The Machinery came in source form (allowing you to customize the engine more easily), that was never code that you owned in a strong sense of the word, prompting for a renewed appreciation for self-reliance.

This is all reasonable and a recurring theme in the Handmade community, but I was surprised to see that Open Source wasn't really mentioned much in those exchanges, when in fact Open Source exists primarily to de-risk software written by someone else (alongside supporting shitty PR maneuvers by big tech players, but that's a story for another day).


## Our Open Source machinery

When you download Open Source code you're not only given the source, but also a license that allows you to use, modify and redistribute the code that you just received. There are many Open Source licenses and each has its own minor differences, but the core point remains the same: Open Source software is yours, for real.

This is obviously not a guarantee that the maintainers of the project will work on it indefinitely, so you might eventually end up with a discontinued tool on hand, but no Open Source license allows the copyright owners to force users to delete all code from their computer, and if you've invested a lot of resources into the tool, you will always be legally allowed to continue its development as a separate fork.

And it doesn't end here!


## No need for prayers, when the deal can't be altered

While a single copyright owner could at some point decide to stop issuing Open Source licenses, real Open Source projects with many contributors in practice find that very difficult. Whenever a contributor submits a GitHub Pull Request, they retain copyright of their code and implicitly grant the project the same license that the project is distributed with. So if you send a PR to a MIT project, you retain copyright of your work and grant the project an MIT license to use your work.

**This means that Open Source projects with many contributors are not only more likely to survive over time, but also less likely to ever change of license**, partially because of social norms, and partially because relicensing requires asking each contributor for permission to do so.


## Read more

In this blog post I've been fast and loose in describing what you get from Open Source licenses. While I believe my recap to be precise enough to be practically useful, there are more things to keep in mind, like Contributor License Agreements, which can be used as a shitty way to force license changes, and that are surprisingly common in corporate-sponsored Open Source, [the latest example being the Carbon Programming Language](https://github.com/carbon-language/carbon-lang/blob/7147ea0144add7d1716e2c4da62aea7368db3f1f/CONTRIBUTING.md). Know that [you don't want to sign a CLA](https://drewdevault.com/2018/10/05/Dont-sign-a-CLA.html).


## Conclusion

While self-reliance is an effective way to never be disappointed by somebody else's behavior, a fully autarchic programmer is limited in what they can achieve. As disappointing as human beings often are, collaboration is a catalyst for much greater achievements, especially when competent professionals learn to work together.

Open Source is ultimately a tool to keep freely-available software digestible for big tech companies, but it has the side-effect of granting the same benefits to the rest of us. Use Open Source software and know that nobody will be able to rugpull you thanks to a unilateral EULA update. In other words, referring back to Ryan's post: Open Source is a form of ownership.

I hope that this post will inform more discussion in the Handmade community, especially considering that it's home to a few upcoming programming languages, [one of which doesn't have an Open Source license yet](https://youtu.be/1Xdi5jSCYnc).
