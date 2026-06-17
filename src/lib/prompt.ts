import type { Opciones } from '@/types';
import { ACCIONES, AMBIENTES, ESTILOS } from './options';

export interface BuiltPrompt {
  prompt: string;
}

export function buildPrompt(opciones: Opciones): BuiltPrompt {
  const ambiente = AMBIENTES.find((a) => a.id === opciones.ambiente)?.en ?? '';
  const accion = ACCIONES.find((a) => a.id === opciones.accion)?.en ?? '';
  const estilo = ESTILOS.find((e) => e.id === opciones.estilo)?.en ?? 'cinematic 3D animation';

  // veo 3.1 image-to-video already uses the attached photo as the first frame
  // and preserves the face by design. We deliberately keep the prompt short and
  // free of identity-preservation directives, since those phrasings trip the
  // content moderator and produced 422s without improving likeness.

  const mateLine =
    opciones.accion === 'mate'
      ? `The mate gourd rests in the hand — it is not raised to the lips.`
      : '';

  const lines = [
    `A short 4-second vertical 9:16 cinematic clip.`,
    `Visual style: ${estilo}.`,
    `Action: ${accion}.`,
    mateLine,
    `Scene: ${ambiente}. No on-screen text, no watermark.`,
    `Motion: subtle natural movement with a slow, gentle cinematic camera push-in; smooth and loopable within 4 seconds.`,
  ].filter(Boolean);

  return { prompt: lines.join(' ') };
}
