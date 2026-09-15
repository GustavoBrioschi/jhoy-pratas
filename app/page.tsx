import SceneHero from "@/components/scenes/SceneHero";
import SceneManifesto from "@/components/scenes/SceneManifesto";
import ScenePurposeJourney from "@/components/scenes/ScenePurposeJourney";
import SceneMoissanite from "@/components/scenes/SceneMoissanite";
import ScenePieces from "@/components/scenes/ScenePieces";
import SceneCatalogBridge from "@/components/scenes/SceneCatalogBridge";
import SceneClosing from "@/components/scenes/SceneClosing";

export default function Home() {
  return (
    <>
    <main id="inicio" tabIndex={-1}>
      <SceneHero />
      <SceneManifesto />
      <ScenePurposeJourney />
      <SceneMoissanite />
      <ScenePieces />
      <SceneCatalogBridge />
    </main>
    <SceneClosing />
    </>
  );
}
