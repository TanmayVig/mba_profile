function requireEnv(name: string): string {
  const value = process.env[name] as string;
  if (!value) {
    throw new Error(`Environment variable ${name} is required but was not provided.`);
  }
  console.log('Loaded environment variable:', name);
  return value;
}

export const FIREBASE_API_KEY = requireEnv("NEXT_PUBLIC_FIREBASE_API_KEY");
export const FIREBASE_AUTH_DOMAIN = requireEnv("NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN");
export const FIREBASE_PROJECT_ID = requireEnv("NEXT_PUBLIC_FIREBASE_PROJECT_ID");
export const FIREBASE_STORAGE_BUCKET = requireEnv("NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET");
export const FIREBASE_MESSAGING_SENDER_ID = requireEnv("NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID");
export const FIREBASE_APP_ID = requireEnv("NEXT_PUBLIC_FIREBASE_APP_ID");
export const FIREBASE_MEASUREMENT_ID = requireEnv("NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID");