export function vibe(ms) {
    if (navigator.vibrate) {
        navigator.vibrate(ms);
    }
}
