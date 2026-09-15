# Revisão Jhoy Pratas — 12/09/2026

Revisão incremental do projeto existente. Copy, ordem narrativa, paleta, vídeos e peças aprovadas foram preservados. Nenhuma dependência adicionada.

## Problemas encontrados e ajustes

| Prioridade | Problema e impacto | Solução aplicada | Arquivos |
|---|---|---|---|
| CRÍTICO | Galeria mobile: imagens lazy com width/height zero antes do carregamento. O percurso horizontal era medido incorretamente. Confirmado no DOM: seis imagens 0 × 0. | Reservar largura usando a proporção original de cada painel, antes do download. Em 390 px: todas passaram a 327,59 px de largura, com alturas proporcionais. | SceneCatalogBridge.tsx e .module.css |
| IMPORTANTE | matchMedia apenas com reduced-motion: callback não executava no modo normal. Manifesto e Peças não tinham as animações previstas. | Condição all para registrar tanto o modo normal quanto o reduzido. Hook compartilhado corrigido pelo mesmo motivo. | SceneManifesto.tsx, ScenePieces.tsx, lib/useRevealOnScroll.ts |
| IMPORTANTE | Lenis global sem cleanup pela Hero; suavização ignorava preferência de movimento reduzido. | Remover ticker e instância ao desmontar; observar mudança da preferência e desabilitar smoothWheel. | lib/lenis.ts, SceneHero.tsx |
| IMPORTANTE | Vídeos em loop continuavam decodificando fora da viewport e no modo reduzido. | Hook de visibilidade pausa fora da tela, em aba oculta e com movimento reduzido; mantém poster se play for negado. | lib/useVisibleVideo.ts, SceneHero.tsx, SceneManifesto.tsx |
| IMPORTANTE | Convergência de 11,46 MB iniciava preload completo junto da Hero. | preload none e carregamento ao aproximar-se da jornada, com uma viewport de antecedência. Mantida codificação adequada a seeks, sem recompressão. | SceneChristCenter.tsx, ScenePurposeJourney.tsx |
| POLIMENTO | Altura vh na Hero podia variar com barras do navegador mobile. | Altura estável 100svh, consistente com as outras cenas. | SceneHero.module.css |
| POLIMENTO | CSS e comentários da assinatura removida ainda estavam presentes. | Remover estilos mortos e corrigir comentários sobre movimento reduzido. | SceneHero.tsx/.module.css, SceneManifesto.tsx |
| ORGANIZAÇÃO | Logs e resultados futuros de verificações poderiam entrar no Git. | Acrescentar padrões específicos ao ignore. | .gitignore |

## Cobertura e decisões

- Código de todas as cenas ativas, seus estilos, timeline conjunta, Lenis, hooks, layout, fontes, metadados e links revisados.
- Preservada hierarquia: Hero → Manifesto → Afirmações → Cristo → Moissanite → Peças → Galeria → CTA.
- Mantidos pin/scrub e durações aprovadas. A jornada tem 10 viewports no mobile e 12 no desktop, compartilhadas por Afirmações e Cristo. Não foram encurtadas por preferência pessoal.
- Mantida sobreposição Cristo/Afirmações e Peças/Moissanite. Não foram criadas novas cenas.
- Copy e easter egg preservados. CTA mantém links fornecidos; WhatsApp tem noopener noreferrer e indicação de nova aba.
- Imagens editoriais já usam Next Image e lazy load. Os dois PNGs transparentes permanecem sem recompressão para preservar detalhes. Não foi atribuída melhoria numérica de velocidade sem benchmark.
- Alt text, lang pt-BR, h1, foco dos CTAs e retorno de foco ao início revisados. O easter egg continua deliberadamente discreto; sua baixa opacidade não equivale a certificação de contraste WCAG.

## Validação realizada

- ESLint e build Next.js/TypeScript: passaram.
- Medições de DOM em 390×844, 393×852, 430×932, 360×800, 1024×768, 1366×768, 1440×900 e 1920×1080: sem overflow da página e com dimensões reservadas para os seis painéis.
- CTAs: 54 px de altura; botão de retorno: 48 px.
- Inspeções visuais pontuais mobile/desktop: Hero, Afirmações, galeria/fechamento. Retorno ao início devolveu foco ao main.
- Vídeos confirmados pausados no final da página, fora da tela.
- Resize entre breakpoints observado; ScrollTrigger recalcula após o debounce de resize.

Limites: as oito dimensões receberam medições, não uma gravação integral de todas as cenas em cada tamanho. Movimento reduzido foi revisado no código, sem emulação do sistema neste navegador. Não foram executados testes em aparelhos físicos/iOS, Lighthouse, leitor de tela ou rede móvel limitada. Isso permanece como validação complementar antes de uma afirmação de prontidão universal.

## Limpeza candidata — nenhum asset foi apagado

- .next/, node_modules/, .npm-cache/ e .media-tools/ já ignorados. .next é gerado; node_modules é necessário localmente. Ferramentas e frames em .media-tools não devem ser publicados.
- Vídeos antigos sem referência nos componentes ativos: public/christ/convergence.mp4, convergence-scroll.mp4, convergence-v3-original.mp4. Somam aproximadamente 15,2 MB. Arquivar fora de public antes do deploy se não forem necessários como originais.
- Outros candidatos sem uso no fluxo atual: public/christ/christ.png, star-reference.png; public/scene02/a-main-close.jpg até e-optional-bright-close.jpg; public/moissanite/moissanite-macro.jpg.
- FloatingSticker e SceneWow permanecem como componentes não importados pela página. Revisar arquivamento junto de seus assets e do hook de reveal antes de excluir.
- README ainda descreve versões/placeholder antigos; esta auditoria e app/page.tsx documentam o fluxo efetivamente ativo.
- Ignorar arquivos no Git não os remove de public nem de um pacote de deploy. A limpeza de assets deve ser explícita após conferir suas referências.
