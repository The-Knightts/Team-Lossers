import admin from 'firebase-admin';
import { getApps, cert } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';

// Parse Firebase service account credentials from environment variables
const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT || '{}');

if (!getApps().length) {
  admin.initializeApp({ credential: cert(serviceAccount) });
}

export const auth = getAuth();
