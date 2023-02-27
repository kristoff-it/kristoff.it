---
title: Zig's Curious Multi-Sequence For Loops
date: "2023-02-27T00:00:00"
draft: false
---

Zig has just gained new for loop syntax that allows
you to iterate on multiple slices / arrays at the same time. 
In this blog post I'm going to explain in detail the 
rationale behind this choice, while also introducing 
you to a couple useful patterns that the syntax is 
meant to encourage.

If you want to try it out, you will need an unstable 
build of Zig, which you can get from 
[the downloads page](https://ziglang.org/download/).


## Basic syntax

The most basic for loop syntax in Zig is still the 
same as before.

```zig
const elems = [4]usize{ 10, 20, 30, 40 };

for (elems) |x| {
   std.debug.print("{} ", .{x});
}
```

This prints:

```
10 20 30 40 
```

If you're new to Zig, you might be surprised 
by the `|x|` syntax. That's called a capture 
in Zig and in the case of `for` loops is how 
you can, well, _capture_ the iteration value 
and give it a name.

### Ranges

The new syntax also supports ranges, which are 
a new construct in Zig.

```zig
for (0..4) |n| {
   std.debug.print("{} ", .{n});
}
```

This prints:

```
0 1 2 3 
```

Ranges can also start from something other than zero.

```zig
for (1..5) |n| {
   std.debug.print("{} ", .{n});
}
```

This prints:

```
1 2 3 4 
```

Ranges can only exist as an argument to a `for` loop. This means that you can't store them in variables, but you can use variables to specify their bounds.

```zig
var a: usize = 10;
var b: usize = 15;

for (a..b) |n| {
   std.debug.print("{} ", .{n});
}
```

This prints:

```
10 11 12 13 14
```

## Multi-sequence syntax

The new multi-sequence syntax allows you to loop over 
two or more arrays or slices at the same time:

```zig
var elems = [_][]const u8 { "water", "earth", "fire", "air" };
var nats = [_][]const u8 { "tribes", "kingdom", "nation", "nomads" };

for (elems, nats) |e, n| {
   std.debug.print("{s} {s}\n", .{e, n});
}
```

This prints:

```
water tribes
earth kingdom
fire nation
air nomads
```

There's only one simple rule when it comes to the 
length of the sequences: **all lengths must match**. 
Passing arrays of different length is safety-checked 
UB (i.e. you will get a panic in safe release modes).


## Ranges as indexes

To iterate over a sequence and also keep track of the 
element's index, you can add a range to the list of 
sequences you want to iterate. **Since all sequences 
must have the same length, you can omit the upper end 
of the range and let Zig automatically infer it from 
the other sequences**.

```zig
var elems = [_][]const u8 { "water", "earth", "fire", "air" };
var nats = [_][]const u8 { "tribes", "kingdom", "nation", "nomads" };

for (elems, nats, 0..) |e, n, idx| {
   std.debug.print("{} - {s} {s}\n", .{idx, e, n});
}
```

This prints:

```
0 - water tribes
1 - earth kingdom
2 - fire nation
3 - air nomads
```


## Other properties of `for` loops

Up until now we saw the new changes to `for` loops, 
but if you're new to Zig you might not know all the 
other things they support, so I'll quickly recap 
them in this section.

### Pointer to the element

Value captures in Zig should always be understood as
 immutable copies. To ask for a pointer you can add 
a `*` before the capture name.

```zig
var good_digits: [3]usize = .{4, 2, 0};

for (&good_digits) |*d| {
   d.* = 6;
}

// for (good_digits) |d| {
//    d = 6;
// }
//
// error: cannot assign to constant
//     	d = 6;
//     	^
```

### Labels, `break` and `continue`

You can give labels to loops, which helps breaking 
and continuing iteration at the right level.

```zig
const vowels = "aeiou";
const text = "lorem ipsum";
var missing = false;

outer: for (vowels) |v| {
   for (text) |x| {
      if (x == v) continue :outer;
   }
   missing = true;
   break :outer;
}
```

### `else` for `for` loops

In Zig you can give an `else` branch to a `for` loop. 
The `else` branch triggers when the loop ends naturally, 
as opposed to breaking from it. 

This models beautifully searching for an element in a 
sequence: if the element is found, you will `break` 
from the loop, while if it's not found then the loop 
will end naturally, at which point the `else` branch 
will allow you to implement the "not found" case.

`for` loops can also be used as expressions, which 
works particularly well in this case.

```zig
const text = "abcdef";
const needle = 'e';

const match: ?usize = for (text, 0..) |x, idx| {
   if (x == needle) break idx;
} else null;
```

### Inlined `for` loops

It's possible to operate on heterogeneous sequences 
of values with `for` loops when doing comptime 
metaprogramming. You can learn more in 
[this old blog post](https://kristoff.it/blog/what-is-zig-comptime/) 
of mine.

## Multi-sequence `for` loops and data oriented design (DOD)

Say that you have a game where each monster has an 
element type, a counter for hit points, and a unique 
"dna" string used to procedurally generate stats for 
each monster's offspring (and to give an early taste 
of how it feels to play with slot machines to young 
kids).

```zig
const Monster = struct {
   elem_type: enum{ fire, water, air, earth },
   hp: usize,
   dna: [33]u8, // gambling department demands 
                // we use exactly 33 bytes
};
```

First of all, you would probably want the in-memory 
representation of this struct to place `hp` at the 
top of the struct in order to avoid the need for 
padding inside the struct to maintain its natural 
alignment (because its type is `usize`, which has 
8 byte alignment on common 64bit machines).

Luckily, this is done automatically by Zig (you can 
use a `extern struct` if you want field ordering to 
work like in C), but even then, the struct has 
alignment 8 and size 42, which means that it needs 
6 bytes of padding at the end to keep the alignment 
consistent in an array (ie `@sizeOf([2]Monster) == 96`), 
so in the end some padding is inevitable given the size 
of our fields. 6 bytes might not seem much, but it does 
mean that each monster instance wastes roughly 15% of 
its size just for padding.

One technique that lets us prevent that waste is to avoid 
representing our monsters as an array of structs (AoS), and 
instead "deconstruct" them into multiple arrays, one per 
field (also known as struct-of-arrays, SoA):

```zig
monster_hps: []usize,
monster_dnas: [][33]u8,
monster_elem_types: []enum{ fire, water, air, earth },
```

This memory layout wastes no bytes and also lets us 
operate more efficiently on our data. 

Let's say that `fire` monsters gain one hit point every 
tick of our game. This means that every tick we want to 
look at each monster's `elem_type` and based on that we 
increment its `hp` by one. 

If we were to do this with the original array-of-structs 
layout, for each monster we would have to load from 
memory 39 bytes of data that we don't care about (33 
from the `dna` field, plus 6 of padding) over the 9 
bytes that we do need. That's a waste rate of more than 400%!

With the struct-of-arrays layout we only load from memory 
data that we do care about, which can have a tremendous 
effect on performance.

```zig
for (monster_elem_types, monster_hps) |et, *hp| {
   if (et == .fire) hp.* +|= 1; // saturating addition
} 
```

The Zig standard library has `MultiArrayList`, a data 
structure that helps make DOD style programming even 
more ergonomic. [Here you can read more about it](https://zig.news/kristoff/struct-of-arrays-soa-in-zig-easy-in-userland-40m0).

## Hoisting safety checks

In low-level programming languages, accessing an array 
item corresponds to adding an offset to a pointer value 
and then dereferencing it. This operation is very fast 
but, if the logic is wrong, one could end up reading 
past the end of an array and the program wouldn't even 
notice. 

In Zig out-of-bounds array accesses are safety-checked 
in safe build modes which means that the compiler adds 
a hidden assertion whenever an array access is about 
to happen.

```zig
var idx: usize = 5;
assert(idx < my_slice.len); // secretly added by the compiler
_ = my_slice[idx];
```

If we were to implement the previous game feature 
(fire monsters getting 1 hp every tick) without 
multi-sequence `for` loops, we would have to do 
something like this:

```zig
var idx: usize = 0;

while (idx < monster_count) : (idx += 1) {
   const et = monster_elem_types[idx]; // potential oob
   const hp = &monster_hps[idx]; // potential oob

   if (et == .fire) hp.* +|= 1;
} 
```

Unfortunately, the Zig compiler would have to insert 
two hidden assertions with this version of the code: 
one before the assignment to `et`, and one before 
the assignment to `hp`. 

In the multi-sequence `for` loop version it's only 
necessary to test once at the beginning of the loop 
that the two arrays have equal size, instead of 
having 2 assertions run every loop iteration. The 
multi-sequence `for` loop syntax helps convey 
intention more clearly to the compiler, which in turn 
lets it generate more efficient code. 

Of course, with sophisticated-enough static analysis 
the compiler could prove that `monster_count` is 
always equivalent to `monster_elem_types.len` and 
`monster_hps.len`, and thus it could elide the 
assertions, but static analysis slows compilation 
times and tends to be a fragile thing, like 
[this amazing blog post about loop optimizations in C#](https://leveluppp.ghost.io/loop-optimizations-in-various-compilers/) shows. 

**Multi-sequence `for` loop syntax doesn't slow down 
compilation times and guarantees that you get good 
performance also in debug builds, where advanced 
optimizations are disabled and compilation times 
matter the most.**


## Conclusion

Zig is already a compelling programming language and 
toolchain, but there's more design space to explore 
ahead of us before we can tag v1.0. 

We [recently self-hosted the compiler](https://kristoff.it/blog/zig-self-hosted-now-what/) and [optimized our development process](https://ziglang.org/news/goodbye-cpp/) 
in order to make it as smooth as possible to explore 
new design ideas like multi-sequence `for` loops.

Zig describes itself as a programming language for 
maintaining **robust**, **optimal** and **reusable** 
code, and multi-sequence for loops are a shining 
example of how the language tries to strike a 
compelling balance between clarity, performance and safety.

Comptime metaprogramming allows us to have 
`std.MultiArrayList`, [a userland implementation of AoS/SoA transformation](https://zig.news/kristoff/struct-of-arrays-soa-in-zig-easy-in-userland-40m0), 
which makes it easier to do DOD-style programming, while 
multi-sequence `for` loops ensure that we get all the 
safety of out-of-bounds checks without impacting runtime 
performance nor compromising on compilation times.

If you like where we're going, please consider 
[sponsoring the Zig Software Foundation](https://ziglang.org/zsf/).
