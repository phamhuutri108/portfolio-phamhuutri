const markdownIt = require("markdown-it");

module.exports = function(eleventyConfig) {
  // Passthrough copy - giữ nguyên files
  eleventyConfig.addPassthroughCopy("src/style.css");
  eleventyConfig.addPassthroughCopy("src/assets");
  eleventyConfig.addPassthroughCopy("src/_redirects");
  eleventyConfig.addPassthroughCopy("src/google92ff446c62e27352.html");
  eleventyConfig.addPassthroughCopy("src/sitemap.xml");

  // YouTube Shortcode for CloudCannon
  eleventyConfig.addShortcode("youtube", function(videoId, title = "YouTube Video") {
    return `<div class="video-embed">
    <iframe width="100%" height="315" src="https://www.youtube.com/embed/${videoId}" title="${title}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>`;
  });

  // Markdown config - cho phép HTML inline
  const md = markdownIt({
    html: true,
    breaks: true,
    linkify: true
  });
  eleventyConfig.setLibrary("md", md);

  // Collections - filter out drafts
  eleventyConfig.addCollection("shortFilms", function(collectionApi) {
    return collectionApi.getFilteredByGlob("src/content/short-films/*.md")
      .filter(item => !item.data.draft)
      .sort((a, b) => (a.data.order || 999) - (b.data.order || 999));
  });

  eleventyConfig.addCollection("commercials", function(collectionApi) {
    return collectionApi.getFilteredByGlob("src/content/commercials/*.md")
      .filter(item => !item.data.draft)
      .sort((a, b) => (a.data.order || 999) - (b.data.order || 999));
  });

  eleventyConfig.addCollection("others", function(collectionApi) {
    return collectionApi.getFilteredByGlob("src/content/others/*.md")
      .filter(item => !item.data.draft)
      .sort((a, b) => (a.data.order || 999) - (b.data.order || 999));
  });

  eleventyConfig.addCollection("writings", function(collectionApi) {
    return collectionApi.getFilteredByGlob("src/content/writings/*.md")
      .filter(item => !item.data.draft)
      .sort((a, b) => new Date(b.data.date) - new Date(a.data.date));
  });

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      data: "_data"
    },
    templateFormats: ["njk", "md", "html"],
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk"
  };
};
