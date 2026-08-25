#!/usr/bin/env node
/**
 * Regenerates the brand-mark assets from public/logo.svg.
 *
 * The mark itself was vectorised from the NFC business-card artwork: the logo
 * region was cropped out, thresholded, isolated by connected components (the
 * card edge and background were separate blobs), rotated 46 degrees upright,
 * and traced with potrace. The resulting path lives in public/logo.svg — this
 * script only derives the raster and container formats from it.
 *
 * Run: node scripts/build-logo-assets.mjs
 */
import sharp from "sharp"
import fs from "node:fs"

const LOGO = "public/logo.svg"
const VB = 1924 // viewBox side of the traced mark

const d = fs.readFileSync(LOGO, "utf8").match(/<path[^>]*d="([^"]+)"/)[1]

// Tab/app icon: white mark on black, matching the card and the site's dark theme.
const faviconSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${VB} ${VB}">
  <rect width="${VB}" height="${VB}" fill="#000000"/>
  <g transform="translate(${(VB * 0.07).toFixed(1)} ${(VB * 0.07).toFixed(1)}) scale(0.86)" fill="#ededed">
    <path d="${d}"/>
  </g>
</svg>
`
fs.writeFileSync("public/favicon.svg", faviconSvg)

// Rasterise from a copy carrying explicit pixel dimensions, otherwise sharp
// scales the 1924-unit viewBox by DPI into a bitmap over the pixel limit.
const rasterAt = (size) =>
  Buffer.from(faviconSvg.replace("<svg xmlns", `<svg width="${size}" height="${size}" xmlns`))

const png = (size) => sharp(rasterAt(size * 4)).resize(size, size).png({ compressionLevel: 9 })

await png(180).toFile("public/apple-touch-icon.png")
await png(192).toFile("public/icon-192x192.png")
await png(512).toFile("public/icon-512x512.png")

// favicon.ico — ICO container wrapping a 32x32 PNG (supported everywhere current).
const p32 = await png(32).toBuffer()
const header = Buffer.alloc(6)
header.writeUInt16LE(0, 0)
header.writeUInt16LE(1, 2)
header.writeUInt16LE(1, 4)
const entry = Buffer.alloc(16)
entry.writeUInt8(32, 0)
entry.writeUInt8(32, 1)
entry.writeUInt16LE(1, 4)
entry.writeUInt16LE(32, 6)
entry.writeUInt32LE(p32.length, 8)
entry.writeUInt32LE(22, 12)
fs.writeFileSync("public/favicon.ico", Buffer.concat([header, entry, p32]))

// Open Graph card — same mark, so the social preview and the tab icon cannot drift.
const ogSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="#000000"/>
  <rect x="80" y="72" width="1040" height="1" fill="#2b2b2b"/>
  <g transform="translate(80 96) scale(${(150 / VB).toFixed(6)})" fill="#ededed">
    <path d="${d}"/>
  </g>
  <text x="80" y="330" font-family="'Space Grotesk', system-ui, -apple-system, sans-serif"
        font-size="96" font-weight="700" fill="#ededed" letter-spacing="-3">Antony Austin</text>
  <text x="80" y="388" font-family="'Space Grotesk', system-ui, -apple-system, sans-serif"
        font-size="32" fill="#a3a3a3">Applied Electronics Engineer</text>
  <text x="80" y="442" font-family="'IBM Plex Mono', ui-monospace, SFMono-Regular, Menlo, monospace"
        font-size="20" fill="#737373">VLSI · Embedded Systems · Robotics · AI/ML</text>
  <rect x="80" y="486" width="1040" height="1" fill="#2b2b2b"/>
  <text x="80" y="534" font-family="'IBM Plex Mono', ui-monospace, SFMono-Regular, Menlo, monospace"
        font-size="19" fill="#8a8a8a">Co-founder &amp; CTO, VirtusCo   ·   Founder, Noviq   ·   BTech AEI, RSET</text>
  <text x="80" y="576" font-family="'IBM Plex Mono', ui-monospace, SFMono-Regular, Menlo, monospace"
        font-size="19" fill="#5c5c5c">antonyaustin.site   ·   Kochi, India   ·   Available worldwide</text>
</svg>
`
fs.writeFileSync("public/og-image.svg", ogSvg)
await sharp(Buffer.from(ogSvg), { density: 150 }).resize(1200, 630).png({ compressionLevel: 9 }).toFile("public/og-image.png")

for (const f of ["logo.svg", "favicon.svg", "favicon.ico", "apple-touch-icon.png", "icon-192x192.png", "icon-512x512.png", "og-image.png"]) {
  console.log(String((fs.statSync("public/" + f).size / 1024).toFixed(1)).padStart(7) + " KB  " + f)
}
