const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const isProd = process.env.NODE_ENV === 'production';
const resolve = (p) => path.resolve(__dirname, p);

if (isProd) {
  const indexTemplate = fs.readFileSync(resolve('dist/index.html'), 'utf-8');
  const { render } = require('./dist/server/entry-server.js');

  // Serve static assets
  app.use('/assets', express.static(resolve('dist/assets')));
  app.use('/vite.svg', express.static(resolve('dist/vite.svg')));

  app.use('*', async (req, res) => {
    try {
      const { html: appHtml, head } = await render(req.originalUrl);

      // Inject into template
      const html = indexTemplate
        .replace('<!--app-->', appHtml)
        .replace('<!--head-->', head);

      res.status(200).set({ 'Content-Type': 'text/html' }).end(html);
    } catch (err) {
      console.error(err);
      res.status(500).end('Internal Server Error');
    }
  });
} else {
  res.status(500).send('Start dev server with `npm run dev`.');
}

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
