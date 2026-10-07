// Worker del sitio BLUR. Todo el sitio son archivos estáticos (dist/); este código
// solo atiende:
//   /api/auth, /api/callback  → inicio de sesión con GitHub para el panel /admin
//                               (flujo OAuth compatible con Sveltia/Decap CMS)
//   /admin/config.yml         → inyecta el dominio actual como base_url del login,
//                               así el panel funciona en workers.dev o en el dominio final.
//
// Configuración: GITHUB_CLIENT_ID (público) va en wrangler.jsonc; GITHUB_CLIENT_SECRET
// es un secreto en Cloudflare → Worker → Configuración → Variables y secretos.

const COOKIE = "blur-cms-csrf";

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === "/api/auth") return auth(url, env);
    if (url.pathname === "/api/callback") return callback(request, url, env);

    if (url.pathname === "/admin/config.yml") {
      const res = await env.ASSETS.fetch(request);
      if (!res.ok) return res;
      const yml = (await res.text()).replace(/^(\s*base_url:\s*)__SITE_ORIGIN__/m, `$1${url.origin}`);
      return new Response(yml, { headers: { "Content-Type": "text/yaml; charset=utf-8", "Cache-Control": "no-cache" } });
    }

    return env.ASSETS.fetch(request);
  },
};

/** Paso 1: redirige a GitHub con un token anti-CSRF guardado en cookie. */
function auth(url, env) {
  if (url.searchParams.get("provider") !== "github") return page(url, { error: "Proveedor no soportado.", code: "UNSUPPORTED_BACKEND" });
  if (!env.GITHUB_CLIENT_ID || !env.GITHUB_CLIENT_SECRET) {
    return page(url, { error: "Falta configurar el secreto GITHUB_CLIENT_SECRET en el Worker (Cloudflare → Configuración → Variables y secretos).", code: "MISCONFIGURED_CLIENT" });
  }
  const state = crypto.randomUUID().replaceAll("-", "");
  const params = new URLSearchParams({
    client_id: env.GITHUB_CLIENT_ID,
    redirect_uri: `${url.origin}/api/callback`,
    scope: url.searchParams.get("scope") || "repo,user",
    state,
  });
  return new Response(null, {
    status: 302,
    headers: {
      Location: `https://github.com/login/oauth/authorize?${params}`,
      "Set-Cookie": `${COOKIE}=${state}; HttpOnly; Secure; SameSite=Lax; Path=/api; Max-Age=600`,
    },
  });
}

/** Paso 2: GitHub vuelve con ?code; se valida el estado y se canjea por el token. */
async function callback(request, url, env) {
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");
  const cookie = (request.headers.get("Cookie") || "").match(new RegExp(`${COOKIE}=([a-f0-9]+)`))?.[1];

  if (!code || !state) return page(url, { error: "Faltan parámetros de GitHub.", code: "AUTH_CODE_REQUEST_FAILED" });
  if (!cookie || cookie !== state) return page(url, { error: "La sesión expiró o no es válida. Vuelve a intentarlo.", code: "CSRF_DETECTED" });

  let token;
  try {
    const res = await fetch("https://github.com/login/oauth/access_token", {
      method: "POST",
      headers: { Accept: "application/json", "Content-Type": "application/json", "User-Agent": "blur-cms-auth" },
      body: JSON.stringify({
        client_id: env.GITHUB_CLIENT_ID,
        client_secret: env.GITHUB_CLIENT_SECRET,
        code,
        redirect_uri: `${url.origin}/api/callback`,
      }),
    });
    ({ access_token: token } = await res.json());
  } catch {
    return page(url, { error: "No se pudo contactar a GitHub.", code: "TOKEN_REQUEST_FAILED" });
  }
  if (!token) return page(url, { error: "GitHub no devolvió un token.", code: "TOKEN_REQUEST_FAILED" });
  return page(url, { token });
}

/**
 * Ventana emergente que entrega el resultado al panel (protocolo Decap/Sveltia):
 * anuncia "authorizing:github" y, cuando el panel responde, le envía el token.
 * Solo responde a mensajes del mismo dominio del sitio.
 */
function page(url, { token, error, code }) {
  const state = error ? "error" : "success";
  const content = error ? { provider: "github", error, errorCode: code } : { provider: "github", token };
  const payload = JSON.stringify(`authorization:github:${state}:${JSON.stringify(content)}`);
  const html = `<!doctype html><html lang="es"><head><meta charset="utf-8"><meta name="robots" content="noindex"><title>BLUR · Iniciando sesión…</title></head>
<body style="font-family:system-ui,sans-serif;padding:2rem;color:#1B2A2E">${error ? `<p>${error.replace(/</g, "&lt;")}</p>` : "<p>Iniciando sesión…</p>"}
<script>
  (() => {
    const site = ${JSON.stringify(url.origin)};
    window.addEventListener("message", ({ data, origin }) => {
      if (origin === site && data === "authorizing:github") window.opener?.postMessage(${payload}, site);
    });
    window.opener?.postMessage("authorizing:github", site);
  })();
</script></body></html>`;
  return new Response(html, {
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "no-store",
      "Set-Cookie": `${COOKIE}=; HttpOnly; Secure; SameSite=Lax; Path=/api; Max-Age=0`,
    },
  });
}
