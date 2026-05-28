import PyPDF2
import docx

# Extrair PDF
print("=== CONTEÚDO DO PDF ===")
with open('PROJECTO_FINAL.pdf', 'rb') as file:
    pdf_reader = PyPDF2.PdfReader(file)
    for page_num in range(len(pdf_reader.pages)):
        page = pdf_reader.pages[page_num]
        print(f"\n--- Página {page_num + 1} ---")
        print(page.extract_text())

# Extrair DOCX
print("\n\n=== CONTEÚDO DO DOCX ===")
doc = docx.Document('DocumentoDeVisao_EHA_v1.0.docx')
for para in doc.paragraphs:
    if para.text.strip():
        print(para.text)
