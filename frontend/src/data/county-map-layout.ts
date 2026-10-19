type MapPoint = readonly [number, number];

export type CountyMapLabel = Readonly<{
  position: MapPoint;
  width: number;
  anchor: MapPoint;
  callout?: boolean;
  via?: MapPoint;
}>;

export const countyMapBounds = { x: 0, y: -35, width: 680, height: 355 } as const;
export const countyMapViewBox = '0 -35 680 355';
export const countyMapLabelHeight = 26;

export const countyMapLabels: Readonly<Record<string, CountyMapLabel>> = {
  ramsar: { position: [45, 6], width: 45, anchor: [54.4, 48.3], callout: true },
  tonekabon: { position: [87, 103], width: 48, anchor: [86.9, 90.1] },
  abbasabad: { position: [132, 16], width: 64, anchor: [139.8, 91.8], callout: true },
  chalus: { position: [203, 55], width: 53, anchor: [174.4, 103], callout: true },
  noshahr: { position: [212, 141], width: 47, anchor: [214.4, 138.1] },
  mahmudabad: { position: [303, 35], width: 70, anchor: [327.6, 103], callout: true },
  amol: { position: [305, 232], width: 33, anchor: [305, 231.9] },
  fereydunkenar: { position: [355, -8], width: 68, anchor: [365.5, 91.3], callout: true },
  babolsar: { position: [410, 32], width: 47, anchor: [396.1, 89], callout: true },
  juybar: { position: [462, -8], width: 47, anchor: [431.5, 87.7], callout: true },
  simorgh: { position: [365, 118], width: 51, anchor: [413.6, 108], callout: true },
  babol: { position: [382, 178], width: 34, anchor: [387.7, 156] },
  savadkuh: { position: [433, 228], width: 60, anchor: [436.1, 213.1] },
  'savadkuh-shomali': { position: [606, 174], width: 100, anchor: [434.7, 155.5], callout: true },
  sari: { position: [510, 185], width: 43, anchor: [501.7, 176.4] },
  galugah: { position: [607, 95], width: 47, anchor: [568, 74.7], callout: true },
  miandorud: { position: [527, 1], width: 66, anchor: [504.4, 131.5], callout: true },
  qaemshahr: {
    position: [438, 194],
    width: 60,
    anchor: [423.6, 128.9],
    callout: true,
    via: [409, 171],
  },
  nur: { position: [272, 168], width: 28, anchor: [280.2, 166] },
  kelardasht: { position: [138, 151], width: 63, anchor: [138.9, 148.9] },
  neka: { position: [552, 131], width: 28, anchor: [540.6, 128.5] },
  behshahr: { position: [550, 48], width: 48, anchor: [529.5, 68.5] },
};

export function countyLabelLeader(label: CountyMapLabel): string | undefined {
  if (!label.callout) return undefined;
  const [x, y] = label.position;
  const from = label.via ?? label.anchor;
  const dx = from[0] - x;
  const dy = from[1] - y;
  const ratio = Math.min(label.width / 2 / Math.abs(dx), countyMapLabelHeight / 2 / Math.abs(dy));
  const end = [x + dx * ratio, y + dy * ratio].map((value) => Number(value.toFixed(2)));
  return [
    'M' + label.anchor.join(' '),
    ...(label.via ? ['L' + label.via.join(' ')] : []),
    'L' + end.join(' '),
  ].join(' ');
}
