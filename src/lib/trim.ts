// Trim the first N seconds off an MP4 in the browser using ffmpeg.wasm.
//
// We re-encode (instead of `-c copy`) because veo's clips have a keyframe at
// t=0 and stream-copying would round the cut back to that keyframe — i.e. no
// trim at all. ultrafast/CRF 28 keeps the wait under a few seconds on a phone.

import { FFmpeg } from '@ffmpeg/ffmpeg';
import { fetchFile, toBlobURL } from '@ffmpeg/util';

// Pinned to match the @ffmpeg/ffmpeg 0.12.x line we depend on. Bumping the
// ffmpeg package requires bumping this too.
const CORE_VERSION = '0.12.10';
const CORE_BASE_URL = `https://unpkg.com/@ffmpeg/core@${CORE_VERSION}/dist/umd`;

let ffmpegInstance: FFmpeg | null = null;
let loadPromise: Promise<FFmpeg> | null = null;

async function loadFFmpeg(): Promise<FFmpeg> {
  if (ffmpegInstance) return ffmpegInstance;
  if (loadPromise) return loadPromise;

  loadPromise = (async () => {
    const ff = new FFmpeg();
    await ff.load({
      coreURL: await toBlobURL(`${CORE_BASE_URL}/ffmpeg-core.js`, 'text/javascript'),
      wasmURL: await toBlobURL(`${CORE_BASE_URL}/ffmpeg-core.wasm`, 'application/wasm'),
    });
    ffmpegInstance = ff;
    return ff;
  })();

  return loadPromise;
}

/** Drop the first `startSeconds` from `inputBlob` and return a new MP4 blob. */
export async function trimVideoStart(inputBlob: Blob, startSeconds: number): Promise<Blob> {
  const ff = await loadFFmpeg();

  const inputName = 'in.mp4';
  const outputName = 'out.mp4';

  await ff.writeFile(inputName, await fetchFile(inputBlob));
  await ff.exec([
    '-ss',
    String(startSeconds),
    '-i',
    inputName,
    '-c:v',
    'libx264',
    '-preset',
    'ultrafast',
    '-crf',
    '28',
    '-pix_fmt',
    'yuv420p',
    '-movflags',
    '+faststart',
    '-an',
    outputName,
  ]);

  const data = await ff.readFile(outputName);
  // Best-effort cleanup so a second call doesn't accumulate files in the
  // virtual FS. Ignore failures — the next writeFile would overwrite anyway.
  try {
    await ff.deleteFile(inputName);
    await ff.deleteFile(outputName);
  } catch {
    /* noop */
  }

  // readFile returns Uint8Array for binary reads — string only when called
  // with an explicit text encoding, which we don't.
  if (typeof data === 'string') {
    throw new Error('ffmpeg.readFile returned a string for a binary read');
  }
  return new Blob([data.buffer as ArrayBuffer], { type: 'video/mp4' });
}
