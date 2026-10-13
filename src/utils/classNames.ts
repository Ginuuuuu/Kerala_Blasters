type ClassValue = string | number | boolean | undefined | null | { [key: string]: any };

export function cn(...inputs: ClassValue[]): string {
  const classes: string[] = [];

  for (const input of inputs) {
    if (!input) continue;

    if (typeof input === 'string' || typeof input === 'number') {
      classes.push(String(input));
    } else if (typeof input === 'object') {
      if (Array.isArray(input)) {
        const inner = cn(...input);
        if (inner) classes.push(inner);
      } else {
        for (const [key, value] of Object.entries(input)) {
          if (value) classes.push(key);
        }
      }
    }
  }

  return classes.join(' ');
}
