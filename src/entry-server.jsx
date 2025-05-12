import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import App from './App'
// import { StaticRouter } from 'react-router/server'
import { Helmet } from 'react-helmet'

/**
 * @param {string} _url
 */
export function render(_url) {
  const appHtml = renderToString(
    <StrictMode>
      {/* <StaticRouter location={_url}> */}
        <App />
      {/* </StaticRouter> */}
    </StrictMode>
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
