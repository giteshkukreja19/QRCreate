LOCAL QR GENERATOR — PYTHON QR CODE LIBRARY

This version generates every QR code with the Python `qrcode` package.
The QR PNG is created on your Mac by app.py.

INSTALL ONCE
------------
python3 -m pip install "qrcode[pil]"

RUN
---
1. Open Terminal.
2. cd into this folder.
3. Run:
   python3 app.py

4. Open:
   http://127.0.0.1:8000

USAGE
-----
Type text into the box. The browser requests a QR PNG from the local
Python server, and app.py generates it with the `qrcode` library.

No QR library is loaded from a CDN.
No text is sent to an external website.
No hosting or database is required.

FILES
-----
app.py      Local Python web server + QR generator
index.html  User interface
style.css   UI styling
script.js   Instant generation / download logic
README.txt  Instructions
