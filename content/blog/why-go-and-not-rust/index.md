---
{
  "title": "Why Go and not Rust?",
  "description": "What's the role of Go in a universe where Rust exists?", 
  "author": "Loris Cro",
  "layout": "post.html",
  "date": "2019-09-10T00:00:00",
  "draft": false
}
---
Imagine you're a developer who mainly works with Go. You go to an event and, while chatting with some people, you decide to share with them the news that you wrote a small tool that does *something*. You claim that since you wrote it in Go, it's fairly fast, it's a single binary, etc. The group seems pleased with your recount and you start feeling good, but then you notice a stranger approaching from behind. A bone-chilling wind blows and you hear: "Why Go and not Rust?"

You start feeling less good. Well, you could answer that Go is what you know, so that's what you used to solve your problem, but that's probably not going to be a satisfactory answer. You were pridefully talking about how fast your tool was in the first place, and it's obvious that the stranger is going to counter your simplistic excuse with all the great benefits that Rust brings over Go.

You start feeling bad. Why did you choose to learn Go in the first place? You were told that Go is fast and that it has great concurrency primitives, and now Rust comes along and everybody is saying that Rust is better in every aspect. Were they lying before or are they lying now? While there is no single language to rule them all, you know that it's still possible to make bad choices and end up in a technological cul de sac. After all, you did choose Go over *that* other language a few years ago and you were pretty pleased with the routine of joining circles to ask "Why *that* and not Go?"

----

While the story above is 100% the result of my imagination, it's no secret that the Rust fandom has a few *overexcited* members who feel compelled to enlighten every lost soul about the virtues of the Crab-God. This isn't really Rust's fault, every successful project will have misbehaving followers, it's inevitable. While everyone has to deal with these people, I feel that Go developers are particularly susceptible to their behavior because of how much Rust's and Go's [messaging](https://courses.lumenlearning.com/ivytech-mktg101-master/chapter/reading-defining-the-message/) overlap.

Go is fast, but Rust is faster.  

Go has an efficient garbage collector, but Rust has static memory management.  

Go has great concurrency support, but Rust has provably-correct concurrency.

Go has interfaces, but Rust has traits and other zero-cost abstractions.

If you're a Go developer you might feel a bit cheated. In contrast, Python developers are not particularly fazed by Rust. They know that Python is in many ways slow and inefficient, and they're fine with that because they know Python's role: make the code easy to write and offload to C when performance matters.

What about Go? 

## Go is very good for writing services

Go was created at Google to solve Google problems, which mostly involves dealing with networked services. Go's concurrency model is a good fit for server-side applications that must primarily handle multiple independent requests, rather than participate in complex result-passing schemes. This is one reason why you're given `go` and not `await`.

Go has great support for HTTP and related protocols and it doesn't take long to write a satisfactory web service. In my personal projects, Go proved to be a good alternative to Node.js, especially in situations where I wanted to pin down the interfaces between different components more explicitly than you would do while writing idiomatic JavaScript.

On top of that, it has great tooling to diagnose concurrency and performance problems, and cross-compilation makes deploying on whichever platform a breeze.

## Go is unapologetically simple

Go takes great pride in offering a limited set of features built-in the language. This makes Go easy to learn and, even more importantly, it ensures that Go projects remain understandable even when growing in size.  The creators of Go like to call it a "boring" language. While we could debate whether the language could use one or two extra things, the idea of forcing people to "do more with less" has proven to be very successful.

Rust can indeed be as good as Go at doing web services, or even better, but it really cannot beat Go in terms of simplicity. And it's not just simplicity, Go is also strict about things that other languages are usually more lax about. Go doesn't want unused variables or imports, files belonging to different packages in the same directory, etc. It even used to complain about projects saved outside of `GOPATH` (thankfully that's not the case anymore). 

Go also doesn't want any "fingerprints" in the code, so it enforces a single, universal style via `go fmt`.

In truth, none of these things alone is particularly  impressive, but they do describe the mindset that Go wants to impose. Many don't like it but, in my opinion, it's a killer feature for some types of development, like enterprise software.

## Go is great for enterprise software

As I already mentioned, Go was created to solve Google problems, and Google problems are definitely enterprise-scale problems. Whether this was the direct aim of the creators or just the natural result of using it at a Big Corp, Go is indubitably an amazing breath of fresh air in enterprise software development.

If you have experience in writing enterprise software and tried Go, you probably know what I mean. Here's a quick summary for everyone else.

Enterprise development is a very weird beast compared to other kinds of development. If you've never done it, you might ask yourself "What the hell is even enterprise software?" I did that kind of development as a consultant for a bit, so here's my take on the subject.

#### Enterprise software development is about scale

Not in terms of total number of users, or amount of data. Often that's the case too, but the defining characteristics are scale of **scope** and **process**. 

**Enterprise software always has a big scope.** The domain can be big and wide, or narrow but stupidly complex. Sometimes it's both. When creating software to model such domains, normal programming wisdom falls incredibly short because non-technological concerns out-weight most technological ones. 

**To unravel complex domains you need a well-structured process.** You need domain experts, analysts, and a mechanism that lets stakeholders gauge how much progress is being made. It's also often the case that you, the technologist, don't know the domain very well. Stakeholders and domain experts often won't understand technology very well either. 

This pushes further down technological concerns such as efficiency, **and even correctness.** Don't get me wrong, the business does care about correctness, but they have a different definition for it. When you're thinking about algorithmic correctness, they are thinking about a reconciliation back-office for the operations team they keep in a country where labor is cheap.

Because of the environment resulting from this general premise, a few well-known enterprise development "quirks" have emerged over time. I'll name three relevant to my point.

1. **There are a lot of junior developers** who learn on the job how to program and most are not lucky enough to find a job that will truly teach them anything. In some places, after you're hired, you are stationed for one week in front of PluralSight and then you're considered ready to go.
2. **Software projects quickly become huge and complex for all the wrong reasons.** Big projects take time to build and people (or whole teams) will come and go in the meantime. Constant refactoring is never an option so each will leave behind a lot of code written with very varying levels of quality. Multiple teams working in parallel will produce redundant code. The domain shifts over time, inevitably invalidating older assumptions and consequently causing abstractions to leak. The more sophisticated an abstraction is, the higher the risk that it will become a problem when business comes back with a serious change request.
3. **The toolchain is very often lousy and/or dated.** This is pretty much the inevitable result of all that I described so far. Huge amounts of old code tie you down to a specific toolset, junior developers will learn the status-quo at best, and the people on top (managers and stakeholders) are extremely often not prepared for making technological decisions based on first-hand experience, the general nature of the endeavor makes them risk-averse, causing them to mainly mimic what other successful players in their space do or, more precisely, what analysts *claim* other successful players do.

#### Go is about suppressing complexity at scale

Go makes teams more successful, partially by giving them more than what they would get with other ecosystems, and partially by taking tools away from them, to prevent common pitfalls.

**Go is much easier to learn than Java or C#.** A faster ramp-up is generally good, but it becomes fundamental when the project is lagging behind, the deadline is approaching, and management inevitably resorts to hiring more people, hoping (in vain) to speed things up.

**The Go community regards as anti-patterns many abstractions regularly employed by Java / C#**, like IoC containers, or OOP inheritance, for example. There are only two levels of visibility for variables, and the only concurrency model is CSP. It's way harder to fall into incomprehensible pitfalls when writing in Go than it is in Java / C#. 

**The Go compiler is fast.** Which means that running tests is going to be faster in general, that deployments will take less time, increasing the overall productivity.

With Go, it's easier as a junior developer to be more productive, and harder as a mid-level developer to introduce brittle abstractions that will cause problems down the line.

For these reasons, Rust is less compelling than Go for enterprise software development. That doesn't mean that Go is perfect, or that it's not true that Rust has some advantages over Go. Rust has many advantages over Go, but more than anything, I would say that it's the common perception of Go that is wrong.

Go is not blazing-fast. Go is not super memory-efficient. Go doesn't have the absolutely best concurrency model. 

Go is faster than Java / C#, more memory-efficient than Java / C#, and definitely has better concurrency than Java / C#. **Go is simple so that all of this can hold true when confronting the average Go program with the average Java / C# program.** It doesn't matter whether Go is truly faster than C# or Java in an absolute sense. The average Java / C# application will be very different than the best theoretical program, and the amount of foot guns in those languages is huge compared to Go. If you want an example, [take a look at this talk on C# concurrency](https://www.youtube.com/watch?v=J0mcYVxJEl0), it's  incredible in my opinion how the straightforward use of `await` is **never** correct. Imagine how broken must be the average asynchronous C# application. Actually, ASP.NET applications deadlocking for no apparent reason are not uncommon.

![deadlock table](1*JrvDmC-KS7iL2Aexb-lskA.png "Will it deadlock? (click to zoom)")

This image was taken from [this blog post](https://medium.com/rubrikkgroup/understanding-async-avoiding-deadlocks-e41f8f2c6f5d) that tries to explain the innumerable ways of breaking concurrency in C#.

## In conclusion

Go is a *better* Java / C#, while Rust is not. The clarity that Go can bring to enterprise software development is without a doubt much more valuable than removing garbage collection at the cost of worsening the overall productivity.

Rust is a *better* C++, and even if you occasionally hear that Go is a *better* C, well, that's just not the case. No language with a built-in garbage collector and runtime can be considered a C. And don't be mistaken, Rust is a C++, not a C. <a href="/blog/what-is-zig-comptime" class="internal">If you want a better C, take a look at Zig</a>.

Lastly, going back to our story, not all "Why not Rust" questions should be interpreted like in the example above. Sometimes the chilling wind is just in your head and the people asking the dreaded question just want to know your opinion. Let's avoid tying our identity to a single language and embrace practicality first and foremost. Tribal names like Rustacean or Gopher should be avoided, as they are inherently a marketing tool for inducing stronger branding.
