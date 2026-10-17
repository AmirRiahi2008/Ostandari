export function SearchForm({
  query,
  county,
  action = '/search',
}: {
  query?: string;
  county?: string;
  action?: string;
}) {
  return (
    <form method="get" action={action} className="portal-search">
      <label htmlFor="portal-search">جستجو</label>
      <input
        id="portal-search"
        type="search"
        name="q"
        defaultValue={query}
        minLength={2}
        maxLength={150}
        placeholder="عبارت موردنظر…"
      />
      {county && <input type="hidden" name="name" value={county} />}
      <button className="portal-button">جستجو</button>
    </form>
  );
}
