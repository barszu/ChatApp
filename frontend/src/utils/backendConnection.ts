const backend_url = process.env.NEXT_PUBLIC_BACKEND_URL;

if (!backend_url) {
  throw new Error("Backend URL is not defined in environment variables.");
}

function getBackendUrl(path: string): string {
  console.log("Backend URL: ", backend_url);
  return backend_url + "/" + path;
}

export default getBackendUrl;
