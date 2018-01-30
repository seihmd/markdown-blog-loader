const matter = require('gray-matter');

function MarkdownBlogLoader(source) {
  const { data, content } = matter(source);
  return `export default ${JSON.stringify({ data, content })}`;
}

module.exports = MarkdownBlogLoader;
