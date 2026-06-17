export type EstiloId = 'pixar' | 'caricatura3d' | 'claymation' | 'lego';

export interface Opciones {
  ambiente: string;
  accion: string;
  estilo: EstiloId;
}
