import test from "node:test";
import assert from "node:assert/strict";
import { buildDeviceCatalogQuery, sanitizeDeviceFilters } from "../repositories/deviceQuery.js";

test("sanitizeDeviceFilters applies safe defaults and a maximum page size", () => {
  assert.deepEqual(sanitizeDeviceFilters({ limit: "999", page: "0", q: "  Pixel  " }), {
    page: 1,
    limit: 100,
    search: "Pixel",
    category: "",
    brand: "",
  });
});

test("buildDeviceCatalogQuery parameterizes catalog filters", () => {
  const query = buildDeviceCatalogQuery(sanitizeDeviceFilters({
    q: "Galaxy",
    category: "phone",
    brand: "Samsung",
    page: "2",
    limit: "20",
  }));

  assert.match(query.dataSql, /brand ILIKE \$1/);
  assert.match(query.dataSql, /category ILIKE \$2/);
  assert.match(query.dataSql, /LIMIT \$4 OFFSET \$5/);
  assert.deepEqual(query.params, ["%Galaxy%", "phone", "Samsung", 20, 20]);
  assert.deepEqual(query.filterParams, ["%Galaxy%", "phone", "Samsung"]);
});
