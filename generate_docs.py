#!/usr/bin/env python3
"""
Script para gerar documentação completa do projeto EHA
"""

import os

# Criar estrutura de diretórios
docs_structure = {
    'requisitos': [
        '03-requisitos-funcionais.md',
        '04-requisitos-nao-funcionais.md',
        '05-regras-negocio.md',
        '06-casos-uso.md'
    ],
    'arquitetura': [
        '01-visao-arquitetural.md',
        '02-arquitetura-sistema.md',
        '03-decisoes-arquiteturais.md',
        '04-componentes.md'
    ],
    'design': [
        '01-design-system.md',
        '02-wireframes.md',
        '03-fluxos-navegacao.md',
        '04-guia-estilo.md'
    ],
    'backend': [
        '01-arquitetura-backend.md',
        '02-api-rest.md',
        '03-modelos-dados.md',
        '04-autenticacao.md',
        '05-servicos.md'
    ],
    'frontend': [
        '01-arquitetura-frontend.md',
        '02-componentes.md',
        '03-estado.md',
        '04-integracao-api.md'
    ],
    'mobile': [
        '01-arquitetura-mobile.md',
        '02-offline.md',
        '03-sincronizacao.md'
    ],
    'database': [
        '01-modelo-er.md',
        '02-schema.md',
        '03-dicionario-dados.md',
        '04-migrations.md'
    ],
    'api': [
        '01-endpoints.md',
        '02-autenticacao.md',
        '03-exemplos.md',
        '04-erros.md'
    ],
    'testes': [
        '01-estrategia-testes.md',
        '02-testes-unitarios.md',
        '03-testes-integracao.md',
        '04-testes-aceitacao.md'
    ],
    'sprints': [
        '00-metodologia.md',
        'sprint-01.md',
        'sprint-02.md',
        'sprint-03.md',
        'sprint-04.md',
        'sprint-05.md',
        'sprint-06.md'
    ]
}

print("Gerando documentação completa do projeto EHA...")
print("=" * 60)

for folder, files in docs_structure.items():
    folder_path = f"docs/{folder}"
    os.makedirs(folder_path, exist_ok=True)
    print(f"\n📁 {folder}/")
    
    for file in files:
        file_path = os.path.join(folder_path, file)
        if not os.path.exists(file_path):
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(f"# {file.replace('.md', '').replace('-', ' ').title()}\n\n")
                f.write("_Documento em construção_\n")
            print(f"  ✅ Criado: {file}")
        else:
            print(f"  ⏭️  Já existe: {file}")

print("\n" + "=" * 60)
print("✅ Estrutura de documentação criada com sucesso!")
print(f"\n📊 Total de documentos: {sum(len(files) for files in docs_structure.values())}")
