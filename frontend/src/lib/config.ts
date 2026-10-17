/** A fresh local checkout shows every supplied design without requiring Laravel. */
export function templatePreview(value = process.env.TEMPLATE_PREVIEW): boolean {
  return value?.trim().toLowerCase() !== 'false';
}
