function toCamelCase(str: string): string {
  return str.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
}

export function convertKeysToCamelCase(obj: any): any {
  if (Array.isArray(obj)) {
    return obj.map(convertKeysToCamelCase);
  } else if (obj !== null && typeof obj === "object") {
    return Object.entries(obj).reduce((acc, [key, value]) => {
      const camelKey = toCamelCase(key);
      acc[camelKey] = convertKeysToCamelCase(value);
      return acc;
    }, {} as any);
  } else {
    return obj;
  }
}
