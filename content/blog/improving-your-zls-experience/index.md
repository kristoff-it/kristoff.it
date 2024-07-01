---
{
    .title = "Improving Your Zig Language Server Experience",
    .description = "...by adding just a few lines to your <code>build.zig</code>",
    .author = "Loris Cro",
    .layout = "post.html",
    .date = @date("2024-07-01T00:00:00"),
    .draft = false,
}
---

The Zig ecosystem is still growing and a lot of important building blocks have not yet reached their final form. 

One notable example is the current language server situation: [ZLS](https://github.com/zigtools/zls) is a brilliant community effort, capable of keeping up with language changes (they have a few clever ways to automate the process), but that has one big flaw: it is not able to resolve complex comptime expressions.

The result is that ZLS is able to give you parser-level diagnostics (which go from syntax errors up to unused variable errors), but it's not able to show you errors when you try to pass an argument of the wrong type to a function or try to assign a `usize` to a `f64`...

...or does it?


## Getting Build-On-Save Diagnostics From ZLS

ZLS can be configured to run your build script on save. If that results in build errors, ZLS will be able to display those in your editor like any other diagnostic.


**With this system in place you won't need to alt-tab into another terminal tab to see build errors anymore.** 

Here's how to do it.

### 1. Configure ZLS to run a build step on save

<span style="height: 10px;"></span>
> **WARNING**: note that if you get ZLS through your editor's package manager, you might need to see how you're expected to provide your config options, as that might differ from the normal procedure described below.

Run the ZLS executable and have it tell you where the config file is located:

```
$ zls --show-config-path
/home/kristoff/.config/zls.json
```

Note that on other OSs you might get a radically different answer (eg on macOS the config file is under "Application Support").

Once you have the path, edit your config file to include the following keys:

```zig
{
  "enable_build_on_save": true,
  "build_on_save_step": "check"
}
```
The second setting doesn't have to be necessarily `"check"`, and in fact not defining it will default to running the `install` step of your build script, but we'll see in a moment why it's convenient to have a dedicated step for this.


### 2. Add a check step to your build.zig

This part is more deeply tied to your specific project but the gist is the following: whatever you do to define your main executable / module / library, you do it again in a new step named check.

I'll use for this example the executable definiton step you get generated automatically from `zig init`.

```zig
// This is an example executable definition, 
// no need to copy it.
const exe = b.addExecutable(.{
    .name = "foo",
    .root_source_file = b.path("src/main.zig"),
    .target = target,
    .optimize = optimize,
});

// Any other code to define dependencies would 
// probably be here.

b.installArtifact(exe);


// This is where the interesting part begins.
// As you can see we are re-defining the same
// executable but we're binding it to a 
// dedicated build step.
const exe_check = b.addExecutable(.{
    .name = "foo",
    .root_source_file = b.path("src/main.zig"),
    .target = target,
    .optimize = optimize,
});

// Any other code to define dependencies would 
// probably be here.


// These two lines you might want to copy
// (make sure to rename 'exe_check')
const check = b.step("check", "Check if foo compiles");
check.dependOn(&exe_check.step);
```

The most important part about this second executable definition is
that we ask to build it, **but we never install it**. If you look at
the final line of the first section, you will see that we call `b.installArtifact` on the original executable, but for the executable bound to the "check" step, we don't.

This one-line difference will have a big impact on the resulting behavior of the build as it will add the `-fno-emit-bin` flag to the compiler invocation which, in other words, means that Zig will analyze your code (and report any error) but it won't bother calling into LLVM since you don't plan to install the executable anyway.

The result is that you will get diagnostics pretty fast since you won't have to go through the "LLVM Emit Code..." phase.

Once you're done with this, restart your editor (or at least ZLS), **save your file with an error in it**, and enjoy your new spiffy diagnostics.

## It Only Gets Better

With a handful of changes you can get closer to a complete developer experience, but this is not the end.

The Zig project is still busy working on key compiler infrastructure and it will take a bit more time before we'll be able to do better than what ZLS can already do today, but **it's definitely on our roadmap to give developers best in class dev tools, just like Zig is already providing you with a state of the art compiler toolchain**.

The next big item on our roadmap is removing LLVM from our debug build pipeline to **massively** speed up debug builds. After that, incremental compilation will turn those speed ups into instant rebuilds of arbitrarily big projects. To achieve this second goal we plan to have the compiler stay on between compilations in order to keep in memory all the necessary state to re-analyze, re-compile and patch into the final executable only the parts of your project that changed.

Once this system is in place, we plan to have the Zig compiler answer all kinds of questions about the compiled project including (but definitely not limited to) what an LSP would need to provide code intelligence features.

Until we get there, ZLS is filling in the void in a beautiful manner and I'm personally deeply thankful to all the community members who have worked on it over time, starting from the late Alex Naskos.

If you want to help us get faster to a complete developer experience, [consider donating to the Zig Software Foundation](https://ziglang.org/zsf/). Earlier this year Andrew [published our finances](https://ziglang.org/news/2024-financials/) and more than 90% of our income goes to paying developers working on the Zig project, making your donation a genuinely effective way to get us faster to v1.0.
