export function circlesIntersect(r1, r2, x1, y1, x2, y2) {
    const dx = x2 - x1;
    const dy = y2 - y1;
    const radii = r1 + r2;
    return (dx * dx + dy * dy < radii * radii);
}

export function circleIntersectsRectangle(circle, rect) {
    const w = rect.size.x;
    const h = rect.size.y;
    const r = circle.radius;

    if (circle.pos.x > (w / 2 + r) || circle.pos.y > (h / 2 + r)) {
        return false;
    }

    if (circle.pos.x <= (w / 2) || circle.pos.y <= (h / 2)) {
        return true;
    }

    const cornerDistanceSq = Math.pow(circle.pos.x - w / 2, 2) +
                             Math.pow(circle.pos.y - h / 2, 2);

    if (cornerDistanceSq <= Math.pow(r, 2)) {
        return true;
    }

    return false;
}
