const std = @import("std");
const zine = @import("zine");

pub fn build(b: *std.Build) !void {
    try zine.addWebsite(b, .{
        .layouts_dir_path = "layouts-new",
        .content_dir_path = "content-new",
        .static_dir_path = "static",
    });
}
