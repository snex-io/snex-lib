export function circlesIntersect(r1, r2, x1, y1, x2, y2) {
    const dx = x2 - x1;
    const dy = y2 - y1;
    const radii = r1 + r2;
    return (dx * dx + dy * dy < radii * radii);
}
