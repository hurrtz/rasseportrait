export const VIDEO_IDS = [
  "grouped_268_268",
  "352",
  "83",
  "grouped_156_296",
  "358",
  "59",
  "50",
  "289",
  "217",
] as const;

export const videoProps = {
  controls: false,
  muted: true,
  loop: true,
  playing: true,
  width: "100%",
  height: "100%",
  playsInline: true,
} as const;

export const isVideoBreed = (id: string | number): boolean =>
  VIDEO_IDS.includes(String(id) as any);
