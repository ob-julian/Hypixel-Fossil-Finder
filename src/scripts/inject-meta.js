const fs = require("fs");
const path = require("path");
const minify = require('html-minifier').minify;

const appName = "hypixel_fosile_finder";
const metaRoutes = require("../meta.routes.json");
const distPath = path.join(__dirname, "../../dist/", appName, "browser");

const imagePath = "https://oberhofer.ddns.net/hff/favicon.ico";
const host = "https://oberhofer.ddns.net/hff";

// Function to generate meta tags
const generateMetaTags = (title, description, route) => `
    <title>${title}</title>
    <meta name="twitter:card" content="summary">
    <meta name="twitter:title" content="${title}">
    <meta name="twitter:description" content="${description}">
    <meta name="twitter:image" content="${imagePath}">
    <meta property="og:type" content="website">
    <meta property="og:title" content="${title}">
    <meta property="og:description" content="${description}">
    <meta property="og:image" content="${imagePath}">
    <meta property="og:url" content="${host}${route}">
`;

// Inject meta tags and create separate HTML files per route
Object.entries(metaRoutes).forEach(([route, meta]) => {
    let indexHtml, outputPath;
    try {
        if (route === "/") {
            indexHtml = fs.readFileSync(path.join(distPath, "index.csr.html"), "utf8");
            // adding autoredirect because it is generated as a csr file
            // not needed anymore because I ditched prerendering
            //indexHtml = indexHtml.replace("<head>", "<head>\n" + "<meta http-equiv=\"refresh\" content=\"0; url=solver\" />");
            outputPath = path.join(distPath, "index.html");
            // because we renamed the file we need to remove the old one
            fs.unlinkSync(path.join(distPath, "index.csr.html"));

        } else {
            return; // deprecated for now
            indexHtml = fs.readFileSync(path.join(distPath, route, "index.html"), "utf8");
            outputPath = path.join(distPath, route, "index.html");
        }
    } catch (err) {
        console.error(`❌ Error reading file for ${route}`);
        return;
    }

    let updatedHtml = indexHtml.replace(
        "</head>",
        `${generateMetaTags(meta.title, meta.description, route)}\n</head>`
    );
    console.log(`🔄 Meta tags injected for ${route}`);
    const minifiedHtml = minify(updatedHtml, {
        collapseWhitespace: true,
        removeComments: true,
        minifyJS: true,
        minifyCSS: true,
    });
    console.log(`🔧 HTML minified for ${route}`);
    fs.writeFileSync(outputPath, minifiedHtml);
    console.log(`✅ HTML file updated for ${route}`);
});