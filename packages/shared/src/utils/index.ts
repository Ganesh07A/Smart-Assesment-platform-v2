// Shared utilities for apps/web and apps/api

/**
 * Format a duration in minutes to a human-readable string.
 * e.g. 90 → "1h 30m"
 */
export function formatDuration(minutes: number): string {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  if (h === 0) return `${m}m`;
  if (m === 0) return `${h}h`;
  return `${h}h ${m}m`;
}

/**
 * Format seconds remaining to MM:SS string.
 */
export function formatCountdown(totalSeconds: number): string {
  const m = Math.floor(totalSeconds / 60);
  const s = totalSeconds % 60;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

/**
 * Calculate percentage score.
 */
export function calcPercentage(score: number, total: number): number {
  if (total === 0) return 0;
  return Math.round((score / total) * 100 * 10) / 10; // 1 decimal
}

/**
 * Get grade label from percentage.
 */
export function getGradeLabel(percentage: number): string {
  if (percentage >= 90) return "A+";
  if (percentage >= 80) return "A";
  if (percentage >= 70) return "B";
  if (percentage >= 60) return "C";
  if (percentage >= 50) return "D";
  return "F";
}

/**
 * Generate a random avatar URL from UI Avatars service.
 */
export function getAvatarUrl(name: string): string {
  const encoded = encodeURIComponent(name);
  return `https://ui-avatars.com/api/?name=${encoded}&background=6366f1&color=fff&size=128`;
}

/**
 * Clamp a number between min and max.
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

/**
 * Checks if a date string represents a future date.
 */
export function isFuture(dateString: string): boolean {
  return new Date(dateString) > new Date();
}

/**
 * Format an ISO date string to a locale-friendly string.
 */
export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("en-IN", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}
