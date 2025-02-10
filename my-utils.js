function getRandom(n, m) {
    return Math.floor(Math.random() * (m - n + 1)) + n;
}

module.exports = { getRandom };
