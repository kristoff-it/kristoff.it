---
{
    .title = "Improving Your Zig Language Server Experience",
    .description = "...by adding just a dozen of lines to your <code>build.zig</code>",
    .author = "Loris Cro",
    .layout = "post.html",
    .date = @date("2024-07-01T00:00:00"),
    .draft = false,
}
---

The Zig ecosystem is still very young and a lot of important building blocks have not yet reached their final form. 

One notable example is the current language server situation: ZLS is a brilliant community effort that is capable of keeping up with language changes (they have a few clever ways to automate the process), but that has the flaw that it is not able to resolve complex comptime expressions.

The result is that ZLS is able to give you parser-level diagnostics (which go from syntax errors up to unused variable errors), but it's not able to show you errors when you try to assign a `usize` to a `f64` variable...

...or does it?


## Getting save-on-build diagnostics from ZLS

ZLS can be configured to run your build script on save and if that results in build errors, ZLS will be able to display those in your editor like any other diagnostic.


This means that with this system in place you won't need to alt-tab into another terminal tab to see build errors anymore. Here's how to do it.

### 1. Configure ZLS to run a build step on save

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

I'll use for this example part of a build script that I wrote for an HTML LSP that I'm working on.


```zig
// Section where I define the main executable,
// present just to show you how it relates to
// the check step definition.
const super_cli = b.addExecutable(.{
    .name = "super",
    .root_source_file = b.path("src/cli.zig"),
    .target = target,
    .optimize = optimize,
});

const folders = b.dependency("known-folders", .{});
const lsp = b.dependency("zig-lsp-kit", .{});

super_cli.root_module.addImport("super", super);
super_cli.root_module.addImport(
    "known-folders",
    folders.module("known-folders"),
);
super_cli.root_module.addImport("lsp", lsp.module("lsp"));

const run_exe = b.addRunArtifact(super_cli);
if (b.args) |args| run_exe.addArgs(args);
const run_exe_step = b.step("run", "Run the Super LSP");
run_exe_step.dependOn(&run_exe.step);

b.installArtifact(super_cli);


// This is where the interesting part begins.
// As you can see we are re-defining the same
// executable but we're binding it to a 
// dedicated build step.
const super_cli_check = b.addExecutable(.{
    .name = "super",
    .root_source_file = b.path("src/cli.zig"),
    .target = target,
    .optimize = optimize,
});

super_cli_check.root_module.addImport("super", super);
super_cli_check.root_module.addImport(
    "known-folders",
    folders.module("known-folders"),
);
super_cli_check.root_module.addImport("lsp", lsp.module("lsp"));

const check = b.step("check", "Check if Super compiles");
check.dependOn(&super_cli_check.step);
```

The most important part about this second executable definition is
that we ask to build it, **but we never install it**. If you look at
the final line of the first section, you will see that we call `b.installArtifact` on the original executable, but for the executable bound to the "check" step, we don't.

This one-line difference will have a big impact on the resulting behavior of the build as it will add the `-fno-emit-bin` flag to the compiler invocation, which in other words means that Zig will analyze your code (and report any error) but it won't bother calling into LLVM since you don't plan to install the executable anyway.

The result is that you will get diagnostics pretty fast since you won't have to go through the "LLVM Emit Code..." step.

Once you're done with this, restart your editor (or at least ZLS) and enjoy your new spiffy diagnostics.

## It Only Gets Better

With a handful of changes you can get closer to a complete developer experience with Zig but this is not the end.

The Zig project is still busy working on key compiler infrastructure and it will take a bit more time before we'll be able to do better than what ZLS can do today, but it's definitely on our roadmap to give developers best in class dev tools, just like Zig is already providing a state of the art compiler toolchain.

The next big item on our roadmap is removing LLVM from our debug build pipeline to **massively** speed up debug builds, after that incremental compilation will turn those speed ups into instant rebuilds of arbitrarily big projects. To achieve this second goal we plan to have the compiler stay on between compilations in order to keep in memory all the necessary state to re-analyze, compile and patch into the final executable only the parts of your project that changed.

Once this system is in place, we plan to have the Zig compiler answer all kinds of questions about the compiled project including (but definitely not limited to) what an LSP would need to provide code intelligence features.

Until we get there, ZLS is filling in a void in a beautiful manner and I'm personally deeply thankful to all the community members who have worked on it over time, starting from the late Alex Naskos.

If you want to help us get faster to a complete developer experience, [consider donating to the Zig Software Foundation](https://ziglang.org/zsf/). Earlier this year Andrew [published our finances](https://ziglang.org/news/2024-financials/) and more than 90% of our income goes to paying developers working on the Zig project, making your donation a genuinely effective way to get us faster to v1.0.

*P.S. Hi Prime :^)*