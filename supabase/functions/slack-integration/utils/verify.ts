export const verifySlackRequest = async (request: Request, signingSecret: string) => {
  const timestamp = request.headers.get('x-slack-request-timestamp');
  const signature = request.headers.get('x-slack-signature');
  
  if (!timestamp || !signature) {
    return false;
  }

  const fiveMinutesAgo = Math.floor(Date.now() / 1000) - 60 * 5;
  if (parseInt(timestamp) < fiveMinutesAgo) {
    return false;
  }

  const clonedRequest = request.clone();
  const body = await clonedRequest.text();
  
  const baseString = `v0:${timestamp}:${body}`;
  const hmac = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(signingSecret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  
  const signature_bytes = await crypto.subtle.sign(
    "HMAC",
    hmac,
    new TextEncoder().encode(baseString)
  );
  
  const computed_signature = `v0=${[...new Uint8Array(signature_bytes)]
    .map(b => b.toString(16).padStart(2, '0'))
    .join('')}`;
  
  return computed_signature === signature;
};