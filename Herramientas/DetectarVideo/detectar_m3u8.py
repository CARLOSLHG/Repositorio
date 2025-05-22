from mitmproxy import http

def response(flow: http.HTTPFlow):
    url = flow.request.pretty_url
    if ".m3u8" in url and "ext-subs" not in url and "127.0.0.1" not in url and "viddow" not in url:
        print("\n🔗 URL .m3u8 REAL detectada:")
        print(url)
        # (opcional) guarda en un archivo para después
        with open("urls_m3u8_detectadas.txt", "a") as f:
            f.write(url + "\n")
