import 'dotenv/config';
import express from 'express';
import path from 'path';
import nodemailer from 'nodemailer';
import { requireAuth, AuthenticatedRequest } from './src/middleware/auth';

const app = express();
const PORT = Number(process.env.PORT || 3000);

app.use(express.json({ limit: '1mb' }));

interface DispatchRecipient {
  role: 'owner' | 'beautician' | 'customer';
  name: string;
  phone?: string;
  email?: string;
  whatsappText: string;
  emailSubject: string;
  emailHtml: string;
}

interface DispatchRequestBody {
  appointmentId: string;
  bookingReference: string;
  eventType: string;
  recipients: DispatchRecipient[];
}

export interface DispatchChannelResult {
  recipientRole: 'owner' | 'beautician' | 'customer';
  recipientName: string;
  recipientContact: string;
  channel: 'whatsapp' | 'email';
  status: 'delivered' | 'failed' | 'not_configured';
  providerMessageId?: string;
  errorMessage?: string;
  payloadSummary: string;
}

function normalizeWhatsAppPhone(raw: string): string {
  const digits = raw.replace(/\D/g, '');
  if (digits.length === 10) return `91${digits}`;
  return digits;
}

function getWhatsAppConfig() {
  const token = (process.env.WHATSAPP_CLOUD_API_TOKEN || '').trim();
  const phoneNumberId = (process.env.WHATSAPP_PHONE_NUMBER_ID || '').trim();
  return {
    configured: Boolean(token && phoneNumberId),
    token,
    phoneNumberId,
  };
}

function getSmtpConfig() {
  const host = (process.env.SMTP_HOST || '').trim();
  const port = Number(process.env.SMTP_PORT || 587);
  const user = (process.env.SMTP_USER || '').trim();
  const pass = (process.env.SMTP_PASS || '').trim();
  const from = (process.env.SMTP_FROM || process.env.BUSINESS_EMAIL || 'dfinesolapur@gmail.com').trim();
  return {
    configured: Boolean(host && user && pass),
    host,
    port,
    user,
    pass,
    from,
  };
}

app.get('/api/health', (_req, res) => {
  const wa = getWhatsAppConfig();
  const smtp = getSmtpConfig();
  res.json({
    ok: true,
    channels: {
      whatsappConfigured: wa.configured,
      emailConfigured: smtp.configured,
    },
  });
});

app.post('/api/notifications/dispatch', requireAuth, async (req: AuthenticatedRequest, res) => {
  const body = req.body as Partial<DispatchRequestBody>;
  if (!body.appointmentId || !body.bookingReference || !body.eventType || !Array.isArray(body.recipients)) {
    res.status(400).json({ error: 'Missing required notification dispatch payload fields' });
    return;
  }

  const waCfg = getWhatsAppConfig();
  const smtpCfg = getSmtpConfig();
  const results: DispatchChannelResult[] = [];

  const smtpTransporter = smtpCfg.configured
    ? nodemailer.createTransport({
        host: smtpCfg.host,
        port: smtpCfg.port,
        secure: smtpCfg.port === 465,
        auth: {
          user: smtpCfg.user,
          pass: smtpCfg.pass,
        },
      })
    : null;

  for (const recipient of body.recipients.slice(0, 6)) {
    // 1. WhatsApp Business Cloud API Channel
    if (recipient.phone && recipient.phone.replace(/\D/g, '').length >= 8) {
      const targetPhone = normalizeWhatsAppPhone(recipient.phone);
      const summary = recipient.whatsappText.slice(0, 500);

      if (!waCfg.configured) {
        results.push({
          recipientRole: recipient.role,
          recipientName: recipient.name.slice(0, 120),
          recipientContact: `+${targetPhone}`.slice(0, 160),
          channel: 'whatsapp',
          status: 'not_configured',
          errorMessage: 'WhatsApp Business Cloud API credentials (WHATSAPP_CLOUD_API_TOKEN / WHATSAPP_PHONE_NUMBER_ID) not configured on server.',
          payloadSummary: summary,
        });
      } else {
        try {
          const apiRes = await fetch(`https://graph.facebook.com/v21.0/${waCfg.phoneNumberId}/messages`, {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${waCfg.token}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              messaging_product: 'whatsapp',
              to: targetPhone,
              type: 'text',
              text: { body: recipient.whatsappText },
            }),
          });
          const apiJson = (await apiRes.json().catch(() => ({}))) as {
            messages?: Array<{ id?: string }>;
            error?: { message?: string };
          };
          const msgId = apiJson.messages?.[0]?.id;
          if (apiRes.ok && msgId) {
            results.push({
              recipientRole: recipient.role,
              recipientName: recipient.name.slice(0, 120),
              recipientContact: `+${targetPhone}`.slice(0, 160),
              channel: 'whatsapp',
              status: 'delivered',
              providerMessageId: msgId.slice(0, 200),
              payloadSummary: summary,
            });
          } else {
            results.push({
              recipientRole: recipient.role,
              recipientName: recipient.name.slice(0, 120),
              recipientContact: `+${targetPhone}`.slice(0, 160),
              channel: 'whatsapp',
              status: 'failed',
              errorMessage: (apiJson.error?.message || `WhatsApp API returned HTTP ${apiRes.status}`).slice(0, 500),
              payloadSummary: summary,
            });
          }
        } catch (err) {
          results.push({
            recipientRole: recipient.role,
            recipientName: recipient.name.slice(0, 120),
            recipientContact: `+${targetPhone}`.slice(0, 160),
            channel: 'whatsapp',
            status: 'failed',
            errorMessage: (err instanceof Error ? err.message : 'WhatsApp network request failed').slice(0, 500),
            payloadSummary: summary,
          });
        }
      }
    }

    // 2. Transactional SMTP Email Channel
    if (recipient.email && recipient.email.includes('@')) {
      const targetEmail = recipient.email.trim().toLowerCase().slice(0, 160);
      const summary = `${recipient.emailSubject}`.slice(0, 500);

      if (!smtpTransporter) {
        results.push({
          recipientRole: recipient.role,
          recipientName: recipient.name.slice(0, 120),
          recipientContact: targetEmail,
          channel: 'email',
          status: 'not_configured',
          errorMessage: 'SMTP credentials (SMTP_HOST / SMTP_USER / SMTP_PASS) not configured on server.',
          payloadSummary: summary,
        });
      } else {
        try {
          const info = await smtpTransporter.sendMail({
            from: smtpCfg.from,
            to: targetEmail,
            subject: recipient.emailSubject,
            html: recipient.emailHtml,
          });
          if (info.messageId) {
            results.push({
              recipientRole: recipient.role,
              recipientName: recipient.name.slice(0, 120),
              recipientContact: targetEmail,
              channel: 'email',
              status: 'delivered',
              providerMessageId: String(info.messageId).slice(0, 200),
              payloadSummary: summary,
            });
          } else {
            results.push({
              recipientRole: recipient.role,
              recipientName: recipient.name.slice(0, 120),
              recipientContact: targetEmail,
              channel: 'email',
              status: 'failed',
              errorMessage: 'SMTP server did not return a messageId.',
              payloadSummary: summary,
            });
          }
        } catch (err) {
          results.push({
            recipientRole: recipient.role,
            recipientName: recipient.name.slice(0, 120),
            recipientContact: targetEmail,
            channel: 'email',
            status: 'failed',
            errorMessage: (err instanceof Error ? err.message : 'SMTP sendMail failed').slice(0, 500),
            payloadSummary: summary,
          });
        }
      }
    }
  }

  res.json({
    results,
    configuredChannels: {
      whatsapp: waCfg.configured,
      email: smtpCfg.configured,
    },
  });
});

async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Hello Madam server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
