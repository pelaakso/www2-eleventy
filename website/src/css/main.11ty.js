const hashCss = require("../lib/hashCss");
const hash = require("../lib/hashing");

const fs = require("fs");
const path = require("path");

const postcss = require("postcss");
const autoprefixer = require("autoprefixer");
const postcss_import = require("postcss-import");
const tailwindcss = require("tailwindcss");

class Css {
  constructor() {
    this.processedCss = undefined;
  }

  async processCss(rawCss, rawFilePath) {
    return await postcss([tailwindcss, autoprefixer, postcss_import])
      .process(rawCss, { from: rawFilePath })
      .then((result) => result.css);
  }

  async data() {
    const cssDir = path.join(__dirname, "..", "styles");
    const rawFilePath = path.join(cssDir, "main.css");
    const rawCss = await fs.promises.readFile(rawFilePath);

    if (this.processedCss === undefined) {
      this.processedCss = await this.processCss(rawCss, rawFilePath);
    }

    const processedCss = this.processedCss;
    const hashOfProcessedCss = hash.generateHashOfInput(processedCss);

    return {
      permalink: `assets/main.${hashOfProcessedCss}.css`,
      rawFilePath,
      rawCss,
      processedCss,
    };
  }

  async render({processedCss}) {
    return processedCss;
  }
}

module.exports = Css;
