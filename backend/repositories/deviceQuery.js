const MAX_PAGE_SIZE = 100;

const parsePositiveInt = (value, fallback, maximum) => {
  const parsed = Number.parseInt(value, 10);
  if (!Number.isInteger(parsed) || parsed < 1) return fallback;
  return Math.min(parsed, maximum);
};

const sanitizeDeviceFilters = (query = {}) => ({
  page: parsePositiveInt(query.page, 1, Number.MAX_SAFE_INTEGER),
  limit: parsePositiveInt(query.limit, 24, MAX_PAGE_SIZE),
  search: String(query.q ?? "").trim().slice(0, 100),
  category: String(query.category ?? "").trim().slice(0, 60),
  brand: String(query.brand ?? "").trim().slice(0, 60),
});

const buildDeviceCatalogQuery = (filters) => {
  const conditions = [];
  const params = [];
  const add = (value) => {
    params.push(value);
    return `$${params.length}`;
  };

  if (filters.search) {
    const value = add(`%${filters.search}%`);
    conditions.push(`(brand ILIKE ${value} OR model ILIKE ${value})`);
  }
  if (filters.category) conditions.push(`category ILIKE ${add(filters.category)}`);
  if (filters.brand) conditions.push(`brand ILIKE ${add(filters.brand)}`);

  const where = conditions.length ? `WHERE ${conditions.join(" AND ")}` : "";
  const countSql = `SELECT COUNT(*)::int AS count FROM devices ${where}`;
  const limit = add(filters.limit);
  const offset = add((filters.page - 1) * filters.limit);
  const dataSql = `
    SELECT * FROM devices ${where}
    ORDER BY brand ASC, model ASC, id ASC
    LIMIT ${limit} OFFSET ${offset}`;

  return { countSql, dataSql, params, filterParams: params.slice(0, -2) };
};

export { MAX_PAGE_SIZE, buildDeviceCatalogQuery, sanitizeDeviceFilters };
