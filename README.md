# CLOUDDRE - Contabilidade Inteligente

Site institucional completo, moderno, acessível e otimizado para a **CLOUDDRE Contabilidade Inteligente**, desenvolvido com HTML5 semântico, CSS3 responsivo e JavaScript puro (ES6+).

---

## 🚀 Como abrir o site

O site foi construído utilizando tecnologias nativas e não requer nenhum processo de compilação ou instalação de dependências.

1. Navegue até a pasta do projeto: `SITE CLOUDDRE/`.
2. Dê um duplo clique no arquivo `index.html` para abri-lo diretamente no seu navegador de preferência (Chrome, Safari, Firefox, Edge).
3. Alternativamente, você pode usar uma extensão como **Live Server** (no VS Code) para desenvolvimento local com recarregamento automático.

---

## ⚙️ Configurações Centrais (WhatsApp, E-mail, Endereço e Redes Sociais)

Todas as informações de contato principais estão centralizadas em um único objeto de configuração no arquivo **`assets/js/script.js`**.

Abra o arquivo [`assets/js/script.js`](file:///Users/marcosfagner/Documents/SITE%20CLOUDDRE/assets/js/script.js) e altere a constante `SITE_CONFIG`:

```javascript
const SITE_CONFIG = {
  whatsapp: "5521996895570", // Número no formato internacional (DDI + DDD + Número) sem símbolos
  telefoneExibicao: "(21) 99689-5570", // Texto exibido visualmente no site
  email: "contato@clouddre.com.br", // E-mail principal de contato
  endereco: "Alameda São Boaventura, 540 - Fonseca, Niterói - RJ, 24120-191",
  instagram: "https://instagram.com/suaconta",
  linkedin: "https://linkedin.com/company/suaconta"
};
```

Ao modificar os valores no `SITE_CONFIG`, os botões de atendimento no WhatsApp, links de e-mail e informações no rodapé serão atualizados automaticamente.

---

## 🖼️ Como substituir as imagens

Todas as imagens e logos do site estão localizadas no diretório `assets/images/`:

- **Logo Horizontal (Menu):** `assets/images/logo-clouddre-horizontal.svg` / `.png`
- **Logo Branca (Rodapé):** `assets/images/logo-clouddre-branca.svg` / `.png`
- **Ícone e Favicon:** `assets/images/logo-clouddre-icon.svg` e `assets/images/favicon-clouddre.png`
- **Foto Principal (Hero):** `assets/images/hero-clouddre.webp`
- **Foto do Escritório (Quem Somos):** `assets/images/escritorio-clouddre.webp`
- **Mockup do Dashboard (Banner Verde):** `assets/images/dashboard-clouddre.webp`

Para trocar qualquer imagem, basta substituir o arquivo correspondente mantendo o mesmo nome ou atualizar a tag `<img>` correspondente no [`index.html`](file:///Users/marcosfagner/Documents/SITE%20CLOUDDRE/index.html).

---

## 💼 Como adicionar novos serviços

Os cards de serviços da seção **Nossos Serviços** estão estruturados de forma semântica no arquivo [`index.html`](file:///Users/marcosfagner/Documents/SITE%20CLOUDDRE/index.html#L140).

Para adicionar um novo serviço, inclua uma nova tag `<article class="service-card animate-on-scroll">` dentro da div `.services-grid`:

```html
<article class="service-card animate-on-scroll">
  <div class="service-icon">
    <!-- SVG Icon -->
  </div>
  <h3 class="service-title">Nome do Novo Serviço</h3>
  <p class="service-desc">Descrição clara e direta do serviço oferecido.</p>
</article>
```

---

## 📊 Como cadastrar novos cases de sucesso

Os cases de sucesso são renderizados dinamicamente pelo JavaScript a partir da lista `CASES_DATA` no arquivo [`assets/js/script.js`](file:///Users/marcosfagner/Documents/SITE%20CLOUDDRE/assets/js/script.js#L18).

Para incluir ou alterar um case, edite o array `CASES_DATA`:

```javascript
const CASES_DATA = [
  {
    categoria: "Segmento da Empresa",
    titulo: "Título do Case de Sucesso",
    descricao: "Descrição detalhada do desafio e do resultado alcançado.",
    tag: "Nome do Serviço Aplicado"
  }
];
```

---

## 🌐 Como publicar em uma hospedagem de site estático

Como o site é 100% estático (HTML, CSS, JS e imagens), ele pode ser hospedado gratuitamente e com máxima velocidade em qualquer provedor moderno:

### 1. Netlify
- Faça upload da pasta do projeto diretamente em [app.netlify.com/drop](https://app.netlify.com/drop) ou conecte a um repositório GitHub.

### 2. Vercel
- Instale a Vercel CLI (`npm i -g vercel`) e execute `vercel` na pasta do projeto, ou importe o repositório pelo painel da Vercel.

### 3. GitHub Pages
- Crie um repositório no GitHub, faça o push dos arquivos e ative o **GitHub Pages** nas configurações do repositório (`Settings > Pages > Branch: main`).

### 4. Hospedagem Tradicional (cPanel / Hostinger / Locaweb)
- Conecte via FTP ou File Manager da hospedagem e envie o conteúdo da pasta `SITE CLOUDDRE/` para o diretório público `public_html/`.

---

## 🛡️ Licença e Direitos

Desenvolvido para **CLOUDDRE Contabilidade Inteligente**. Todos os direitos reservados.
