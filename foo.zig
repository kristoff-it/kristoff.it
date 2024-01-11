const std = @import("std");

pub fn main() !void {
    try std.fs.cwd().rename("banana", "test/");
}
