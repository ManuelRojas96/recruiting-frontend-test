export async function postWithRetry(url: string, body: any, maxRetries = 3) {
  const authToken = import.meta.env.VITE_AUTH_TOKEN;
  let lastError;
  for (let i = 0; i < maxRetries; i++) {
    const resp = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${authToken}`,
      },
      body: JSON.stringify(body),
    });
    if (resp.ok) return resp;
    if (resp.status === 500) {
      lastError = resp;
      await new Promise((res) => setTimeout(res, 300 * (i + 1)));
      continue;
    } else {
      const msg = await resp.text();
      throw new Error(msg || `Error HTTP ${resp.status}`);
    }
  }
  throw new Error("Servidor con problemas, intente nuevamente más tarde");
}
