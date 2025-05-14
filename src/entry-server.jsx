import { renderToString } from 'react-dom/server'
import App from './App'
import { StaticRouter } from 'react-router-dom/server'
import { Helmet } from 'react-helmet'

export function render(url) {
  const appHtml = renderToString(
    <StaticRouter location={url}>
      <App />
    </StaticRouter>
  )

  const helmet = Helmet.renderStatic()

  return {
    html: appHtml,
    head: `
      ${helmet.title.toString()}
      ${helmet.meta.toString()}
      ${helmet.link.toString()}
    `,
  }
}
