---
title: A Note About Zig Books for the Zig Community
date: "2023-06-16T00:00:00"
draft: false
---
In the last few weeks I've heard reports of quite a few people in the Zig community being contacted by multiple publishers about writing a Zig book for them.

In this post I want to share some information with everybody 
in order to support the decision making of those who might be
interested in working on a Zig book, be it with a publisher, or
without one.

Before I jump into the meat of the discussion, here are my own personal plans, which are not a big secret (I've mentioned this to a few people at the Zig events I've been to), but that I've never mentioned so publicly: **I'm working on a "intro to Zig / systems programming" book**. It's my first time doing this type of work so I don't know precisely how long it will take, which is also the reason why I avoided making any public announcement before now (ie I don't want to be subject to an endless stream of "when is the book going to be ready?" questions). 

For my book I'm most probably going to self-publish using Amazon Kindle Self Publishing or some other similar platform.

Ok, now back to you.

First of all, if you are interested in writing a Zig book and are worried about my announcement just now, don't be: neither mine nor anybody's book is going to be anointed as "official", so we all play on a plain field from that perspective.

Now, should you make a deal with a publisher or not? 

I guess there is no ultimate answer to this question but, in my opinion, when it comes to Zig, the answer is more "no" than it is "yes". 

A publisher (like any other business partner) will take something from you in exchange for something else, and the deal will only make sense to you if what you get in return is more valuable than what you give up.

A publisher will take away from you some creative freedom and a percentage of the profits from book sales in exchange for helping you through the process of **writing**, **printing** and **distributing** the book.

## Writing 

The publisher will assign a person to you who will ping you regularly about your progress and who will eagerly await new chapters from you. Once you give them a new chapter, they will route it to an editor who will fix your grammar mistakes and generally improve your prose.

Personally I don't think of the first part (the nagging) as a service, but some people do. Having an editor correct your work is universally valuable instead, and in fact if you plan to self-publish you should definitely consider paying an editor to review your work. Partnering with a publisher means that you don't have to shoulder this cost, but publishers are not charities and in the end you will pay the editor (and the nagging guy, and their manager's manager) with the percentage of the revenue that the publisher will take from sales.

Additionally, you will only have access to editors that he publisher employs, meaning that you won't be able to choose someone you trust. I would expect the average publisher's editors to be fine, but still, I look at writing a book as an artistic endeavor and wouldn't like having other people dictate what should be put in it or not. 

As far as I'm aware you editor will not have power over you when it comes to choice of words, but you both will be subject to the publisher's guidelines which will force you to include things like a legend that explains to the reader that colorful text written in a monospace font between two horizontal separators is... (*oot_opening_chest_jingle.wav*) ...source code!

My book for example is aimed at people who already have programming experience and, since I always find incredibly boring having to skip over a bunch useless introductions to obvious concepts, I'm making the artistic choice in my book of jumping directly into the meat, which is something publishers would probably not like much.

## Printing

Publishers will help you with the printing process, but they will also have rules about things like the cover art.

Unfortunately this is the kind of stuff that pretty much no matter who you are, you will have to partner with somebody to get done, but nowadays thankfully we're not forced anymore to either get the full publisher package or nothing. 

As I mentioned earlier, now we have services like Amazon Kindle Self Publishing that just take care of this part without any other overhead.

If you go this route you will have to design your own book cover (or pay an artist to do that for you), but that's it.

Personally, I plan to commission the book cover art to [Joy Machs](https://www.artstation.com/joymachs) who has already created a lot of awesome illustrations for the Zig community and who I had the pleasure of meeting in person in Cape Town at Systems Distributed.

## Distributing

Publishers have a distribution network that they can leverage to get your book in front of more eyeballs. One iconic example is how big conferences will have a book shop section where you will find programming manuals about new technologies. 

That's the kind of thing that a publisher can get you access to, and where in my opinion the money equation would normally balance itself out: you give up a percentage of your profits, but the overall pie gets bigger thanks to the publisher's network, ultimately resulting in you getting more money than what you would have gotten by keeping 100% of the revenue with self-publishing. Win win!

Unfortunately I don't think this is what would happen with a Zig manual. Had your book been titled something like *"Uncle Fred's Chicken Skinnin' and Code Cleanin' Manual for Future Wives"*, then maybe yes, the publisher's network would have proven valuable, but a Zig programming manual is not an attempt at selling gullible devs on an snake-oily programming methodology that needs tons of marketing to drive a self-perpetuating need for more religious material to be published and consumed to reinforce adherence to the doctrine.

The people who are interested in Zig already exist in the form of the Zig community, and you don't need a publisher to mediate that interaction: just go to a Zig community and post a link to your book. There is no hype that you will need to build around your book in order to create an artificial need that keeps fueling itself. 

A Zig programming manual is a simple answer to a concrete need: there are people who are already trying to learn Zig (and systems programming) who could use some help. This is one of those cases where if you ~~build~~ write it, they will come... or almost: you still will need to let people know that your book exists, but it's not all that hard and if your content is good, word of mouth will do the rest of the work for you, just like it did for [Ziglings](https://github.com/ratfactor/ziglings ) and [Zig Learn](https://ziglearn.org/), for example.

## Conclusion

Depending on where you are in life, it might feel very flattering to receive a ping from a big book publisher, but giving too much weight to the brand can lead you to make choices you might regret. 

At [Software You Can Love](https://softwareyoucan.love) Vancouver I mentioned in my keynote that you shouldn't take VC money just as a form of validation, and the same applies here: **partner with a publisher only if you genuinely believe that the business agreement you're getting yourself into will truly be beneficial to you**.

Book publishers (and a few other figures unrelated to books) have started buzzing around the Zig project because we're starting to make some waves: [Uber has been bootstrapping their Arm64 infrastructure using Zig](https://www.uber.com/en-IT/blog/bootstrapping-ubers-infrastructure-on-arm64-with-zig/), [Bun](https://bun.sh) & [Tigerbeetle](https://tigerbeetle.com), and just a couple of days ago, in the Stack Overflow Survey, [Zig was listed as one of the most admired programming languages](https://survey.stackoverflow.co/2023/#technology-admired-and-desired) and [the most well paid](https://survey.stackoverflow.co/2023/#technology-top-paying-technologies).

Be aware that for outsiders Zig represents new untamed land, and they want to move here before their competition does. This is not inherently bad, but it does mean that they might be willing to accept compromises that you might not be fine with.

One book-related example is the fact that Zig is still **heavy** into development and the stdlib not only changes regularly, but that it also hasn't yet been the main focus of development, meaning that the way it's structured today might change dramatically once a design philosophy is chosen for it. A sufficiently-clueless publisher might be salivating so hard at the idea of publishing "the" Zig programming book (which, as stated before, is not even a thing) that they might try to push you towards something that will be difficult to write and with an extremely short shelf life.

For example in my book I plan to stay away from the stdlib as much as I can and I will tell the reader to either stick to the same version of Zig I used in the book, or to be willing to figure out by themselves what to do when a code snippet in the book doesn't compile anymore. This is a compromise that can make sense for a book explicitly designed to be an introduction mainly aimed at making Python/JS programmers aware of lower-level programming concepts, but I'm not sure the same compromise would work for a book that tries to be a complete Zig programming manual.

If you plan to write a Zig book or are in talks with a publisher, consider joining the [Software You Can Love Discord server](https://discord.gg/dCJm5WCSm2) where you will find other content creators and active members of the Zig community (including me) who will be happy to share their perspective with you about these matters.

Whatever you choose to do, I wish you good luck. 