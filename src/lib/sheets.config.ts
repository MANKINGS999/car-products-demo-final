// ─────────────────────────────────────────────────────────────────────────────
//  GOOGLE SHEETS CONFIG
//  1. Open your Google Sheet
//  2. File → Share → "Anyone with the link" → set to Viewer
//  3. Copy the Sheet ID from the URL:
//     https://docs.google.com/spreadsheets/d/  ← SHEET_ID →  /edit
//  4. Paste it below as SHEET_ID
//  5. Set SHEET_NAME to the tab name (default is "Sheet1")
//
//  Your sheet columns should be (row 1 = headers, exactly these names):
//  | id | title | category | brands | badge | image | description |
//
//  • brands  → comma-separated, e.g.  Pioneer, Sony, JBL
//  • badge   → leave empty for none, or write e.g.  Bestseller
//  • image   → full URL to an image (Unsplash, Drive public link, etc.)
// ─────────────────────────────────────────────────────────────────────────────

export const SHEET_ID   = "1cqeMFLRcCZXPL2-Ni9nY9GHb_ksOXkYITYGAb7JpJI8";
export const SHEET_NAME = "Products";

// Derived — do not edit
export const SHEET_CSV_URL =
  `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:csv&sheet=${encodeURIComponent(SHEET_NAME)}`;
