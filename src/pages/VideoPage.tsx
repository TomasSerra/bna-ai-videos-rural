import { useEffect, useRef, useState } from 'react';
import { Download, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { trimVideoStart } from '@/lib/trim';

const BRAND_TEXT = 'Salgamos al campo con';
const LOGO_SRC = '/logo-bna.png';

// veo uses the uploaded selfie as the literal first frame — without trimming,
// the MP4 visibly freezes before the animation starts. Match the preview skip.
const TRIM_START_SECONDS = 0.7;

function fallbackDownload(file: File) {
  const url = URL.createObjectURL(file);
  const a = document.createElement('a');
  a.href = url;
  a.download = file.name;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

export function VideoPage() {
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  // iOS Safari drops the user-gesture context across `await`, so we prepare
  // the File eagerly on mount — the click handler then calls navigator.share
  // synchronously and the share sheet actually opens.
  const [downloadFile, setDownloadFile] = useState<File | null>(null);
  const [downloading, setDownloading] = useState(false);
  const hasRunRef = useRef(false);

  useEffect(() => {
    document.body.classList.add('allow-native-gestures');
    return () => document.body.classList.remove('allow-native-gestures');
  }, []);

  useEffect(() => {
    if (hasRunRef.current) return;
    hasRunRef.current = true;

    const u = new URLSearchParams(window.location.search).get('u');
    if (!u) {
      setErrorMsg('No se especificó el video.');
      return;
    }
    setVideoUrl(u);

    let cancelled = false;
    (async () => {
      try {
        const resp = await fetch(u);
        if (!resp.ok) throw new Error(`No pude descargar el video (${resp.status}).`);
        const rawBlob = await resp.blob();
        const trimmed = await trimVideoStart(rawBlob, TRIM_START_SECONDS);
        if (cancelled) return;
        const filename = `bna-campo-argentina-${Date.now()}.mp4`;
        setDownloadFile(new File([trimmed], filename, { type: trimmed.type || 'video/mp4' }));
      } catch (err) {
        if (cancelled) return;
        const msg = err instanceof Error ? err.message : 'No pude preparar el video.';
        setErrorMsg(msg);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  const handleDownload = () => {
    if (!downloadFile) return;
    setDownloading(true);

    const nav = navigator as Navigator & {
      canShare?: (data: { files: File[] }) => boolean;
      share?: (data: { files: File[]; title?: string }) => Promise<void>;
    };

    // No awaits between the click and nav.share — iOS requires the share call
    // to happen inside the same task as the user gesture.
    if (nav.canShare?.({ files: [downloadFile] }) && nav.share) {
      nav
        .share({ files: [downloadFile], title: 'Mi video de Campo' })
        .catch(() => {
          fallbackDownload(downloadFile);
        })
        .finally(() => setDownloading(false));
      return;
    }

    fallbackDownload(downloadFile);
    setDownloading(false);
  };

  return (
    <div className="flex min-h-dvh w-dvw flex-col items-center gap-4 bg-[url('/bg-game.png')] bg-cover bg-center bg-no-repeat p-4">
      {errorMsg && (
        <Alert variant="destructive" className="max-w-md">
          <AlertTitle>No pudimos preparar el video</AlertTitle>
          <AlertDescription>{errorMsg}</AlertDescription>
        </Alert>
      )}

      {!errorMsg && !videoUrl && (
        <div className="flex flex-1 items-center justify-center">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Loader2 className="size-5 animate-spin text-white" />
            <p className="text-base text-white">Preparando tu video…</p>
          </div>
        </div>
      )}

      {videoUrl && (
        <>
          <div className="relative max-h-[80dvh] w-auto max-w-full overflow-hidden rounded-lg border bg-muted shadow-sm">
            <video
              src={videoUrl}
              autoPlay
              muted
              playsInline
              disablePictureInPicture
              disableRemotePlayback
              controlsList="nodownload nofullscreen noremoteplayback noplaybackrate"
              onLoadedMetadata={(e) => {
                e.currentTarget.currentTime = TRIM_START_SECONDS;
              }}
              onEnded={(e) => {
                e.currentTarget.currentTime = TRIM_START_SECONDS;
                void e.currentTarget.play();
              }}
              className="max-h-[80dvh] w-auto max-w-full object-contain"
            />
            {/* Branding overlay (no se quema en el MP4 descargado). */}
            <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-center justify-center gap-3 bg-gradient-to-t from-black/80 to-transparent px-4 pb-4 pt-12">
              <span className="font-kievit-black text-base text-white drop-shadow-md sm:text-lg">
                {BRAND_TEXT}
              </span>
              <img src={LOGO_SRC} alt="BNA" className="h-7 w-auto sm:h-8" />
            </div>
          </div>
          <Button
            onClick={handleDownload}
            disabled={!downloadFile || downloading}
            className="h-20 w-[90%] text-3xl [&_svg]:size-8 gap-4"
          >
            {!downloadFile || downloading ? (
              <>
                <Loader2 className="animate-spin" />
                Preparando descarga…
              </>
            ) : (
              <>
                <Download />
                Descargar
              </>
            )}
          </Button>
          <p className="text-center text-xl text-foreground">
            Tambien podes <strong>mantener apretado</strong> el video <br /> y guardarlo en tus fotos
          </p>
        </>
      )}
    </div>
  );
}
