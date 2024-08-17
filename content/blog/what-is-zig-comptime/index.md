---
{
    .title = "What is Zig's Comptime?",
    .description = "Let's take a quick look at what compile-time execution looks like in Zig.",
    .author = "Loris Cro",
    .layout = "post.shtml",
    .date = @date("2019-08-05T00:00:00"),
    .custom = {},
}
---

If you've only experienced compile-time execution in the form of macros, generics or codegen, be ready to be surprised by what Zig can do.

## What is Zig

Zig is a new general-purpose programming language developed by Andrew Kelley. While still under heavy development, I think the language is already showing great promise. Zig aims to be a better C, similarly to how Rust can be understood as a better C++, generally speaking. Zig has no garbage collection, no built-in event loops, nor other runtime machinery of that level. It's lean just like C, and in fact it can interoperate with C pretty easily. For a complete overview checkout https://ziglang.org. 

Now that you got a general idea about the level of abstraction in which Zig operates, you won't be surprised to know that there is absolutely no support for reflection at runtime; but what you can't do a runtime, you can certainly do at compile-time.

## Running code at compile-time

Let's start with the basics: using the `comptime` keyword to run arbitrary code at compilation-time.

#### Compile-time function calls

The following code uses a function to decide the length of a statically-allocated array.

```zig {hl_lines=[6]}
fn multiply(a: i64, b: i64) i64 {
    return a * b;
}

pub fn main() void {
    const len = comptime multiply(4, 5);
    const my_static_array: [len]u8 = undefined;
}
```

Note how the function definition doesn't have any attribute that states it must be available at compile-time. It's just a normal function, and we request its compile-time execution at the call site.

#### Compile-time blocks

You can also use `comptime` to define a compile-time block inside a function. The following example is a case-insensitive string compare function that is optimized for the use-case where one of the two strings is hardcoded. Compile-time execution ensures that the function doesn't get misused.

```zig {hl_lines=["4-11"]}
// Compares two strings ignoring case (ascii strings only).
// Specialzied version where `uppr` is comptime known and *uppercase*.
fn insensitive_eql(comptime uppr: []const u8, str: []const u8) bool {
    comptime {
        var i = 0;
        while (i < uppr.len) : (i += 1) {
            if (uppr[i] >= 'a' and uppr[i] <= 'z') {
                @compileError("`uppr` must be all uppercase");
            }
        }
    }
    var i = 0;
    while (i < uppr.len) : (i += 1) {
        const val = if (str[i] >= 'a' and str[i] <= 'z')
            str[i] - 32
        else
            str[i];
        if (val != uppr[i]) return false;
    }
    return true;
}

pub fn main() void {
    const x = insensitive_eql("Hello", "hElLo");
}
```

Compilation of this program fails and produces the following output.

```
$ zig build-exe ieq.zig                                       
/Users/loriscro/ieq.zig:8:17: error: `uppr` must be all uppercase
                @compileError("`uppr` must be all uppercase");
                ^
/Users/loriscro/ieq.zig:24:30: note: called from here
    const x = insensitive_eql("Hello", "hElLo");

```

#### Compile-time code elision

Zig can statically resolve control flow expressions that depend on compile-time known values. For example, you can force loop unrolling on `while` / `for` loops and elide branches from `if` / `switch` statements. The following program asks the user for a number and then iteratively applies a list of operations to it:

```zig {hl_lines=["21-27"]}
const builtin = @import("builtin");
const std = @import("std");
const fmt = std.fmt;
const io = std.io;

const Op = enum {
    Sum,
    Mul,
    Sub,
};

fn ask_user() !i64 {
    var buf: [10]u8 = undefined;
    std.debug.warn("A number please: ");
    const user_input = try io.readLineSlice(buf[0..]);
    return fmt.parseInt(i64, user_input, 10);
}

fn apply_ops(comptime operations: []const Op, num: i64) i64 {
    var acc: i64 = 0;
    inline for (operations) |op| {
        switch (op) {
            .Sum => acc +%= num,
            .Mul => acc *%= num,
            .Sub => acc -%= num,
        }
    }
    return acc;
}

pub fn main() !void {
    const user_num = try ask_user();
    const ops = [4]Op{.Sum, .Mul, .Sub, .Sub};
    const x = apply_ops(ops[0..], user_num);
    std.debug.warn("Result: {}\n", x);
}
```

The interesting part of this code is the `for` loop. The `inline` keyword forces loop unrolling, and inside the loop's body there is a `switch` statement that also gets resolved at compile-time. In short, the invocation of `apply_ops` in the previous example basically resolves to:

```zig
var acc: i64 = 0;
acc +%= num;
acc *%= num;
acc -%= num;
acc -%= num;
return acc;
```

To test that this is really what's happening, paste the program code in https://godbolt.org, select Zig as target language, and then select a version of Zig greater than 0.4.0 (at the moment of writing you must select "zig trunk"). Godbolt will compile the code and show you the generated assembly. Right-click on a line of code, and a contextual menu will let you jump to the assembly code that the line corresponds to. You will notice that neither the `for` loop, nor the `switch` correspond to any assembly. Remove the `inline` keyword, and they will now show up.

## Generics

The `comptime` keyword indicates code regions and values that must be resolved at compile-time. In the previous examples we used it to perform something similar to template metaprogramming, but it can also be used for generic programming, since types are valid compile-time values.

#### Generic functions

Since generic programming is tied to `comptime` arguments, Zig doesn't have the *traditional* diamond bracket syntax. Other than that, basic usage of generics is very similar to other languages. The following code is Zig's implementation of `mem.eql`, taken from the standard library. It's used to test two slices for equality.

```zig
/// Compares two slices and returns whether they are equal.
pub fn eql(comptime T: type, a: []const T, b: []const T) bool {
    if (a.len != b.len) return false;
    for (a) |item, index| {
        if (b[index] != item) return false;
    }
    return true;
}
```

As you can see, `T` is a variable of type `type` and the subsequent arguments use it as a generic parameter. This way it's possible to use `mem.eql` with any kind of slice.

It's also possible to do introspection on values of type `type`. In a previous example we parsed an integer number from user input and requested a specific type of integer. The parsing function uses that information to elide some code from its generic implementation.

```zig {hl_lines=[6]}
// This is the line in `apply_ops` where we parsed a number
return fmt.parseInt(i64, user_input, 10);

// This is the stdlib implementation of `parseInt`
pub fn parseInt(comptime T: type, buf: []const u8, radix: u8) !T {
    if (!T.is_signed) return parseUnsigned(T, buf, radix);
    if (buf.len == 0) return T(0);
    if (buf[0] == '-') {
        return math.negate(try parseUnsigned(T, buf[1..], radix));
    } else if (buf[0] == '+') {
        return parseUnsigned(T, buf[1..], radix);
    } else {
        return parseUnsigned(T, buf, radix);
    }
}
```

#### Generic structs

Before describing how to create generic structs, here's a brief introduction on how structs work in Zig.

```zig
const std = @import("std");
const math = std.math;
const assert = std.debug.assert;

// A struct definition doesn't include a name.
// Assigning the struct to a variable gives it a name.
const Point = struct {
    x: f64,
    y: f64,
    z: f64,
		
    // A struct definition can also contain namespaced functions.
    // This has no impact on the struct layout.
    // Struct functions that take a Self parameter, when
    // invoked through a struct instance, will automatically
    // fill the first argument, just like methods do.
    const Self = @This();
    pub fn distance(self: Self, p: Point) f64 {
        const x2 = math.pow(f64, self.x - p.x, 2);
        const y2 = math.pow(f64, self.y - p.y, 2);
        const z2 = math.pow(f64, self.z - p.z, 2);
        return math.sqrt(x2 + y2 + z2);
    }
};

pub fn main() !void {
    const p1 = Point{ .x = 0, .y = 2, .z = 8 };
    const p2 = Point{ .x = 0, .y = 6, .z = 8 };
    
    assert(p1.distance(p2) == 4);
    assert(Point.distance(p1, p2) == 4);
}

```

We're now ready to talk about generic structs. To create a generic struct, all you have to do is create a function that takes a type argument and use that argument in your struct definition. Here's an example lifted from Zig's documentation. It's a doubly-linked intrusive list.

```zig
fn LinkedList(comptime T: type) type {
    return struct {
        pub const Node = struct {
            prev: ?*Node = null,
            next: ?*Node = null,
            data: T,
        };

        first: ?*Node = null,
        last: ?*Node = null,
        len: usize = 0,
    };
}
```

The function returns a `type`, which means it can only be called at comptime. It defines two structs:

- The main `LinkedList` struct
- The `Node` struct, namespaced inside the main struct

Just like structs can namespace functions, they can also namespace variables. This is especially useful for introspection when creating composite types. Here's how `LinkedList` can be composed with our previous `Point` struct.

```zig
// To try this code, paste both definitions in the same file.
const PointList = LinkedList(Point);
const p = Point{ .x = 0, .y = 2, .z = 8 };

var my_list = PointList{};

// A complete implementation would offer an `append` method.
// For now let's add the new node manually.
var node = PointList.Node{ .data = p };
my_list.first = &node;
my_list.last = &node;
my_list.len = 1;
```

The Zig standard library contains [a couple of fleshed out implementations of linked lists](https://github.com/ziglang/zig/blob/ddf7942aaa6a41296d9338423dcdfb93b915e4df/std/linked_list.zig).

## Compile-time reflection

Now that we have covered all the basics, we can finally move onto the things that make Zig metaprogramming truly powerful and fun to use. 

We already saw an example of reflection when `parseInt` was checking `T.is_signed`, but in this section I want to focus on a more advanced usage of reflection. I'll introduce the concept with a code sample.

```zig 
fn make_couple_of(x: anytype) [2]@typeOf(x) {
    return [2]@typeOf(x) {x, x};
}
```

This -- mostly useless -- function can take any value as input and creates an array that contains two copies of it. The following invocations are all correct.

```zig
make_couple_of(5); // creates [2]comptime_int{5, 5}
make_couple_of(i32(5)); // creates [2]i32{5, 5}
make_couple_of(u8); // creates [2]type{u8, u8}
make_couple_of(type); // creates [2]type{type, type}
make_couple_of(make_couple_of("hi")); 
// creates [2][2][2]u8{[2][2]u8{"hi","hi"}, [2][2]u8{"hi","hi"}}
```

Arguments of type `anytype` are very powerful and allow construction of optimized and yet "dynamic" functions. For the next example I'll lift some more code from the standard library to showcase a more useful use of this functionality.

The following code is the implementation of `math.sqrt`, which we used in a previous example to compute the euclidean distance between two points.

```zig {hl_lines=[11]}
// I moved part of the original definition to
// a separate function for better readability.
fn decide_return_type(comptime T: type) type {
    if (@typeId(T) == TypeId.Int) {
        return @IntType(false, T.bit_count / 2);
    } else {
        return T;
    }
}

pub fn sqrt(x: anytype) decide_return_type(@typeOf(x)) {
    const T = @typeOf(x);
    switch (@typeId(T)) {
        TypeId.ComptimeFloat => return T(@sqrt(f64, x)),
        TypeId.Float => return @sqrt(T, x),
        TypeId.ComptimeInt => comptime {
            if (x > maxInt(u128)) {
                @compileError(
                	"sqrt not implemented for " ++ 
                	"comptime_int greater than 128 bits");
            }
            if (x < 0) {
                @compileError("sqrt on negative number");
            }
            return T(sqrt_int(u128, x));
        },
        TypeId.Int => return sqrt_int(T, x),
        else => @compileError("not implemented for " ++ @typeName(T)),
    }
}
```

The return type of this function is a bit peculiar. If you look at the signature of `sqrt`, it's calling a function in the place where it should be declaring the return type. This is allowed in Zig. The original code actually inlines an `if` expression, but I moved it to a separate function for better readability. 

So what is `sqrt` trying to do with its return type? It's applying a small optimization when we're passing in an integer value. In that case the function declares its return type as an **unsigned** integer with **half the bit size** of the original input. This means that, if we're passing in an `i64` value, the function will return an `u32` value. This makes sense given what the square root function does. The rest of the declaration then uses reflection to further specialize and report compile-time errors where appropriate.

## In conclusion

Compile-time execution is great, especially when the language is very expressive. Without good compile-time metaprogramming, one must resort to macros or codegen, or worse, do a lot of useless work at runtime. 

If you want to see one more cool example of what can be done at compile-time in Zig, [take a look at this blog post by Andrew himself](https://andrewkelley.me/post/string-matching-comptime-perfect-hashing-zig.html). In it, he uses some the aforementioned techniques to generate a perfect hashing function for a compile-time known list of strings. The result is that the user can create a switch that matches strings in `O(1)`. The code is very easy to understand, and he offers some insight on how all the other minor features make user abstractions easy, fun and safe to use.
