export async function fetcher(url: string, options?: RequestInit) {
    try {
      const res = await fetch(url, options);
      if (!res.ok) throw new Error(await res.text());
      return res.json();
    } catch (err) {
      console.error('API error:', err);
      throw err;
    }
  }
  