import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import {
  auth,
  db,
  BUSINESS_EMAIL,
  BUSINESS_WHATSAPP_NUMBER,
  clampStr,
  sanitizeId,
  handleFirestoreError,
  OperationType,
} from './firebase';

export interface NotificationRecipientInput {
  role: 'owner' | 'beautician' | 'customer';
  name: string;
  phone?: string;
  email?: string;
  whatsappText: string;
  emailSubject: string;
  emailHtml: string;
}

export interface DispatchedNotificationResult {
  recipientRole: 'owner' | 'beautician' | 'customer';
  recipientName: string;
  recipientContact: string;
  channel: 'whatsapp' | 'email';
  status: 'delivered' | 'failed' | 'not_configured';
  providerMessageId?: string;
  errorMessage?: string;
  payloadSummary: string;
}

export async function dispatchAndLogNotifications(params: {
  appointmentId: string;
  bookingReference: string;
  eventType: string;
  recipients: NotificationRecipientInput[];
}): Promise<DispatchedNotificationResult[]> {
  const currentUser = auth.currentUser;
  if (!currentUser) return [];

  let results: DispatchedNotificationResult[] = [];
  try {
    const token = await currentUser.getIdToken();
    const res = await fetch('/api/notifications/dispatch', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(params),
    });

    if (res.ok) {
      const json = (await res.json()) as { results?: DispatchedNotificationResult[] };
      results = Array.isArray(json.results) ? json.results : [];
    } else {
      const errText = await res.text().catch(() => `HTTP ${res.status}`);
      results = params.recipients.flatMap((r) => {
        const items: DispatchedNotificationResult[] = [];
        if (r.phone) {
          items.push({
            recipientRole: r.role,
            recipientName: r.name,
            recipientContact: r.phone,
            channel: 'whatsapp',
            status: 'failed',
            errorMessage: clampStr(errText, 500),
            payloadSummary: clampStr(r.whatsappText, 500),
          });
        }
        if (r.email) {
          items.push({
            recipientRole: r.role,
            recipientName: r.name,
            recipientContact: r.email,
            channel: 'email',
            status: 'failed',
            errorMessage: clampStr(errText, 500),
            payloadSummary: clampStr(r.emailSubject, 500),
          });
        }
        return items;
      });
    }
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Notification endpoint unreachable';
    results = params.recipients.flatMap((r) => {
      const items: DispatchedNotificationResult[] = [];
      if (r.phone) {
        items.push({
          recipientRole: r.role,
          recipientName: r.name,
          recipientContact: r.phone,
          channel: 'whatsapp',
          status: 'failed',
          errorMessage: clampStr(msg, 500),
          payloadSummary: clampStr(r.whatsappText, 500),
        });
      }
      if (r.email) {
        items.push({
          recipientRole: r.role,
          recipientName: r.name,
          recipientContact: r.email,
          channel: 'email',
          status: 'failed',
          errorMessage: clampStr(msg, 500),
          payloadSummary: clampStr(r.emailSubject, 500),
        });
      }
      return items;
    });
  }

  // Persist honest delivery status logs to Firestore
  for (let i = 0; i < results.length; i++) {
    const item = results[i];
    const logId = sanitizeId(`nlog-${Date.now()}-${i}-${Math.random().toString(36).slice(2, 7)}`);
    const path = `notification_logs/${logId}`;
    const payload: Record<string, unknown> = {
      id: logId,
      appointmentId: sanitizeId(params.appointmentId),
      bookingReference: clampStr(params.bookingReference, 40),
      eventType: clampStr(params.eventType, 60),
      recipientRole: item.recipientRole,
      recipientName: clampStr(item.recipientName || 'Recipient', 120),
      recipientContact: clampStr(item.recipientContact || 'unknown', 160),
      channel: item.channel,
      status: item.status,
      payloadSummary: clampStr(item.payloadSummary, 600),
      createdByUid: currentUser.uid,
      createdAt: serverTimestamp(),
    };
    if (item.providerMessageId) {
      payload.providerMessageId = clampStr(item.providerMessageId, 200);
    }
    if (item.errorMessage) {
      payload.errorMessage = clampStr(item.errorMessage, 500);
    }

    try {
      await setDoc(doc(db, 'notification_logs', logId), payload);
    } catch (error) {
      // Do not crash user booking UX if notification log write fails, but record via handleFirestoreError in console
      try {
        handleFirestoreError(error, OperationType.CREATE, path);
      } catch {
        // already logged structured JSON
      }
    }
  }

  return results;
}

export function buildOwnerRecipient(subject: string, bodyText: string, html: string): NotificationRecipientInput {
  return {
    role: 'owner',
    name: 'Hello Madam Owner',
    phone: BUSINESS_WHATSAPP_NUMBER,
    email: BUSINESS_EMAIL,
    whatsappText: bodyText,
    emailSubject: subject,
    emailHtml: html,
  };
}
