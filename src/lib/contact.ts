export function mailTo(email: string, subject?: string): string {
  return 'mailto:' + email + (subject ? '?subject=' + encodeURIComponent(subject) : '');
}
