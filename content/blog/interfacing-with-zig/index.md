---
{
    .title = "Interfacing with Zig, a BDFL-run Project",
    .description = "",
    .author = "Loris Cro",
    .layout = "post.shtml",
    .date = @date("2021-12-10T00:00:00"),
    .draft = false,
}
---

If you are interested in contributing to the ecosystem of a programming language (or any big software project really), it's important to know its governance model and how that reflects on the community.

This might seem a boring point at first glance, especially if you just want to get to the code, but the reality is that if you don't do this due diligence, you are setting yourself up for a lot of disappointment. Having unmet expectations when doing open source work might lead to burnout and many [other](https://www.theregister.com/2020/01/21/rust_actix_web_framework_maintainer_quits/) kinds of [serious](https://rodneylittlesii.com/posts/topic/foundation-echo-chamber) disappointment. 

The purpose of this article is to document how the Zig project is structured. This should help people understand under which constraints development happens, and how that impacts the Zig community at large, helping you decide if Zig is the right ecosystem for you to invest in.


# Governing Zig

Zig was created by [Andrew Kelley](https://andrewkelley.me). In the beginning he worked on it in his spare time and, once he got enough donations, he started working on it full time. Soon after, he created the [Zig Software Foundation](https://ziglang.org/zsf), a 501(c)(3) non-profit corporation. Donations are now directly sent to the foundation and all financial information is [available](https://ziglang.org/zsf) to the public. Andrew is President of the board of directors alongside Mason Remaley and Josh Wolfe who are Treasurer and Secretary, respectively.

What's important to note about this arrangement, is how this restricts Andrew's power:

* The foundation has bylaws that the board needs to abide by.
* Andrew can't "run away" with the cash, like he potentially could in the beginning.

It's also equally important to understand how this arrangement does not directly impact Andrew's decisional power when it comes to the design of the language. The board is there mostly to provide long-term stability, and it does not have a say on whether Zig should allow hard tabs or not, for example.

When it comes to design, Andrew still reserves the right to be the ultimate decision maker, but he's not doing all design work alone.


# Designing Zig

From the moment Zig became available to the public, the GitHub repository started hosting Issues tagged `proposal`, submitted by either Andrew himself or people that wanted to get involved with the project. If you want to know which features have already been considered and why they were accepted (or discarded), that's the best place to start.

It's important to understand that those proposals, while open to discussion by the public, are not there to be accepted or rejected through a form of popularity contest. What happens nowadays is that Andrew has regular "language specification" meetings with Josh Wolfe and Martin Wickham where they discuss proposals and ultimately accept or reject them. The meetings are not recorded, but minutes are available to the public, and they occasionally allow a guest to participate and discuss a proposal relevant to the guest's experience.

I mentioned before that the board of directors doesn't participate in the design of the language and yet Josh Wolfe is present in these meetings, what gives? Long story short, Josh has been counseling Andrew about language design since long before he became a board member, while as for Martin, he's being paid by the foundation to work on the language specification. He also goes by the nickname `SpexGuy`, so you can tell he's the right person for the job :^)

Language specification meetings focus on design and don't cover all the day-to-day decisions that are necessary to actually implement Zig.


# Implementing Zig

The main development workload is shouldered by Andrew and the Zig core dev team. When it comes to new features, usually Andrew writes a PoC / skeleton version of the feature and then others flesh out the details, but it's not always the case, especially when it comes to areas that aren't central to the design of the language itself. The cryptography code contributed by Frank Denis to the Zig standard library is a notable example of that. Frank is the crypto expert of the core team and so he's the most qualified person to make decisions both in terms of API and implementation.

Andrew is in charge of inviting people to the core team. Having contributed high quality code to Zig in the past is considered a prerequisite, but there's no formal process and, while most members of the core dev team have a specialty, they're free to work on whichever part of the codebase they like and they can normally bill hours to the Zig Software Foundation. Members of the core team meet regularly on Discord alongside all kinds of interested contributors. These meetings are organized by Jakub Konka on a weekly basis and are currently focused on showcasing progress and unblocking contributors working on the self-hosted compiler. 


# Discussing Zig

While the main work moves forward, Zig users are writing programs and discussing it in the various Zig communities. In reality the community has a couple of jobs too: present the language to the world, mostly through their writing (be it Zig code, chat messages or blog posts), and onboard newcomers. At a constantly increasing frequency, new people hear about Zig and are interested in discussing it, sometimes to learn more, some other times to put into question a design choice. 

Different people with different sensibilities and priorities will find Zig's tradeoffs to be more or less congenial, so discussion around design choices can be great, but it can also be a source of friction when done wrong. One example of doing it wrong, is questioning a design choice without having done the due diligence of searching through Zig's GitHub Issues for previous discussions on the same topic, and an even worse example is when someone comes in "guns blazing", armed with an opinion they consider a universal, self-evident truth in opposition with a design choice made in Zig. 

Both of those attitudes share a common problem: they make it harder for the participants of the discussion to build a baseline of mutual understanding. Not reading previous discussions forces community members to repeat the same thing over and over, while the second case requires first to inquire about the reasoning behind the opinion, which might not even be possible when the other party considers it self-evident. It's only at that point that a discussion can be actually had, and in practice it's not rare that people abandon the interaction even before reaching that point.

To be clear, I'm not endorsing the act of dismissing people at the first hint of imperfect netiquette, if anything I'd like the opposite: that every community member would be able to tirelessly and impassionately handle any interaction, always presenting Zig in the best of ways. 

Alas, starting from me, community members are human, so they get tired and they themselves don't always know how to act appropriately in every situation.

As to what limit should bad netiquette be tolerated from newcomers and community members, that's something that's left to decide to the owners of each individual community. As stated on the official website, the Zig community is decentralized:


> Anyone is free to start and maintain their own space for the community to gather.
> There is no concept of “official” or “unofficial”, however, each gathering place has its own moderators and rules.

As the project grows, we'll inevitably end up with a galaxy of communities centered around different interests, each run by different people. In a way, it's not like we've invented anything new by declaring the Zig community as decentralized but, by being aware of the cosmic forces that shape human collaboration, we hope to make the most out of the resulting system. 

If you like Zig you're not only welcome to join an existing community, but also to start your own. Having multiple communities right from the start ensures we have a more varied bouquet of voices in the community, but a chorus is less coherent than a single voice, so what's the mindset that one should expect to see shared across all Zig communities?


# Understanding Zig

I think the best way for me to expand on this final point is to refer to how I approached the project in the beginning. 


## Concrete outcome

At its core, Zig is a programming language with an opinionated design and a clear goal. If you don't care about manual memory management, architectures other than the latest Intel i9, executable size and general resource efficiency, then Zig is probably not for you. In my case, comptime is the feature that clicked first as I read the [Zig overview](https://ziglang.org/learn/overview/) on the official website. You don't have to like everything about Zig right from the start, but you have to appreciate a critical amount of its design because otherwise you will wish for Zig to be a different language than what it actually is, which brings me to the next point.


## Building trust

The design of Zig comes from Andrew and his close collaborators. Joining the Zig community implies giving Andrew a mandate to be the highest authority when it comes to design decisions. Ultimately this is a question of trust: can you trust Andrew to put in enough effort and be competent enough to consistently make good decisions? To answer this question I remember spending a good chunk of time reading GitHub issues on the `ziglang/zig` repository, to see how Andrew would interact with others and to see the reasoning surrounding each design proposal. On top of helping me answer the trust question, this also helped me understand more clearly the direction of the language.


## Irreverent

This might seem paradoxical for people that don't know the Zig community but, despite being a BDFL project, we don't have much love for pedigrees and things that fall under the "cult of personality" umbrella. Andrew is the BDFL, but he also [dresses as Franky](https://twitter.com/andy_kelley/status/1454878254125379588?s=20) (from One Piece) for Halloween and, while we accept his role, we don't assume every decision he makes is correct by virtue of his position of power. This doesn't only apply to Andrew, but also to other decision makers in _(<span style="text-decoration:underline;">and out of</span>)_ the Zig community. If you too are tired of communities that elevate their leaders to demigod status, then the Zig community could be the right place for you.


## Forward-looking

Another important aspect is avoiding what I usually call "watercooler complaints". [I made a video on the topic](https://www.youtube.com/watch?v=9E_rtUgUF58) and more recently Andreas Kling has expressed succinctly the core point in a tweet.

```=html
<blockquote class="twitter-tweet"><p lang="en" dir="ltr">If you bond with others over how bad things are, you create incentive to maintain badness.<br><br>If you bond over how cool things could be, you create incentive to improve and learn what else is possible. 🤓👍</p>&mdash; Andreas Kling (@awesomekling) <a href="https://twitter.com/awesomekling/status/1456928188454559752?ref_src=twsrc%5Etfw">November 6, 2021</a></blockquote> 
```

This is not to say that you are expected to be artificially positive when interacting in the Zig community, but there's a big difference between complaining for the sake of complaining, and pointing out things that are not as good as they could be. **A good rule of thumb is that you're allowed to complain about things that you're actively trying to improve.** Not only is this a self-balancing heuristic, but it also has the beneficial effect of prioritizing observations from people that can offer a more nuanced point of view than your average onlooker. 

This is a very important distinction because anybody could rightfully complain about, say, the C/C++ cross-compilation being unnecessarily hard, but the complaint will carry an immensely bigger punch if it comes from somebody who's actually working on the problem and who can bring [irrefutable proof that things can in fact be better](https://andrewkelley.me/post/zig-cc-powerful-drop-in-replacement-gcc-clang.html). In my case, my field of expertise is (becoming) non-profit foundations and I'm unapologetic when [calling out things that I believe to be wrong](https://www.youtube.com/watch?v=eoYMrOEO164), because I'm actively working on improving the status quo. 

From my perspective we should not welcome in any Zig community "lazy geniuses" who make a sport out of pointing out problems, but who also think that improving things is always someone else's job.


# Conclusion

The characteristics that make up the Zig ecosystem are not necessarily optimal for everyone, but they are part of a bigger strategy required to make Zig successful. As an example, being a BDFL-style project helps us achieve outcomes more efficiently than many alternatives, which is necessary given our independent nature. Similarly, since we're a BDFL project, we all need to be a bit irreverent to keep the leadership honest.

**While I wish for every individual Zig community to be unique, I also think that all Zig communities need to be _<span style="text-decoration:underline;">forward-looking</span>_, _<span style="text-decoration:underline;">irreverent</span>_ but also capable of _<span style="text-decoration:underline;">building trust</span>_ in order to achieve a _<span style="text-decoration:underline;">concrete outcome</span>_.** In fact, I think this is a good description not just for the Zig community, but also for the Zig Software Foundation itself.

I've only mentioned it briefly, but being capable of building trust is a critical skill not just for the leadership, but also for every community member. Not only is it the starting point for joining the Zig community, but it's also fundamental when it comes to resolving conflicts within the community itself.

Without knowing how to build trust, our ability to achieve concrete outcomes is greatly diminished and, worse, we become more exposed to external manipulation. Some of you already know what my recommendation on the topic is. For everyone else, here's a photo.

![](sh.jpg "Just a few people sitting around a table, learning about community building.")

As I've already said in the past, to all community members that have been following along the Zig journey: thank you for paying attention.
