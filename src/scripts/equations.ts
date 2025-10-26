/** Fill EqRef link text with the correct numbers per-article. */
export function initEquations(): void {
  const articles = Array.from(document.querySelectorAll('article')) as HTMLElement[];

  articles.forEach((article) => {
    const eqs = Array.from(article.querySelectorAll('.eq')) as HTMLElement[];
    const map = new Map<string, number>();

    eqs.forEach((eq, i) => {
      const n = i + 1;
      const id = eq.id?.trim();
      if (id) map.set(id, n); // record number for references
    });

    map.forEach((num, id) => {
      const refs = article.querySelectorAll(`[data-eq-ref="${CSS.escape(id)}"]`);
      refs.forEach((el) => {
        (el as HTMLElement).textContent = `(${num})`;
      });
    });
  });
}