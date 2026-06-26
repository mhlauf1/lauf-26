/**
 * Cadence card cover — a simple, static gradient.
 * Navy deepening into teal, no canvas and no interaction.
 */
export function CadenceCover() {
  return (
    <div
      aria-hidden
      className="absolute inset-0 h-full w-full"
      style={{
        background:
          "linear-gradient(135deg, #10224a 0%, #1f3a5f 45%, #229ca8 100%)",
      }}
    />
  );
}
