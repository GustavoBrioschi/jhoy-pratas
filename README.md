# Jhoy Digital Experience

Experiência digital de marca da Jhoy Prata — narrativa de scroll construída
cena por cena, reestruturada conforme o novo mapa do site (hero mais forte
+ jornada completa até o catálogo).

## Stack

- Next.js (App Router) + TypeScript
- GSAP + ScrollTrigger (timelines de scroll pinadas nas cenas principais)
- Lenis (scroll suave, amortecimento leve)
- CSS puro (CSS Modules) — sem Tailwind

## Rodando localmente

```bash
npm install
npm run dev
```

Abra http://localhost:3000.

Para testar o build de produção:

```bash
npm run build
npm start
```

## Novo mapa do site (implementado em `app/page.tsx`)

| # | Cena | Componente | Status |
|---|------|-----------|--------|
| 1 | Hero — "Você é preciosa" | `SceneHero` | ✅ Completo (vídeo aprovado) |
| 2 | Manifesto — "Por trás da Jhoy existe um sonho" | `SceneManifesto` | ✅ Completo (vídeo aprovado do coração) |
| 3 | Afirmações — "Você tem valor" / "Você é amada" | `Scene03Affirmations` | ✅ Completo (frase-ponte + fechamento) |
| 4 | Cristo é o centro | `SceneChristCenter` | ✅ Completo (reaproveita a estrela) |
| 5 | Moissanite | `SceneMoissanite` | 🟡 Usa frame macro do vídeo da Hero |
| 6 | Momento Wow | `SceneWow` | 🟡 Placeholder estrutural |
| 7 | Peças com Significado | `ScenePieces` | 🟡 Placeholder estrutural |
| 8 | Conheça as Peças | `SceneCatalogBridge` | 🟡 CTA aponta para `/catalogo` (placeholder) |

## Estrutura

```
app/
  layout.tsx          # fonte (Cormorant Garamond, self-hosted), metadata
  page.tsx             # monta as 8 cenas, na nova ordem
  globals.css           # cores da marca (--jhoy-wine, --jhoy-offwhite)
  fonts/                 # arquivos .ttf da Cormorant Garamond (variável)

components/
  brand/
    JhoyStar.tsx          # estrela oficial (vinho sobre off-white) — reaproveitada na Cena 04
    JhoyLogo.tsx           # logotipo oficial (não usado no fluxo atual; disponível para reuso futuro)
  scenes/
    SceneHero.tsx           # Cena 01 — Hero Oficial V1 (vídeo do anel)
    SceneManifesto.tsx        # Cena 02 — Manifesto (vídeo do coração anatômico)
    Scene03Affirmations.tsx    # Cena 03 — "valor" + "amada"
    SceneChristCenter.tsx       # Cena 04 — Cristo é o centro (reusa a estrela)
    SceneMoissanite.tsx          # Cena 05 — Moissanite
    SceneWow.tsx                  # Cena 06 — placeholder do Momento Wow
    ScenePieces.tsx                # Cena 07 — placeholder de Peças com Significado
    SceneCatalogBridge.tsx          # Cena 08 — ponte com o catálogo
    ScrollIndicator.tsx              # indicador "Role para descobrir" (tons wine/offwhite)

lib/
  gsap.ts                 # registro central do GSAP + ScrollTrigger
  lenis.ts                  # instância global do Lenis
  useRevealOnScroll.ts        # hook de revelação simples (fade+stagger) usado pelas cenas mais estruturais

public/hero/
  jhoy-hero-ring.mp4          # vídeo aprovado (Hero Candidate A / Hero Oficial V1)
  jhoy-hero-poster.jpg          # poster/primeiro frame do vídeo

public/manifesto/
  coracao-jhoy.mp4              # vídeo aprovado do coração anatômico com joias (Cena 02)
  coracao-jhoy-poster.jpg         # poster/primeiro frame do vídeo

public/moissanite/
  moissanite-macro.jpg          # frame macro extraído do vídeo da Hero, usado na Cena 05

public/brand/
  jhoy-star-vinho.png          # estrela extraída do SVG original (chroma-key, transparente)
  jhoy-logo-vinho.png            # logo extraída do SVG original (chroma-key, transparente)

public/scene02/
  a-main-close.jpg               # peça hero usada na Cena 03 (Afirmações)
  b-mid-reveal.jpg, c-wide-contemplative.jpg, d-editorial-support.jpg,
  e-optional-bright-close.jpg    # não referenciadas atualmente; disponíveis para cenas futuras
```

## O que mudou nesta reestruturação

**Cena 01 (Hero) — nova, substitui a antiga abertura.** Usa o vídeo
aprovado do anel como protagonista full-bleed, com a copy oficial
entrando em 3 momentos (headline → subheadline → assinatura) sobre um
scroll pinado de 150–170vh. O indicador de scroll ganhou uma variante de
cor (`tone="offwhite"`) para funcionar sobre o vídeo escuro.

**Antiga Cena 1 ("A Revelação da Marca" — estrela + logo).** Removida da
posição de abertura, como pedido. A estrela (elemento preservado) foi
reaproveitada na nova Cena 04 ("Cristo é o centro") como convergência
visual/brilho central. O arquivo original não foi mantido no repositório
(a lógica de revelação por máscara segue documentada em `JhoyLogo.tsx`,
caso a logo precise ser reintroduzida em outra cena futuramente).

**Antiga Cena 2 ("Precious") → Cena 03 ("Afirmações").** Redesenhada
depois do reposicionamento inicial — deixou de ser um zoom-out full-bleed
sobre a foto do anel (que ainda lia como "outra hero") e virou uma ponte
narrativa entre o manifesto (Cena 02) e as próximas cenas. Sequência:
frase-ponte discreta ("E se existe algo que queremos que você nunca
esqueça…") → recua → o anel (mesmo asset já existente, sem criar nada
novo) ganha presença ao lado do texto, saindo de um leve desfoque até
nitidez, como apoio visual, nunca como protagonista de tela cheia →
"Você tem valor." entra → "Você é amada." entra com mais peso → as duas
seguram por um instante → recuam de leve para o fechamento "Nunca se
esqueça disso.". Texto e anel ficam em colunas separadas (texto = slots
de altura fixa, sem salto de layout entre as frases; anel = card modesto
com sombra suave, ao lado, nunca em tela cheia).

**Cena 02 (Manifesto) — completa.** Usa o vídeo aprovado do coração
anatômico com joias, em loop. Copy completa: eyebrow "Manifesto",
headline "Por trás da Jhoy / existe um sonho" e o parágrafo de manifesto
("Mais do que vender joias..."). Layout em duas colunas (texto nunca
sobrepõe o coração — nem o colar, nem os brincos, nem o brilho central).
Entrada em fade + leve translateY ao entrar na viewport; durante a
passagem pela cena, um zoom-in bem sutil e contínuo (scale 1 → 1.03)
atrelado ao scroll — o próprio vídeo já carrega vida (o batimento),
então o resto do movimento é propositalmente mínimo.

Sem máscara nas bordas do vídeo: o coração (vasos, brincos, pingente)
chega bem perto das bordas do próprio frame, então uma máscara ali
cortaria conteúdo real (foi exatamente esse o bug reportado — ficava
mais visível durante o zoom). O `heartWrap` tem um padding de respiro
(3%) só para garantir que o leve zoom nunca encoste em nenhum contêiner
ao redor. A cor de fundo do próprio vídeo já é quase idêntica ao
off-white da página, então a borda retangular praticamente não se
percebe sem precisar de truque nenhum.

**Cenas novas (04–08).** Cena 04 (Cristo é o centro) já está
implementada de forma completa, reaproveitando a estrela. As demais
(06 Momento Wow, 07 Peças, 08 Catálogo) são placeholders estruturais
elegantes — sem asset final ainda, mas já na posição e hierarquia
corretas do fluxo, prontos para receber o conteúdo definitivo sem quebrar
a experiência. A Cena 05 (Moissanite) usa um frame macro extraído do
próprio vídeo da Hero como apoio visual coerente, em vez de ficar
totalmente vazia.

Todas as cenas respeitam `prefers-reduced-motion` (composição final
aparece direto, sem pin/scrub/transforms fortes).

## Pendências / próximos passos

- Asset final da Cena 06 (anel com pedra laranja) → substituir o degradê
  provisório em `SceneWow.tsx` por uma foto real.
- Curadoria e fotos da Cena 07 (peças em destaque).
- Apontar o CTA da Cena 08 para a URL real do catálogo já existente no
  sistema (hoje é `/catalogo`, um placeholder).
- Fotografia dedicada para a Cena 05 (Moissanite), se o frame reaproveitado
  do vídeo da Hero não for suficiente a médio prazo.
