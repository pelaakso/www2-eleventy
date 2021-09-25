const fs = require("fs");
const eleventyNavigationPlugin = require("@11ty/eleventy-navigation");
const eleventySyntaxHighlightPlugin = require("@11ty/eleventy-plugin-syntaxhighlight");
const { DateTime } = require("luxon");


module.exports = function(eleventyConfig) {
  // _site is also the 11ty default
  const outputDirectory = "_site";

  // Add plugins
  eleventyConfig.addPlugin(eleventyNavigationPlugin);
  eleventyConfig.addPlugin(eleventySyntaxHighlightPlugin);

  // Copy some resource to the output as-is
  //eleventyConfig.addPassthroughCopy(`**/*.png`);

  // Override Browsersync defaults (used only in local development with --serve)
  // - make 404 error pages work in local development
  eleventyConfig.setBrowserSyncConfig({
    callbacks: {
      ready: function(err, browserSync) {
        const content_404 = fs.readFileSync(outputDirectory + '/404.html');

        browserSync.addMiddleware("*", (req, res) => {
          // Provides the 404 content without redirect.
          res.writeHead(404, {"Content-Type": "text/html; charset=UTF-8"});
          res.write(content_404);
          res.end();
        });
      },
    },
    ui: false,
    ghostMode: false
  });

  // https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#valid-date-string
  eleventyConfig.addFilter('htmlDateString', (dateObj) => {
    return DateTime.fromJSDate(dateObj, {
      zone: 'utc'
    }).toFormat('yyyy-MM-dd');
  });

  eleventyConfig.addFilter("readableDate", dateObj => {
    return DateTime.fromJSDate(dateObj, {
      zone: 'utc'
    }).toFormat("d.M.yyyy");
  });

  return {
    // Control which files Eleventy will process
    // e.g.: *.md, *.njk, *.html, *.liquid
    templateFormats: [
      "md",
      "njk",
      "html",
      "liquid",

      // This is a hack suggested by Eleventy documentation to enable pass through copy.
      // Note that eleventyConfig.addPassthroughCopy() interferes with webpack ATM.
      "png",
      "jpg",
      "gif"
    ],

    // -----------------------------------------------------------------
    // If your site deploys to a subdirectory, change `pathPrefix`.
    // Don’t worry about leading and trailing slashes, we normalize these.

    // If you don’t have a subdirectory, use "" or "/" (they do the same thing)
    // This is only used for link URLs (it does not affect your file structure)
    // Best paired with the `url` filter: https://www.11ty.dev/docs/filters/url/

    // You can also pass this in on the command line using `--pathprefix`

    // Optional (default is shown)
    pathPrefix: "/",
    // -----------------------------------------------------------------

    // Pre-process *.md files with: (default: `liquid`)
    markdownTemplateEngine: "njk",

    // Pre-process *.html files with: (default: `liquid`)
    htmlTemplateEngine: "njk",

    dir: {
      input: 'src',
      output: outputDirectory,
      // These are all optional (defaults are shown):
      includes: "_includes",
      data: "_data",
    }
  };
};
