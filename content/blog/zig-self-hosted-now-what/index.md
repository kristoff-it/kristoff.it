---
title: "Zig is Self-hosted Now, What's Next?"
date: "2022-10-25T00:00:00"
summary: "Why self-host Zig?<br> For great justice, of course… and also a few more reasons actually." 
draft: false
---

With the upcoming 0.10.0 release of Zig on November 1st, we are going to ship 
the new self-hosted compiler. This is the result of a huge amount of work that 
brings a lot of benefits, some obvious, some others less so. 

Even though the self-hosted compiler is now shipped, there's still more work 
to do on it but, at the same time, now the door has opened to more exciting 
features, like Zig's official package manager. 

Let's take a look at what's next for the Zig project.


## Performance improvements

**The new self-hosted compiler reduces memory usage 3x** compared to the old C++ implementation, also known as the bootstrap compiler. 

As an example, **building the compiler itself used to require 9.6GB of RAM, while now it takes 2.8GB**. You can now build Zig on 32bit systems and on machines with limited resources, like CI runners. Prior to this improvement we had contributors who were not able to build Zig on their machines, and now they can. 

The memory efficiency gains come in good part also thanks to the use of data-oriented programming techniques that were employed in the design of the self-hosted compiler.

<iframe title="vimeo-player" src="https://player.vimeo.com/video/649009599?h=0c3307419e" width="640" height="360" frameborder="0" allowfullscreen></iframe>

<br>In this talk Andrew explains how to use data-oriented design principles in practice, using the Zig compiler as a concrete example of what you can gain.


### Custom backends

While we're very happy with the memory savings, the self-hosted compiler is not particularly faster than the old one (7% faster at building itself, as a data point), yet. As mentioned in [Zig's New Relationship with LLVM](https://kristoff.it/blog/zig-new-relationship-llvm/), compilation times are dominated by LLVM so the only way to improve compilation speed is for Zig to have its own custom backends.

The work to build custom backends for the most common architectures has already started, and I invite you to pay attention to the progress report in the 0.10.0 release notes, once they come out; but to summarize: progress is about 40% for arm64 and 60% for x86_64. With those backends enabled, debug builds of your programs will bypass LLVM entirely. 

Having full control over the code generation pipeline will also allow us to move forward with our plans for incremental compilation with in-place binary patching, which will enable sub-millisecond incremental rebuilds of arbitrarily large codebases. See the aforementioned blog post for more info on that.


### C backend

We are also working on a special backend, one that produces C source code. Progress on the C backend has recently shot forward (87% and counting) thanks to an [insanely good](https://github.com/ziglang/zig/pull/13093) recent contribution.

What's interesting about this backend is that it will play a role in our plan to replace the old bootstrap compiler implementation and, perhaps even more interestingly, it will allow Zig to target architectures not supported by LLVM, **including ones that force you to use a specific C compiler, like certain game console platforms**.


## Compiler development speed

As a user of the language, you won't directly experience the difference between the bootstrap compiler codebase vs the new one, but this change will impact you as well, since it will influence the total amount of effort being spent on the compiler. 

In fact, it already has. Zig has started getting more contributions to the compiler by people who before would only work on the standard library (as it was already written in Zig). I myself am an example of that: I've started working on a new implementation of the automated documentation system specifically because I can now do that in Zig.

Now that contributing to the compiler is easier, we should expect a gradual return to our pre-self-hosting routine of implementing proposals (and causing breaking changes!) at a much higher speed. 


### New for loop syntax

One such example is the upcoming implementation of new for loop syntax which also supports ranges. Note that this is not going to be part of the 0.10.0 release.

```zig
const nums = [3]usize {42, 42, 42};
const chars = [3]u8 {'a', 'b', 'c'};

// easy "zip" iteration (all arguments must have the same length)
for (nums, chars) |n, c| { … }

// easy range loops
for (0..3) |idx| { … } 

// but this won't work anymore (old syntax)
for (chars) |c, idx| { ... }

// now you need a range if you want an index
for (chars, 0..) |elem, idx| { … }
```

Having language-level support for multi-argument for loops: 
* allows us to hoist out-of-bounds checks, improving performance in safe build modes (Debug, ReleaseSafe)
* encourages memory access patterns [that play well with MultiArrayList](https://zig.news/kristoff/struct-of-arrays-soa-in-zig-easy-in-userland-40m0) and other data-oriented design techniques
* provides a concise syntax to loop over ranges

You can read more about [this language proposal](https://github.com/ziglang/zig/issues/7257) on GitHub.


## The official package manager

Once the self-hosted compiler reaches feature-parity with the bootstrap compiler, we're going to start working on the first iteration of the official package manager. We don't expect to nail every design aspect first try, but we do know in which general direction we want to move.

The main goal of this first iteration is to enable simple usage of dependencies to start building a package ecosystem, and to make sure that we can easily package C/C++ projects, not just Zig. The Zig build system can already build C/C++ projects, so we want to [make sure we can leverage](https://kristoff.it/blog/maintain-it-with-zig/) 40+ years of Open Source work, and not just Zig rewrites. 

That said, supporting C/C++ is not only for Zig's benefit, as we believe that Zig can help simplify the process of fetching and building dependencies for projects that only intend to use Zig as a compiler and build system.

When it comes to specific features of the official package manager, this is our current take:
* The package manager will be part of the compiler instead of being a separate executable. Zig is a language and a compiler toolchain.
* The package manager will not assume the presence of a central package index. We don't plan to create an official package index.
* Version resolution will be the similar to Go's Minimal Version Selection, but with one extra limitation: v1 packages will only be able to depend on v1 packages.

We are fairly confident in those decisions, except maybe for the v1 constraint. The good news is that if it proves to be too draconian, we can always remove it without breaking existing packages.


## Was the rewrite worth it?

The self-host compiler brings many advantages, but it did cost us a significant amount of effort and time. While Zig is still going up in popularity and starting to make a [tiny dent](https://jakstys.lt/2022/how-uber-uses-zig/) in the industry, people that have been following along for long enough will know that this work has reduced our momentum in the last two years. 

Bug fixes in the compiler have been often put on hold since fixing the bootstrap compiler was  ultimately useless, and accepted feature proposals have been piling up because it would have required implementing everything twice.

All of this time and effort could have been spent implementing new things for the public to look at. Fortunately, we're not a startup forced to chase a hockey stick growth curve, nor do we have a bunch of big tech execs in our board of directors pressuring us to implement things in the order that pleases them the most. No [down rounds](https://www.investopedia.com/terms/d/downround.asp) for us, nor quarterly GitHub Star quotas to meet.

When we started this work [we knew perfectly well](https://kristoff.it/blog/maintain-it-with-zig/) that rewrites are really, really hard and we chose to pay this price now in order to invest in better foundations for the future. A two year slowdown is nothing compared to the increased productivity that the new codebase will afford us moving forward. Similarly, we need reliable infrastructure if we want to be serious about our goal of creating a compiler that can support sub-millisecond incremental rebuilds of arbitrarily large codebases.

In a sense, this is the main theme of the Zig project: by tackling technical issues from the ground up, we gain a level of control that would otherwise be impossible to have. Sometimes that's a flashy adventure down unexplored paths, some other times it's a matter of putting in a lot of work, plain and simple.


## Thank you to our sponsors

This work would have never been possible without the support from our sponsors. We are deeply thankful to all those who have [donated to the Zig Software Foundation](https://ziglang.org/zsf), and to those who have been following along despite the lack of shiny new features to play with every other week.

Your patience is about to pay off.

<blockquote class="twitter-tweet"><p lang="en" dir="ltr">I&#39;m typing up the notes for the upcoming <a href="https://twitter.com/ziglang?ref_src=twsrc%5Etfw">@ziglang</a> release (Nov 1). Sooooooooo much time was sunk into the self-hosted compiler.<br><br>Y&#39;all who joined recently have no idea what&#39;s about to hit you when that development effort is redirected towards other parts of the project.</p>&mdash; Andrew Kelley (@andy_kelley) <a href="https://twitter.com/andy_kelley/status/1582834272796545024?ref_src=twsrc%5Etfw">October 19, 2022</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script> 
