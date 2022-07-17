---
title: Playing the Open Source Game
date: "2021-04-12T00:00:00"
draft: false
---
The Zig project has a non-profit foundation that needs to be managed, a community to shape, and the actual language to develop. These are all big, complex problems that don't default to a positive outcome without active care. 

Andrew did an amazing job laying the foundations, from deliberately choosing a [non-profit corporate model](https://ziglang.org/zsf/), to picking clear values based on respect and empathy for the community to crystallize around, and finally by leading development by example both when it comes to exploring new ideas and when doing the methodical part of the work required to go from a proof of concept to a reliable tool, [like zig cc](https://andrewkelley.me/post/zig-cc-powerful-drop-in-replacement-gcc-clang.html), for example.

This is already a huge amount of good work that has been done and I'm happy to have been contributing to it for almost a year by now, but I know that this is still not enough and, **as the project grows, we'll have new, harder puzzles to solve**. One increasingly relevant puzzle is how to exist in the extended cinematic universe of open source development, where the influence of big players can have devastating effects on smaller projects.

The importance of this last point cannot be overstated because, of all the various playing fields, this is the one where players enact meticulously planned adversarial strategies that can undo any kind of good work if you're not attentive enough. In the post where I [announced joining](https://kristoff.it/blog/addio-redis/) the Zig Software Foundation I mentioned the importance of acknowledging how **growing a successful project is not an entirely peaceful process**, and now I want to talk about how recent experiences have further developed my understanding of the open source game, and how that relates to the future of Zig.

## The end of Redis

As a very funny coincidence, my last day at Redis Labs was also the same day Antirez resigned from the open source project and handed over both the official repository on GitHub and the main website ([redis.io](https://redis.io)) to the company. 

Redis Labs has always been frenemies with the cloud vendors, and especially AWS. The reason is simple: Redis Labs and all the companies that have formed behind OSS databases have to accept AWS as a partner, but they also want to be the primary beneficiary of the value that *their* respective OSS projects generate, while AWS *begs* to disagree. **This is a battle where neither party is the "good guy" and the discussion that ensues reduces open source to a set of legal constraints for companies to collab-compete around**.

<blockquote class="twitter-tweet"><p lang="en" dir="ltr">I think neither party is without blame in the case of ES vs AWS. For AWS, OSS only means license terms around which to collab-compete with other companies. For Elastic, OSS means taking over the development, registering trademarks and become the de-facto owner of the project.</p>&mdash; Loris Cro (@croloris) <a href="https://twitter.com/croloris/status/1363121008371249156?ref_src=twsrc%5Etfw">February 20, 2021</a></blockquote> 

More importantly, AWS recently dealt a big blow to its opposition by taking the [license change](https://www.elastic.co/blog/licensing-change) made by Elastic and transforming it into a casus belli to legitimize AWS' own hard fork of Elasticsearch, painting Elastic (and implicitly any company that dares to follow the same path) as a greedy bad actor that forced AWS to “[Step[...] up for a truly open source Elasticsearch](https://aws.amazon.com/blogs/opensource/stepping-up-for-a-truly-open-source-elasticsearch/)”. 

On the other side of the collab-compete barbed fence, with a hard-fork gun pointed at its head, Redis Labs has opted to play nice with the clouds and to fill the void left by Antirez with a [governance committee](https://redis.io/topics/governance) composed of representatives from Redis Labs, Alibaba and AWS. 
All the people in the committee are long-time contributors to Redis and new decisions are taken collaboratively through proposals on GitHub. This is a great start on paper and yet I'm already extremely disappointed with where they're taking Redis.

<blockquote class="twitter-tweet"><p lang="en" dir="ltr">There are reasons why Antirez implemented scripts in Lua, used hashes to refer to them and never considered them part of the data in Redis. That is not to say that he was right on every front, but the complete disregard for the original design by the new committee is a sad joke.</p>&mdash; Loris Cro (@croloris) <a href="https://twitter.com/croloris/status/1375191409427419144?ref_src=twsrc%5Etfw">March 25, 2021</a></blockquote> 

**While the core team itself might be fine**, we can't forget that all those developers have hierarchies above them and **they lack the ultimate power that Antirez had**: copyright ownership and undisputed control over the codebase which allowed him to raise a big, fat middle finger to pressure coming from Redis Labs or any of the clouds. 

Another thing that might hint at the sad mess everything is turning into, is what's at the top of [redis.io](https://redis.io). It used to be that all commercial content would be relegated to redislabs.com, **but now apparently a "Try Free" button has found its way to the top menu of the open source website**. So now you have to be careful because if you press the wrong (big, red, well positioned) button you might end up signing up for a Redis Enterprise Cloud account instead of getting a copy of Redis. Disgusting.

![Screenshot of redis.io top menu bar](redisio.png "It's not even the same damn product!")

The direction set by Antirez, imperfect as it might have been, was based on having a sustainable approach to development and making Redis a useful, somewhat minimalistic tool for solving coordination problems in a distributed system. **When I joined Redis Labs I used to think that these people were sitting on a golden goose and that they just needed to realize it**. As time went by I came to the bitter realization that nobody in command was interested in doing Redis any justice and that the company, [addicted](https://redislabs.com/press/redis-labs-110-million-series-g-led-by-tiger-global/) to venture capital and utterly incapable of correcting its crippling deficiencies, wanted instead to corrupt the design of the product to compensate. This is the same kind of barren mentality that put a "Try Free" button on the open source website, and that is now indirectly driving the development of Redis.

To be fair to some of my ex-colleagues, some people were genuinely good at their job and really tried their best to find harmony between the open source project and the company. Unfortunately their talent got completely wasted because every high level detail of the whole story made that impossibly hard, from the company structure, to its financial strategy, up to external forces like toxic (and effective) marketing and sales tactics from AWS and other players.

## The Rust Software Foundation
The Rust project recently [announced](https://foundation.rust-lang.org/posts/2021-02-08-hello-world/) the creation of a dedicated non-profit organization. I'm very happy for this development because Rust is in many ways like an older cousin that has a lot of things figured out, while we are just getting started (although the Zig Software Foundation predates Rust's by almost a year). Starting from this premise, I always keep an ear out for new developments to better understand how and when the challenges Rust is facing today are going to show up in our project tomorrow.

One of such challenges was recently mentioned by [Ashley Williams](https://twitter.com/ag_dubs), Interim Executive Director of the Rust Software Foundation, in an interview on the [Context Free YouTube Channel](https://www.youtube.com/c/ContextFree). I warmly recommend you check out both video and channel.

<div class="video-container">
<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/h-LoPr5553o" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>
<br>

In the interview Ashley mentions that the Rust software foundation has decided to reserve 5 board seats to "founding member companies" and among the reasons for this choice she lists:

> to a certain extent take responsibility for the privilege of being able to use open source technology by giving back to the organization [...] One of the biggest threats when you see an open source project like Rust start getting adopted by a lot of organizations, is that all of these fantastic engineers who are currently spending their time working in open source, on the technology, suddenly get scooped up into fantastic engineering jobs at these organizations but they're no longer working <u>on</u> the technology, they're asked to work <u>with</u> the technology, and this can lead, unless you're incredibly disciplined, to a type of brain drain in the project.

I'm not ecstatic at the idea of the 3 letter smirk being present in yet another board of directors but, at least in the case of Rust, we can see that the chain of command is properly aware of the negative effects that big tech can have on open source projects and, as long as they're attentive, I'm sure everything will go well.

The Zig Software Foundation might be in a bit of a pickle though! How are we going to stop big organizations from stealing our talent? I'm certainly not in a position to have one Zoom call with today's Google CEO to [strike a cartel deal](https://www.theverge.com/2012/1/27/2753701/no-poach-scandal-unredacted-steve-jobs-eric-schmidt-paul-otellini) over employees and in fact I['](https://twitter.com/croloris/status/1360732259771424778?s=20)ve [been](https://redislabs.com/blog/aws-vs-open-source/) [busy](https://kristoff.it/blog/addio-redis/) [antagonizing](https://twitter.com/croloris/status/1354470297320239105?s=20) these people more than anything else. More importantly, **the Zig Software Foundation does not intend to give up board seats to any big tech company**.

Obviously we can't compete with big tech companies when it comes to salary. Since we're a small organization, we can offer a flat hierarchy and a lot of flexibility, but so can startups, and the salary problem remains. So what can we offer that they can't?

## Working in big tech

While I'm sure there must be some thoroughly enjoyable, albeit rare, jobs that you can get in big tech, my impression is that the vast majority falls into two categories:

1. Work at a megacorp and either you rot working on menial things, or learn to play the politics game to get a shot at working on the one interesting project... until it gets canceled when the CEO decides to "refocus", or when Monday comes if you work at Google.
2. Work at a startup and tackle interesting problems, but know that the whole thing is inevitably meant to be a user acquisition trick to build a moat and get to a quick exit, which more often than not means selling everything to a megacorp that will progressively compromise the few good things about the product, while slowly turning everything into [1]. 

If you have any appreciation for good software that respects the end user and tries to find earnest solutions to problems, you are SOL when it comes to big tech jobs. Personally, I'm tired of this, both as a user and as an engineer. 

As a user, I'm tired of having video drivers that require me to give up my email address before I can download an update, of garage openers that [require a monthly subscription fee](https://www.youtube.com/watch?v=x7pSkVarixU), of seeing Oculus requiring a Facebook login after being bought, [Waze being sold to Google](https://techcrunch.com/2020/11/10/waze-ceo-noam-bardin-to-leave-company-in-early-2021/?guccounter=1), Discord to Microsoft or whoever it will be. **People used to say "when you don't pay for a service, you're the product", but now you always are the product and sometimes you even have to pay for the privilege**.

As an engineer, **I'm tired of working on systems that are openly hostile to the end user, where the best and most elegant solution is rejected in the pursuit of an extravagant business model**.

I used to think that working in open source would save me from all this, but the truth is that this is not the case in practice nor in theory. It pains me to admit this publicly, but I fell for the marketing and only realized what open source really was once I started working at Redis Labs.

Now you might think that since I'm disillusioned with open source, I should look into the free software movement, but in my opinion free software is a disaster on too many fronts and its leadership has failed so badly that I don't even want to waste words discussing it past quoting this tweet by Steve Klabnik, with which I wholeheartedly agree.

<blockquote class="twitter-tweet"><p lang="en" dir="ltr">Really liking some of the takes over been seeing about free software. It’s wild that the FSF has failed in its mission so badly that it’s basically prevented a lot of folks from evening imagining what software freedom could mean. The best stuff I’ve seen engages with this deeply</p>&mdash; steveklabnik (@steveklabnik) <a href="https://twitter.com/steveklabnik/status/1376927079795679234?ref_src=twsrc%5Etfw">March 30, 2021</a></blockquote>

As far as I'm concerned, **neither open source nor free software are able to represent my ideals when it comes to software** and I feel the need to come up with a new way of articulating what is missing from both of these movements.

It's not easy to come up with a full fledged description of whatever this thing should be, but as a first approximation I came up with "**software you can love**". It's very vague, but it perfectly captures the good parts about open source and free software, and filters out many of their flaws. 

There's a limit to how much you can love software with terrible UX, just as much as there's a limit to how much you can love software that has good UX, but that keeps nagging you about enabling notifications because it *really needs* more engagement, or software that is bloated, janky and that has short shelf life because of bad engineering choices. It also captures the fact that having the source code available is nice for learning and "right to repair" purposes, but that there is more to software you can love and that sometimes a reasonably priced, rocksolid, proprietary tool can be preferable to a janky OSS project connected to a murky business model.

Another good thing is that **I'm not the only one thinking about these ideas: there's a galaxy of projects out there that have independently rediscovered most of them**. The Zig project is one, but there's also the [Handmade Network](https://handmade.network/), Andreas Kling's [SerenityOS](http://serenityos.org/) and more. While I don't speak for other projects, their respective philosophies can be learned by looking at the [Handmade Manifesto](https://handmade.network/manifesto) or by watching [Andreas Kling's YouTube channel](https://www.youtube.com/channel/UC3ts8coMP645hZw9JSD3pqQ), and I've started reaching out to them, to learn more about what they have to say.

For example I recently interviewed [Abner Coimbre](https://twitter.com/abnercoimbre), ex-NASA engineer and cofounder of the Handmade Network on these same topics.

<div class="video-container">
<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/Nutcb6ao0mc" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>
<br>


A few days from the moment of writing I will interview [Jonathan Turner](https://twitter.com/jntrnr), who also recently left his cushy big tech job to fly solo, and hopefully I'll soon get a chance to interview [Andreas Kling](https://twitter.com/awesomekling), who in many ways seems to share the same collaborative spirit that has has been a major strength of the Zig project.

<blockquote class="twitter-tweet"><p lang="en" dir="ltr">Linus Groh (<a href="https://twitter.com/linusgroh?ref_src=twsrc%5Etfw">@linusgroh</a>) has just reached 1000 commits in SerenityOS! 🐧🐞🎉<br><br>To celebrate the occasion, I dug up my very first conversation with Linus, where he told me he was really inspired by the project but was unable to contribute since he didn&#39;t know any C++... <a href="https://t.co/d1erwr5wMQ">pic.twitter.com/d1erwr5wMQ</a></p>&mdash; Andreas Kling (@awesomekling) <a href="https://twitter.com/awesomekling/status/1379127438823817220?ref_src=twsrc%5Etfw">April 5, 2021</a></blockquote>

With this lengthy premise, I'm finally able to answer the brain drain question.

## Software you can love
**Big tech has been increasingly unable to create software you can love**, and that's the ability you gain by refusing to work for the silicon valley. It's not for everyone and I can understand if somebody prefers the security of a stable job in a company too big to fail, where they can just go home after work, forget about software, and live a very comfortable life but **big tech jobs are not the absolute best choice for those who really love software craftsmanship** and, as it turns out, some of these people have taken a liking to Zig.

A few days ago [Jakub Konka](https://www.jakubkonka.com/) left his job at Microsoft to become our first full-time core contributor.

<blockquote class="twitter-tweet"><p lang="en" dir="ltr">Got some big news. Today is my last day at Microsoft. Met there some great folks, but during this short tenure also realized that my passion lies elsewhere. So from Thursday, I will be working full-time for the Zig Software Foundation on `zld` MachO linker and <a href="https://twitter.com/ziglang?ref_src=twsrc%5Etfw">@ziglang</a> compiler.</p>&mdash; Jakub Konka (@kubkon) <a href="https://twitter.com/kubkon/status/1377146321136537602?ref_src=twsrc%5Etfw">March 31, 2021</a></blockquote>

Jakub is a long time Rust user, ex-Wasmtime core contributor, and member of the Bytecode Alliance who started by contributing WASI bits to the Zig standard library and ended up reverse engineering the aarch64 MachO executable format in order to write a linker that **made Zig the first C cross compiler ever able to target Apple Silicon from any other supported platform**.

[Here you can read more](https://ziglang.org/news/jakub-konka-hired-full-time/) about Jakub's involvement and what it means to work for the Zig Software Foundation, but to answer the high level question about our strategy, I think **it's big tech that should be worried, not us**. 

The Zig Software Foundation plans to remain a small and nimble organization so we're never going to be a threat to any big tech company when it comes to poaching -- *too much* -- talent, but there's a growing movement of people who, just like us, are fed up with unlovable software and that want to do things differently. **I want these projects to grow and I'll be happy to share with them every bit of expertise I have when it comes to playing the open source game**.

Abner is running [the Handmade Seattle conference](https://www.handmade-seattle.com/), which should return to being an in-person event later this year, and in the meantime [you can support all the out-of-conference content he produces by subscribing for a small monthly fee](https://media.handmade-seattle.com/membership/).

Jonathan [wants to bring Nushell to v1.0 and is working on learning materials](https://www.jonathanturner.org/retiring/) for the Rust community that you can find on [his YouTube channel](https://www.youtube.com/channel/UCrW38UKhlPoApXiuKNghuig). He even tried out Zig, which allowed me to capture [this funny clip](https://clips.twitch.tv/RockyLivelyChimpanzeeDoubleRainbow-Pov6fVYDbH1_r-A6).

Serenity OS is looking [to allow Andreas to work full-time on the project](https://github.com/sponsors/awesomekling/) and, who knows, an OS is a big project, especially one that is writing its own IDE, web browser and everything, so it might want to be able to pay major contributors one day.

The Zig Software Foundation is looking for more donations [to pay two more full-time core contributors](https://github.com/sponsors/ziglang) in order to get faster to v1.0.

Finally, if you run a project of comparable size and goals, I'd love to get in touch.

**We're building software you can love, and big tech can't compete with us**.
