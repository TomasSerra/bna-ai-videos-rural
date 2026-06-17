import {
  Beef,
  Blocks,
  Clapperboard,
  Coffee,
  Cookie,
  Dog,
  Laugh,
  Milk,
  Mountain,
  Sprout,
  Sun,
  Tractor,
  Warehouse,
} from 'lucide-react';
import type { ComponentType, SVGProps } from 'react';
import { Horse } from '@/components/icons/Horse';
import type { EstiloId } from '@/types';

export type IconComponent = ComponentType<SVGProps<SVGSVGElement> & { className?: string }>;

interface Option {
  id: string;
  label: string;
  en: string;
  icon: IconComponent;
}

export const AMBIENTES: Option[] = [
  {
    id: 'campo',
    label: 'Campo abierto',
    en: 'in a vast open Argentine pampa at golden-hour sunrise, tall golden-green grass swaying gently in the breeze, soft warm light, a few scattered ombú trees and a wide sky with slowly drifting clouds — the scene fills the full frame edge-to-edge, no empty space',
    icon: Sun,
  },
  {
    id: 'granja',
    label: 'Granja',
    en: 'at a classic rural farm with a weathered red barn, wooden post-and-rail fences, stacked hay bales and farm tools, warm countryside daylight with dust motes floating in the air — the scene fills the full frame edge-to-edge, no empty space',
    icon: Warehouse,
  },
  {
    id: 'soja',
    label: 'Sembrado de soja',
    en: 'in a vast green soybean field under a wide bright sky, neat parallel rows of crops rippling in the wind toward the horizon, warm late-afternoon light — the scene fills the full frame edge-to-edge, no empty space',
    icon: Sprout,
  },
  {
    id: 'patagonia',
    label: 'Patagonia',
    en: 'on the windswept Patagonian steppe with dry golden grassland bending in the wind and snow-capped Andes mountains in the distance under a dramatic wide sky, cool crisp daylight — the scene fills the full frame edge-to-edge, no empty space',
    icon: Mountain,
  },
  {
    id: 'corral',
    label: 'Corral con vacas',
    en: 'in a rustic wooden cattle corral with dusty ground and a softly blurred herd of cows shifting slowly behind the person, warm countryside daylight — the scene fills the full frame edge-to-edge, no empty space',
    icon: Beef,
  },
];

export const ACCIONES: Option[] = [
  {
    id: 'tractor',
    label: 'Manejando un tractor',
    en: 'sitting at the wheel of a green farm tractor, both hands on the steering wheel turning it slightly, gently bouncing as the tractor rolls forward, shown from the waist up',
    icon: Tractor,
  },
  {
    id: 'caballo',
    label: 'A caballo',
    en: 'riding a horse, sitting upright and confident in the saddle, swaying naturally with the horse\'s slow walk while holding the leather reins with one hand',
    icon: Horse,
  },
  {
    id: 'ordenando',
    label: 'Ordeñando una vaca',
    en: 'milking a dairy cow by hand with steady rhythmic hand movements, sitting on a small wooden stool close beside the cow',
    icon: Milk,
  },
  {
    id: 'arreando',
    label: 'Arreando ovejas',
    en: 'herding a small flock of sheep across the field, waving an arm to guide them alongside an attentive working sheepdog trotting nearby',
    icon: Dog,
  },
  {
    id: 'mate',
    label: 'Tomando mate',
    en: 'holding a traditional Argentine mate gourd with a metal bombilla in one hand at chest height, the mate simply resting in the hand and the person smiling warmly at the camera',
    icon: Coffee,
  },
];

interface EstiloOption extends Option {
  id: EstiloId;
}

export const ESTILOS: EstiloOption[] = [
  {
    id: 'pixar',
    label: 'Animación 3D',
    en: 'cinematic 3D animated style — smooth polished textures, big expressive eyes with bright catchlights, vibrant saturated colors, soft cinematic lighting and a playful polished look typical of modern family-friendly 3D animated features. The entire scene (background and objects) is rendered and animated in the same 3D animated style filling the full frame edge-to-edge — no empty white space, no vignette',
    icon: Clapperboard,
  },
  {
    id: 'caricatura3d',
    label: 'Caricatura 3D',
    en: 'semi-realistic 3D caricature look with strongly exaggerated proportions but realistic skin, hair and material detail — rendered like a high-end character bust with subsurface scattering, realistic pores and soft cinematic studio lighting. PROPORTIONS: the head is enormous and clearly dominates the frame — roughly the same size as the entire torso — sitting on a noticeably small, narrow body with small shoulders and short little arms. The eyes are big and wide-open with detailed irises and visible catchlights; the nose is large and prominent; the mouth is small and compact. The entire scene (background and objects) is rendered and animated in the same semi-realistic 3D caricature style filling the full frame edge-to-edge — no empty white space, no vignette',
    icon: Laugh,
  },
  {
    id: 'claymation',
    label: 'Claymation 3D',
    en: 'handcrafted 3D clay stop-motion style — everything sculpted out of modelling clay with visible fingerprints, tiny tool marks and slightly uneven matte clay surfaces, warm tabletop miniature-set lighting and the gentle stepped motion of stop-motion animation. The entire scene (background, characters and objects) is built and animated from clay in the same style filling the full frame edge-to-edge — no empty white space, no vignette',
    icon: Cookie,
  },
  {
    id: 'lego',
    label: 'LEGO',
    en: '3D toy brick world style — everything built from glossy plastic interlocking bricks and minifigure-style parts, including a blocky plastic minifigure with cylindrical head and clip hands. Bright saturated plastic colors, subtle plastic reflections and the slightly snappy movement of brick-built animation. The entire scene (background, vehicles, animals and objects) is constructed from plastic bricks in the same style filling the full frame edge-to-edge — no empty white space, no vignette',
    icon: Blocks,
  },
];
