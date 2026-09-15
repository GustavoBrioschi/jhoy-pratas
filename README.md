# Jhoy Pratas — Joias com propósito

Uma experiência digital desenvolvida para a **Jhoy Pratas**, marca real de joias, com foco em narrativa, identidade visual e interações guiadas pelo scroll.

Além de atender uma necessidade real da empresa, o projeto também foi criado como estudo prático durante minha formação em **Análise e Desenvolvimento de Sistemas (ADS)**, com o objetivo de explorar como ferramentas de inteligência artificial podem ser utilizadas na criação de experiências digitais, animações, vídeos, imagens e interações para web.

A proposta não foi construir um ecommerce tradicional, mas transformar a apresentação da marca em uma experiência visual mais próxima de um projeto editorial e interativo.

## Sobre o projeto

A Jhoy Pratas é uma marca de joias com propósito, cuja comunicação busca ir além da apresentação dos produtos.

A partir disso, o projeto foi desenvolvido para traduzir a identidade da marca em uma experiência digital baseada em cenas, movimento e narrativa.

O visitante percorre diferentes momentos da página por meio do scroll, passando pela apresentação da marca, manifesto, mensagens relacionadas ao propósito, produtos em destaque e uma galeria horizontal das principais categorias.

Ao final da experiência, o usuário pode acessar o catálogo oficial da empresa ou iniciar uma conversa pelo WhatsApp.

A identidade visual utiliza principalmente tons de vinho e off-white, tipografia editorial, fotografias de joias e animações sutis.

## Objetivo de estudo

Um dos principais objetivos deste projeto foi estudar, na prática, a integração entre:

- desenvolvimento front-end;
- design de interface;
- experiência do usuário;
- animações controladas por scroll;
- produção e tratamento de mídia;
- ferramentas de inteligência artificial.

Durante o desenvolvimento, diferentes plataformas de IA foram utilizadas como apoio na criação e refinamento de elementos visuais e audiovisuais.

A experimentação envolveu principalmente:

- geração e refinamento de imagens;
- criação e animação de vídeos;
- desenvolvimento de transições visuais;
- estudo de movimentos para elementos da interface;
- exploração de conceitos visuais antes da implementação;
- apoio na revisão do código;
- testes de diferentes abordagens de interação.

O objetivo não foi utilizar IA para substituir o processo de desenvolvimento, mas entender como essas ferramentas podem atuar como apoio dentro de um fluxo real de criação.

As decisões de estrutura, narrativa, direção visual, seleção dos materiais, testes e refinamentos da experiência foram feitas ao longo do desenvolvimento do projeto.

## Funcionalidades

- Hero com vídeo e apresentação da marca.
- Experiência dividida em cenas.
- Animações sincronizadas com a rolagem.
- Transições com sobreposição entre seções.
- Vídeos controlados pela progressão do scroll.
- Revelação gradual de produtos e mensagens.
- Galeria horizontal controlada pela rolagem vertical.
- Vídeos em loop e sem áudio.
- Música ambiente com controle de reprodução.
- Botões de acesso ao catálogo e ao WhatsApp.
- Navegação de volta ao início.
- Layout responsivo para desktop e mobile.
- Estados de foco para navegação por teclado.
- Adaptações para usuários com preferência por movimento reduzido.

## Tecnologias

- **Next.js**
- **React**
- **TypeScript**
- **GSAP**
- **ScrollTrigger**
- **Lenis**
- **CSS Modules**
- **ESLint**

## Organização do projeto

    app/
      layout.tsx       # Estrutura global, fontes e metadados
      page.tsx         # Composição da página
      globals.css      # Estilos globais

    components/
      brand/           # Elementos e controles da marca
      scenes/          # Cenas da experiência

    lib/               # Integrações e hooks compartilhados
    public/            # Imagens, vídeos e áudio

## Executando localmente

É necessário ter Node.js e npm instalados.

Após clonar o repositório:

    npm install

Inicie o servidor de desenvolvimento:

    npm run dev

Acesse:

    http://localhost:3000

Para utilizar outra porta:

    npm run dev -- --port 3014


## Desafios e aprendizados

O projeto permitiu trabalhar com problemas que normalmente não aparecem em páginas estáticas convencionais.

Entre os principais desafios estiveram:

- estruturar uma experiência dividida em cenas;
- controlar animações com GSAP e ScrollTrigger;
- sincronizar vídeos com a progressão do scroll;
- criar transições entre diferentes capítulos da página;
- implementar scroll horizontal a partir da rolagem vertical;
- manter a experiência consistente entre desktop e mobile;
- tratar problemas relacionados a pinning e viewport em dispositivos móveis;
- otimizar arquivos de vídeo para uso na web;
- equilibrar qualidade visual e performance;
- controlar reprodução de mídia conforme sua visibilidade;
- respeitar preferências de movimento reduzido;
- trabalhar com IA dentro de um fluxo real de desenvolvimento.

Um dos principais aprendizados foi perceber que experiências visuais mais complexas exigem equilíbrio entre impacto, usabilidade e desempenho.


## Contexto do projeto

O projeto foi desenvolvido para uma empresa real e posteriormente será utilizado em seu domínio.

Ao mesmo tempo, foi tratado como um projeto experimental de portfólio, permitindo explorar soluções mais criativas do que seriam normalmente utilizadas em uma página institucional tradicional.

Essa combinação entre aplicação real e experimentação foi justamente um dos principais objetivos do projeto.

## Créditos

A identidade da **Jhoy Pratas**, assim como fotografias, vídeos, logos e demais materiais da marca, pertencem aos seus respectivos titulares.

Parte dos materiais visuais utilizados na experiência foi criada ou refinada com apoio de ferramentas de inteligência artificial.

Este repositório é disponibilizado para fins de apresentação técnica e portfólio.

A publicação do código não concede autorização para reutilização da identidade visual, marca, fotografias ou demais materiais proprietários da Jhoy Pratas.