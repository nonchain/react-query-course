export async function fetchWithError(url) {
  const response = await fetch(url, {
    headers: { "x-error": true }
  });

  const result = await response.json();

  if(response.status >= 400) {
    throw new Error(`Error: ${result.error || 'Oops! Something went wrong'}`)
  }
  return result;
};
