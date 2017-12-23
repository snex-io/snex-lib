export function circlesIntersect(r1, r2, x1, y1, x2, y2) {
    const dx = x2 - x1;
    const dy = y2 - y1;
    const radii = r1 + r2;
    return (dx * dx + dy * dy < radii * radii);
}

export function circleIntersectsRectangle(r, x, y, a, b, w, h) {
    const circle = {
        x: Math.abs(x - a),
        y: Math.abs(y - b),
    };

    if (circle.x > (w / 2 + r) || circle.y > (h / 2 + r)) {
        return false;
    }

    if (circle.x <= (w / 2) || circle.y <= (h / 2)) {
        return true;
    }

    const cornerDistanceSq = Math.pow(circle.x - w / 2, 2) +
                             Math.pow(circle.y - h / 2, 2);

    if (cornerDistanceSq <= Math.pow(r, 2)) {
        return true;
    }

    return false;
}
