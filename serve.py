#! python3

import http.server
import socketserver
import os

PORT = os.environ.get("PORT", 8000)

Handler = http.server.SimpleHTTPRequestHandler

with socketserver.TCPServer(("", int(PORT)), Handler) as httpd:
    print("Serving at port", PORT)
    httpd.serve_forever()
