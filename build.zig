const std = @import("std");
const zine = @import("zine");

pub fn build(b: *std.Build) !void {
    try zine.addWebsite(b, .{
        .title = "Loris Cro's Blog",
        .host_url = "https://kristoff.it",
        .layouts_dir_path = "layouts",
        .content_dir_path = "content",
        .static_dir_path = "static",
    });
}
