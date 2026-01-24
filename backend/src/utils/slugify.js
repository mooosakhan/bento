export function slugifyHandle(input) {
  return (input || "")
    .toLowerCase()
    .trim()
    // replace spaces/underscores with hyphen
    .replace(/[\s_]+/g, "-")
    // remove non-url-safe chars
    .replace(/[^a-z0-9-]/g, "")
    // collapse multiple hyphens
    .replace(/-+/g, "-")
    // trim hyphens
    .replace(/^-|-$/g, "");
}
