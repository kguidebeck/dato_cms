require('dotenv').config();
const date = require('date-fns').format;
const fs = require('fs');
const path = require('path');

const pathsObj = {};

/* Handle Ignored URLs. */
let { IGNORED_URLS } = process.env;

if (IGNORED_URLS && typeof IGNORED_URLS === 'string') IGNORED_URLS = IGNORED_URLS.split(',');

const walkSync = (dir) => {
  // Get all files of the current directory & iterate over them
  const files = fs.readdirSync(path.resolve(__dirname, '../', dir));

  files.forEach((file) => {
    // Construct whole file-path & retrieve file's stats
    const filePath = `${dir}${file}`;
    const fileStat = fs.statSync(filePath);
    const fileName = file;

    if (fileStat.isDirectory()) {
      if (['_next', 'static', '404'].indexOf(fileName) >= 0) return;

      walkSync(`${filePath}/`);
    } else if (fileName !== 'sitemap.xml') {
      let cleanFileName = filePath
        .substr(0, filePath.lastIndexOf('.'))
        .replace('out/', '');

      if (cleanFileName.substr(cleanFileName.length - 5) === 'index') {
        cleanFileName = cleanFileName.substr(0, cleanFileName.length - 5);
      }

      if (
        (IGNORED_URLS && IGNORED_URLS.indexOf(cleanFileName.replace(/\/$/, '')) >= 0) ||
        cleanFileName === '404'
      ) return;

      // Add this file to `fileObj`
      pathsObj[`/${cleanFileName}`] = {
        page: `/${cleanFileName}`,
        lastModified: fileStat.mtime,
      };
    }
  });
};

walkSync('out/');

let sitemapXML = '<?xml version="1.0" encoding="UTF-8"?>\r\n';

sitemapXML += '\t<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\r\n';

const keys = Object.keys(pathsObj);

/* eslint-disable max-len */
keys.forEach((key) => {
  sitemapXML += '\t\t<url>\r\n';
  sitemapXML += `\t\t\t<loc>${process.env.SITE_URL}${key}</loc>\r\n`;
  sitemapXML += `\t\t\t<lastmod>${date(new Date(pathsObj[key].lastModified), 'yyyy-MM-dd')}</lastmod>\r\n`;
  sitemapXML += '\t\t</url>\r\n';
});
/* eslint-enable max-len */

sitemapXML += '\t</urlset>';

fs.writeFileSync(path.resolve(__dirname, '../', 'out/sitemap.xml'), sitemapXML);
