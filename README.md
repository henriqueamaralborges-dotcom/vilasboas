# MvillasBoasCameras — Loja Virtual Profissional

Loja virtual moderna, elegante e responsiva para a **MvillasBoasCameras**, especializada em equipamentos e acessórios de fotografia e filmagem profissional (cinema, mirrorless, drones, áudio e acessórios).

---

## 📸 Identidade Visual & Design

- **Tema Dark Moderno:** Paleta sofisticada em tons de grafite profundo (`#070B12`, `#0F172A`), texto em alto contraste e acentos em **Azul Elétrico** (`#3B82F6`) e toques de **Ouro Dourado** (`#F59E0B`).
- **Cards de Produtos:** Bordas arredondadas (`rounded-2xl`), sombras suaves, efeitos de hover dinâmicos e etiquetas com código de referência (SKU).
- **Responsividade Total:** Adaptado perfeitamente para celulares, tablets e telas ultrawide.

---

## 🚀 Como Executar ou Visualizar a Loja

### Opção 1: Execução Imediata (Zero Dependências)
Não é necessário instalar nada! Basta abrir o arquivo `index.html` em qualquer navegador:
- No Windows: Dê **dois cliques** no arquivo `index.html` ou clique com o botão direito e escolha seu navegador favorito (Google Chrome, Microsoft Edge, Firefox, Brave).
- A loja já carrega 100% dos estilos, componentes React 18, ícones e interações de carrinho em tempo real.

### Opção 2: Desenvolvimento com Vite + React (Para Ambientes Node.js)
Se você possui Node.js instalado e deseja trabalhar no código modular:
```bash
# Instalar dependências
npm install

# Iniciar servidor local de desenvolvimento
npm run dev

# Gerar build de produção
npm run build
```

---

## 🗂️ Categorias da Loja

1. **Cartões de Memória** (CFexpress Type A TOUGH, Lexar UHS-II V60, SanDisk Extreme PRO MicroSD e SD)
2. **Baterias** (Sony NP-FZ100 Originais Séries Alpha)
3. **Carregadores / Baterias** (Carregadores duplos digitais inteligentes com LCD e USB-C)
4. **Cases / Proteção** (Estojos rígidos anti-impacto estanques para mídias e baterias)
5. **Leitores de Cartões** (Leitores 10Gbps USB 3.2 Gen 2 CFexpress Type A + SD UHS-II)
6. **Acessórios de Câmera** (Handles superiores, sapatas frias, suportes e rigs)

---

## 📞 Informações de Contato Integradas

- **WhatsApp / Telefone:** [+55 11 98306-4904](https://wa.me/5511983064904) (Marcelo Villas-Bôas)
- **Instagram:** [@mvillasboascameras](https://instagram.com/mvillasboascameras)
- **E-mail:** [marcelovillasboas@me.com](mailto:marcelovillasboas@me.com)
- **Endereço:** AV. Marques de Sao Vicente, 2898 — Barra Funda, São Paulo - SP

---

## ⚡ Principais Funcionalidades

- **Busca em Tempo Real:** Filtra instantaneamente por título, código/SKU (ex: `SONY TOUCH TIPO A`, `LEXAR 128GB`), categoria e descrição técnica.
- **Alternador de Visualização:** Modos de **Grade (Grid)** e **Lista (List)**.
- **Tags de Categoria Deslizáveis:** Barra horizontal com tags ativas e contadores de itens em estoque.
- **Carrinho de Compras Interativo:** Controle de quantidades (+/-), cálculo automático de totais e botão **"Finalizar Pedido via WhatsApp"**, que formata automaticamente uma mensagem com todos os itens, quantidades e valores prontos para envio.
- **Botão Direto "Comprar via WhatsApp":** Em cada produto e no modal de detalhes rápidos.
- **Quick View Modal:** Exibe especificações detalhadas completas de cada produto.

---

## 📁 Estrutura de Arquivos

```
vilasboas/
├── index.html            # Aplicação principal autônoma pronta para abrir em qualquer navegador
├── products.js           # Catálogo dos produtos em módulo JavaScript
├── products.json         # Dados dos produtos e contatos em formato JSON universal
├── package.json          # Configuração de dependências para Vite / React
├── vite.config.js        # Configuração do Vite
├── tailwind.config.js    # Configuração do Tailwind CSS
├── postcss.config.js     # Configuração do PostCSS
├── src/
│   ├── App.jsx           # Componente React modular
│   ├── main.jsx          # Ponto de entrada React 18
│   ├── index.css         # Estilos globais e Tailwind
│   └── data/
│       └── products.js   # Base de dados modular
└── README.md             # Guia da loja
```
