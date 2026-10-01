"""Regenerate public draft documents, without Word metadata or private member data.
Usage: python scripts/prepare_documents.py "path/to/source-draft.docx"
"""
from pathlib import Path
import html
import shutil
import sys
import zipfile
import xml.etree.ElementTree as ET

root = Path(__file__).resolve().parents[1]
target = root / 'public/documents'
target.mkdir(exist_ok=True)
fonts = root / 'public/fonts'
fonts.mkdir(exist_ok=True)
for subset in ['gujarati', 'latin']:
    name = f'noto-sans-gujarati-{subset}-400-normal.woff2'
    shutil.copyfile(root / 'node_modules/@fontsource/noto-sans-gujarati/files' / name, fonts / name)
style = '''<style>
@font-face{font-family:Gujarati;src:url('../fonts/noto-sans-gujarati-gujarati-400-normal.woff2') format('woff2');unicode-range:U+0A80-0AFF; font-display:swap}
@font-face{font-family:Gujarati;src:url('../fonts/noto-sans-gujarati-latin-400-normal.woff2') format('woff2');unicode-range:U+0000-00FF; font-display:swap}
body{font-family:Gujarati,Arial,sans-serif;max-width:900px;margin:40px auto;padding:20px;line-height:2;color:#392e27}h1{color:#762f30}aside{padding:20px;background:#fff0d8;border-left:4px solid #ae7130}p{margin:0 0 14px}button{padding:12px} @media print{button{display:none}}</style>'''
def document(title, body):
    return '<!doctype html><html lang="gu"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>' + title + '</title>' + style + '</head><body>' + body + '</body></html>'

with zipfile.ZipFile(Path(sys.argv[1])) as archive:
    xml = ET.fromstring(archive.read('word/document.xml'))
ns = {'w': 'http://schemas.openxmlformats.org/wordprocessingml/2006/main'}
paragraphs = [''.join(t.text or '' for t in p.findall('.//w:t', ns)) for p in xml.findall('.//w:p', ns)]
body = '''<h1>સંસ્થાપન પત્ર અને નિયમો — મુસદ્દો</h1><aside>મુસદ્દો · અંતિમ મંજૂરી બાકી છે. આ આપેલા Word દસ્તાવેજમાંથી કાઢેલું લખાણ છે, સહીવાળો કે નોંધાયેલ દસ્તાવેજ નથી.<br>Draft — awaiting approval. Extracted text, not a signed or registered deed. Original paragraph order is retained; table cells appear as separate paragraphs.</aside>'''
body += ''.join('<p>' + html.escape(p) + '</p>' for p in paragraphs if p.strip())
(target / 'draft-deed.html').write_text(document('સંસ્થાપન મુસદ્દો | Draft deed', body), encoding='utf-8')

labels = ['પૂરું નામ / Full name', 'પિતા અથવા જીવનસાથીનું નામ / Father or spouse', 'મોબાઇલ / Mobile', 'ઈમેલ (વૈકલ્પિક) / Email (optional)', 'જન્મ તારીખ (વૈકલ્પિક) / Date of birth (optional)', 'સરનામું / Address', 'સોસાયટી અથવા વિસ્તાર / Society or area', 'વ્યવસાય / Occupation', 'પરિવારના સભ્યોની સંખ્યા / Family-member count', 'પરિવાર સભ્યપદ (પ્રસ્તાવિત) / Family membership (proposed)']
body = '''<h1>સભ્યપદ પૂછપરછ ફોર્મ / Membership enquiry</h1><aside>મુસદ્દો — સમાજની મંજૂરી બાકી છે. આ પૂછપરછ ફોર્મ છે; સભ્યપદની મંજૂરી નથી.<br>Draft for approval. This form does not confer membership. Print using your browser or save as PDF.</aside>'''
body += ''.join('<p style="padding:18px 0;border-bottom:1px solid #bbb">' + label + ':</p>' for label in labels)
body += '''<p>☐ મારી માહિતીનો આ પૂછપરછ માટે ઉપયોગ કરવા હું સંમતિ આપું છું.<br>I consent to the use of my details for this enquiry.</p><p>સહી / Signature: __________________ તારીખ / Date: ______________</p><p>ફી અને સંપર્કની વિગતો અપડેટ કરવાની બાકી છે. Fee and contact details are to be updated.</p>'''
(target / 'membership-form.html').write_text(document('સભ્યપદ પૂછપરછ | Membership enquiry — draft', body), encoding='utf-8')
print('Regenerated both public draft documents with UTF-8 Gujarati and bundled fonts.')
