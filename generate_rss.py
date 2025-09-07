import os, re, datetime, email.utils

BLOG_DIR = "blog"
SITE_URL = "https://amberandmarginalia.github.io"  # <-- change this

def read_file(path):
    with open(path, "r", encoding="utf-8", errors="ignore") as f:
        return f.read()

def extract_title(html, fallback):
    m = re.search(r"<title>(.*?)</title>", html, re.I|re.S)
    return m.group(1).strip() if m else fallback

def extract_desc(html, fallback):
    m = re.search(r'<meta\s+name=["\']description["\']\s+content=["\'](.*?)["\']', html, re.I|re.S)
    return m.group(1).strip() if m else fallback

def extract_iso_date(html):
    # returns datetime or None
    m = re.search(r'<meta\s+name=["\']date["\']\s+content=["\'](.*?)["\']', html, re.I|re.S)
    if not m: return None
    iso = m.group(1).strip()
    try:
        # Accept 'Z' or offset; convert to UTC
        dt = datetime.datetime.fromisoformat(iso.replace("Z", "+00:00"))
        return dt.astimezone(datetime.timezone.utc)
    except Exception:
        return None

def rfc822(dt):
    return email.utils.format_datetime(dt)

items = []
for name in os.listdir(BLOG_DIR):
    if not name.endswith(".html"): continue
    path = os.path.join(BLOG_DIR, name)
    html = read_file(path)

    slug = os.path.splitext(name)[0]
    url = f"{SITE_URL}/{BLOG_DIR}/{name}"

    title = extract_title(html, slug.replace("-", " ").title())
    desc = extract_desc(html, title)

    dt = extract_iso_date(html)
    if dt is None:
        ts = os.path.getmtime(path)
        dt = datetime.datetime.utcfromtimestamp(ts).replace(tzinfo=datetime.timezone.utc)

    items.append({
        "title": title,
        "link": url,
        "description": desc,
        "pubDate": rfc822(dt),
        "guid": url,
        "sort_key": dt
    })

# newest first
items.sort(key=lambda x: x["sort_key"], reverse=True)

rss_items_xml = "\n".join(f"""
  <item>
    <title>{i["title"]}</title>
    <link>{i["link"]}</link>
    <description>{i["description"]}</description>
    <pubDate>{i["pubDate"]}</pubDate>
    <guid>{i["guid"]}</guid>
  </item>""".rstrip() for i in items)

last_build = email.utils.format_datetime(datetime.datetime.now(datetime.timezone.utc))
rss = f"""<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0">
  <channel>
    <title>Your Blog</title>
    <link>{SITE_URL}/blog/</link>
    <description>My GitHub Pages Blog</description>
    <language>en-us</language>
    <lastBuildDate>{last_build}</lastBuildDate>
{rss_items_xml}
  </channel>
</rss>
"""

with open("rss.xml", "w", encoding="utf-8") as f:
    f.write(rss)
print("Generated rss.xml with", len(items), "items")
