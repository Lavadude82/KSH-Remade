function MaxString(string, max, front) {
    front = front ?? false
    if (front) {
        if (string.length <= max) return string;
        return "..." + string.slice(string.length - max + 2 , string.length + 2)
    } else {
        if (string.length <= max) return string;
        return string.slice(0, max - 2) + "..."
    }
}


module.exports = {
    MaxString
}