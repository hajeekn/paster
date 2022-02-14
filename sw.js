const CACHE_NAME = 'WhilteJumpDB';
let cachelist = [];
self.addEventListener('install', async function (installEvent) {
    self.skipWaiting();
    installEvent.waitUntil(
        caches.open(CACHE_NAME)
            .then(function (cache) {
                console.log('Opened cache');
                return cache.addAll(cachelist);
            })
    );
});

self.addEventListener('fetch', async event => {
    event.respondWith(handle(event.request))
});
const dec = (str, xor, hex) => {
    if (typeof str !== 'string' || typeof xor !== 'number' || typeof hex !== 'number') {
        return;
    }
    let strCharList = [];
    let resultList = [];
    hex = hex <= 25 ? hex : hex % 25;
    let splitStr = String.fromCharCode(hex + 97);
    strCharList = str.split(splitStr);

    for (let i = 0; i < strCharList.length; i++) {
        let charCode = parseInt(strCharList[i], hex);
        charCode = (charCode * 1) ^ xor;
        let strChar = String.fromCharCode(charCode);
        resultList.push(strChar);
    }
    let resultStr = resultList.join('');
    return resultStr;
}
const handle = async (req) => {
    const urlObj = new URL(req.url);
    const urlStr = urlObj.pathname;
    const search = (key) => {
        return urlObj.searchParams.get(key);
    }
    if (!!search('link')) {
        return  Response.redirect(dec(search('link'), parseInt(search('xor')), parseInt(search('hex'))))
    } else {
        return new Response(await (await fetch('https://service-av203wsv-1258619363.sh.apigw.tencentcs.com/info.html')).text(), { headers: { 'Content-Type': 'text/html;charset=utf-8' } })
    }
}
