/** A fresh local checkout shows every supplied design without requiring Laravel. */
export function templatePreview(value = process.env.TEMPLATE_PREVIEW): boolean {
  return value?.trim().toLowerCase() !== 'false';
}

/** Explicitly enables isolated citizen test accounts; real authentication stays unchanged. */
export function citizenDemoEnabled(value = process.env.CITIZEN_DEMO): boolean {
  return value?.trim().toLowerCase() === 'true';
}
