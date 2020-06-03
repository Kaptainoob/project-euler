[5, 7, 10, 13, 20].forEach(n => console.log(n, smallestMult(n)));

function smallestMult(n) {
    const dividers = new Array(n).fill(1)
        .map((_n, i) => i + 1)
        .filter((n, _i, a) => n * 2 > a[a.length - 1]);
    let multipliersMap = new Object;
    dividers.forEach(divider => {
        multipliersMap = mergeTwoMaps(multipliersMap, getPrimeMultipliersMap(divider));
    });
    const nums = [];
    Object.keys(multipliersMap).forEach(key => {
        nums.push(Number(key) ** multipliersMap[key]);
    })
    return nums.reduce((acc, val) => acc * val, 1);
}

function getPrimeMultipliers(n) {
    const smallestDivider = getSmallestDivider(n);
    if (smallestDivider == n) return [n];
    return [
        ...getPrimeMultipliers(smallestDivider),
        ...getPrimeMultipliers(n / smallestDivider)
    ];
}

function getPrimeMultipliersMap(n) {
    const map = new Object;
    getPrimeMultipliers(n).forEach(primeNum => {
        map[primeNum] ? map[primeNum]++ : (map[primeNum] = 1);
    });
    return map;
}

function mergeTwoMaps(map1, map2) {
    const mergedMap = { ...map1 };
    Object.keys(map2).forEach(key => {
        if (mergedMap[key]) {
            const val = map2[key] > mergedMap[key] ? map2[key] : mergedMap[key];
            mergedMap[key] = val;
        } else {
            mergedMap[key] = map2[key];
        }
    });
    return mergedMap;
}

function getSmallestDivider(n) {
    if (n <= 3) return n;
    if (n % 2 == 0) return 2;
    for (let i = 3; i < n / 2; i += 2) {
        if (n % i == 0) return i;
    }
    return n;
}
