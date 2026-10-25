"""Convert the explicitly supplied member workbook into print-ready HTML.
The resulting PDF is intended for publication at the user's explicit request.
Usage: python scripts/prepare_member_directory.py workbook.xlsx output.html
"""
import base64
import html
import json
from pathlib import Path
import sys
import openpyxl

root = Path(__file__).resolve().parents[1]
sheet = openpyxl.load_workbook(sys.argv[1], data_only=True).worksheets[0]
values = list(sheet.values)
rows = [r for r in values[4:] if isinstance(r[0], (int, float)) and r[1]]
def cell(value):
    return html.escape('' if value is None else str(int(value)) if isinstance(value, float) and value.is_integer() else str(value))

fonts = []
for subset, unicode_range in [('gujarati', 'U+0A80-0AFF'), ('latin', 'U+0000-00FF')]:
    font = root / f'node_modules/@fontsource/noto-sans-gujarati/files/noto-sans-gujarati-{subset}-400-normal.woff2'
    encoded = base64.b64encode(font.read_bytes()).decode('ascii')
    fonts.append(f"@font-face{{font-family:Directory;src:url(data:font/woff2;base64,{encoded}) format('woff2');unicode-range:{unicode_range};}}")
logo = base64.b64encode((root / 'public/images/logo.png').read_bytes()).decode('ascii')
document = '''<!doctype html><html lang="gu"><head><meta charset="utf-8"><title>સભ્ય યાદી | Member directory</title><style>'''
document += ''.join(fonts)
document += '''
@page{size:A4 landscape;margin:13mm 10mm 16mm}
body{font-family:Directory,Arial,sans-serif;color:#332923;font-size:10px;line-height:1.7;margin:0}
header{display:flex;align-items:center;gap:16px;margin-bottom:14px;border-bottom:2px solid #762f30;padding-bottom:12px}
header img{height:65px;width:65px;border-radius:50%}h1{font-size:20px;color:#762f30;margin:0 0 3px}h2{font-size:14px;margin:0}p{margin:3px 0;color:#66594d}
table{border-collapse:collapse;width:100%;table-layout:fixed}thead{display:table-header-group}tr{break-inside:avoid}th,td{border:1px solid #d9cbbd;padding:7px 6px;vertical-align:top;overflow-wrap:anywhere}th{background:#f3e6d3;color:#592d27;font-weight:400}tbody tr:nth-child(even){background:#fbf7ef}td:nth-child(1),td:nth-child(7){text-align:center}
.source{margin-top:12px;font-size:9px}
</style></head><body><header>'''
document += f'<img src="data:image/png;base64,{logo}" alt="સમાજનો લોગો"><div><h1>{cell(values[0][0])}</h1><h2>અટક અને સોસાયટી મુજબ સભ્ય યાદી / Member directory</h2>'
document += f'<p>{cell(values[2][0])} · પરિવાર નોંધો / Family records: 220+ · પરિવાર સભ્યો / Family members: 1100+</p></div></header>'
document += '<table><colgroup>' + ''.join(f'<col style="width:{w}%">' for w in [5,19,11,11,20,13,8,13]) + '</colgroup><thead><tr>'
document += ''.join(f'<th scope="col">{cell(c)}</th>' for c in values[3]) + '</tr></thead><tbody>'
document += ''.join('<tr>' + ''.join(f'<td>{cell(c)}</td>' for c in row) + '</tr>' for row in rows)
document += '</tbody></table><p class="source">આપેલી Excel યાદી મુજબ. મૂળ ક્રમ અને વિગતો જાળવેલ છે; ખાલી વિગતો ખાલી રાખેલી છે. આ યાદી સક્રિય સભ્યપદની સ્વતંત્ર ચકાસણી નથી.<br>Source: Surname wise Society wise Members List.xlsx. Original order and details retained; empty cells remain blank. This directory does not independently verify active membership.</p></body></html>'
Path(sys.argv[2]).write_text(document, encoding='utf-8')
print(json.dumps({'records': len(rows), 'columns': len(values[3])}))
