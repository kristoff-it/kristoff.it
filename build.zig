const std = @import("std");
const zine = @import("zine");

pub fn build(b: *std.Build) !void {
    zine.website(b, .{
        .title = "Loris Cro's Blog",
        .host_url = "https://kristoff.it",
        .layouts_dir_path = "layouts",
        .content_dir_path = "content",
        .assets_dir_path = "assets",
        .static_assets = &.{
            "favicon.ico",
            "CNAME",
            ".well-known/atproto-did",
        },
        // .image_size_attributes = true,
        .debug = true,
    });
}
