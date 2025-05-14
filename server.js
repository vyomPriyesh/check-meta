const express = require('express');
const { render } = require('./dist/server/entry-server.js');
const fs = require('fs');
const path = require('path');

const isProd = process.env.NODE_ENV === 'production';
const app = express();

app.use('/assets', express.static(path.resolve(__dirname, 'dist/client/assets')));

app.get('*', async (req, res) => {
  const template = fs.readFileSync(path.resolve(__dirname, 'dist/client/index.html'), 'utf-8');
  const appHtml = render(req.url); // call your SSR render function

  const html = template.replace(`<!--ssr-outlet-->`, appHtml.html);

  res.status(200).set({ 'Content-Type': 'text/html' }).end(html);
});

module.exports = app;
