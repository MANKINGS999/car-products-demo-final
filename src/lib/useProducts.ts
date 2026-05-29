import { useState, useEffect } from "react";
import { SHEET_CSV_URL, SHEET_ID } from "./sheets.config";

export interface Product {
  id: number;
  title: string;
  category: string;
  brands: string[];
  badge: string | null;
  image: string;
  description: string;
}

type Status = "idle" | "loading" | "success" | "error" | "unconfigured";

interface UseProductsResult {
  products: Product[];
  status: Status;
  error: string | null;
  reload: () => void;
}

// Parse a CSV line respecting quoted fields
function parseCSVLine(line: string): string[] {
  const result: string[] = [];
  let current = "";
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (ch === '"') {
      if (inQuotes && line[i + 1] === '"') { current += '"'; i++; }
      else { inQuotes = !inQuotes; }
    } else if (ch === "," && !inQuotes) {
      result.push(current.trim());
      current = "";
    } else {
      current += ch;
    }
  }
  result.push(current.trim());
  return result;
}

function parseCSV(raw: string): Product[] {
  const lines = raw.trim().split("\n").filter(Boolean);
  if (lines.length < 2) return [];

  const headers = parseCSVLine(lines[0]).map(h => h.toLowerCase().replace(/\s+/g, ""));

  const idx = (name: string) => headers.indexOf(name);

  return lines.slice(1).map((line, i) => {
    const cols = parseCSVLine(line);
    const get  = (name: string) => (cols[idx(name)] ?? "").trim();

    const brandsRaw = get("brands");
    const brands = brandsRaw
      ? brandsRaw.split(",").map(b => b.trim()).filter(Boolean)
      : ["Generic"];

    const badgeRaw = get("badge");
    const badge = badgeRaw && badgeRaw.toLowerCase() !== "null" && badgeRaw !== "" ? badgeRaw : null;

    return {
      id:          parseInt(get("id")) || i + 1,
      title:       get("title")       || `Product ${i + 1}`,
      category:    get("category")    || "Other",
      brands,
      badge,
      image:       get("image")       || "",
      description: get("description") || "",
    };
  }).filter(p => p.title);
}

export function useProducts(): UseProductsResult {
  const [products, setProducts] = useState<Product[]>([]);
  const [status,   setStatus]   = useState<Status>("idle");
  const [error,    setError]    = useState<string | null>(null);
  const [tick,     setTick]     = useState(0);

  const reload = () => setTick(t => t + 1);

  useEffect(() => {
if ((SHEET_ID as string) === "YOUR_GOOGLE_SHEET_ID_HERE") {
      setStatus("unconfigured");
      return;
    }

    let cancelled = false;
    setStatus("loading");
    setError(null);

    fetch(SHEET_CSV_URL)
      .then(res => {
        if (!res.ok) throw new Error(`HTTP ${res.status} — check that your sheet is set to "Anyone with link can view"`);
        return res.text();
      })
      .then(text => {
        if (cancelled) return;
        const parsed = parseCSV(text);
        if (parsed.length === 0) throw new Error("Sheet loaded but no rows found. Check column headers match exactly.");
        setProducts(parsed);
        setStatus("success");
      })
      .catch(err => {
        if (cancelled) return;
        setError(err.message ?? "Unknown error");
        setStatus("error");
      });

    return () => { cancelled = true; };
  }, [tick]);

  return { products, status, error, reload };
}
