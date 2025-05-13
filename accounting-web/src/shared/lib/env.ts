function getEnvVar(key: string): string {
  const value = import.meta.env[key as keyof ImportMetaEnv];
  if (!value) {
    throw new Error(`Missing environment variable: ${key}`);
  }
  return value;
}

export const Envs = {
  API_URL: getEnvVar("VITE_API_URL"),
};
