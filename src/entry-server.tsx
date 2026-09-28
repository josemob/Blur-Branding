import { StrictMode } from "react";
import { prerender } from "react-dom/static";
import { StaticRouter } from "react-router-dom";
import App from "./App";

export { getSeo, ROUTES, SITE_URL, ROBOTS_INDEX } from "./seo";
export { mediaLargest } from "./lib/media";

const tree = (url: string) => (
  <StrictMode>
    <StaticRouter location={url}>
      <App />
    </StaticRouter>
  </StrictMode>
);

/**
 * Renderiza una ruta a HTML con el contenido inline.
 * La primera pasada resuelve los React.lazy() de la ruta; así la segunda no se
 * suspende y React no emite "fallback + segmento oculto + script de revelado".
 */
export async function render(url: string) {
  // progressiveChunkSize infinito: React no separa límites grandes para priorizar
  // el "shell" (útil en streaming, contraproducente en HTML estático).
  const opts = { progressiveChunkSize: Number.POSITIVE_INFINITY };
  const warm = await prerender(tree(url), opts);
  await warm.prelude.cancel();
  const { prelude } = await prerender(tree(url), opts);
  return new Response(prelude).text();
}
