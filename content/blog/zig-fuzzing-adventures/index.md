---
.title = "Assertive Programming: Fuzzing an HTML Parser Written in Zig",
.description = "",
.author = "Loris Cro",
.layout = "post.shtml",
.date = @date("2024-07-05T00:00:00"),
.draft = true,
---

In this blog post I'm going to showcase the amazing power of fully instrumented fuzzing. 

Like many others, I'd heard of fuzzing before but never really explored it much. But now that I did, I can't stop. It's just too good. The experience has been so impressive that, while still riding the dopamine high, I feel compelled to make an overly exicited, overly general statement: **stop writing unit tests like a bozo and become more assertive instead**.

If you read my story to the end I will be able to give you a properly calibrated version ot the statement above.

## The problem statement
A few months ago I started working on a static site generator (more on that in a future post), which eventually led me to write an HTML language server called [SuperHTML](https://github.com/kristoff-it/superhtml). 

As part of that adventure I also discovered that, before mine, there was only one other HTML language server from vscode that provides no diagnostics whatsoever, and the "extracted" version of it (the TypeScript code bundled as a standalone NPM package) that other editors use even borks `<pre>` tags.



Contrast this with the SuperHTML experience (extended cut that shows also diagnostics and other autoformatting niceties):



Unfortunately, SuperHTML had one problem that is all too common with language servers: **it used to crash** *sometimes*.

## Stopping SuperHTML from crashing

