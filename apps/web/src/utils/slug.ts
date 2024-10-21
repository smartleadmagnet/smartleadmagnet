export function createSlug(name: string) {
  return name
    .toLowerCase() // Convert to lowercase
    .trim() // Remove leading and trailing spaces
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/[^\w\-]+/g, "") // Remove non-alphanumeric characters
    .replace(/\-\-+/g, "-"); // Replace multiple hyphens with a single one
}
