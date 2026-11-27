import React, { useState, useMemo } from 'react';
import { Bell, Info, MessageCircle, Mail } from 'lucide-react';
import { NotificationLogRecord } from '../../types/management';

interface OwnerNotificationsTabProps {
  notificationLogs: NotificationLogRecord[];
}

export const OwnerNotificationsTab: React.FC<OwnerNotificationsTabProps> = ({
  notificationLogs,
}) => {
  const [channelFilter, setChannelFilter] = useState<'all' | 'whatsapp' | 'email'>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | 'sent' | 'pending' | 'failed'>('all');
  const [eventFilter, setEventFilter] = useState<string>('all');

  const eventTypes = [
    'all',
    'New Booking',
    'Appointment Accepted',
    'Appointment Rejected',
    'Beautician Assigned',
    'Appointment Rescheduled',
  ];

  const filtered = useMemo(() => {
    return notificationLogs.filter((log) => {
      if (channelFilter !== 'all' && log.channel !== channelFilter) return false;
      const normStatus =
        log.status === 'delivered'
          ? 'sent'
          : log.status === 'not_configured'
          ? 'pending'
          : log.status;
      if (statusFilter !== 'all' && normStatus !== statusFilter) return false;
      if (eventFilter !== 'all' && log.eventType !== eventFilter) return false;
      return true;
    });
  }, [notificationLogs, channelFilter, statusFilter, eventFilter]);

  const getDisplayStatus = (rawStatus: string) => {
    if (rawStatus === 'sent' || rawStatus === 'delivered') {
      return {
        label: 'Sent (Mock)',
        badgeClass: 'bg-emerald-100 text-emerald-800',
      };
    }
    if (rawStatus === 'failed') {
      return {
        label: 'Failed (Mock)',
        badgeClass: 'bg-red-100 text-red-800',
      };
    }
    return {
      label: 'Pending (Mock)',
      badgeClass: 'bg-amber-100 text-amber-800',
    };
  };

  return (
    <div className="space-y-5">
      {/* Frontend Demonstration Disclaimer Banner */}
      <div className="bg-white rounded-2xl border border-[#ebdccd] p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        <div className="flex items-start gap-2.5">
          <Info className="w-4 h-4 text-[#e03e1a] shrink-0 mt-0.5" />
          <div>
            <strong className="text-stone-900 block">
              Frontend Demonstration Notification History (No Real Messages Sent)
            </strong>
            <span className="text-stone-500">
              These are sample UI notification logs illustrating WhatsApp &amp; Email triggers for bookings, acceptances, rejections, beautician assignments, and reschedules.
            </span>
          </div>
        </div>
        <span className="px-3 py-1 rounded-lg bg-[#faf7f2] border border-[#ebdccd] font-mono text-[11px] font-bold text-stone-700 shrink-0">
          Demo Records ({notificationLogs.length})
        </span>
      </div>

      {/* Filters Bar */}
      <div className="bg-white rounded-2xl border border-[#ebdccd] p-4 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex flex-wrap items-center gap-2">
          <span className="font-bold text-stone-500 mr-1">Channel:</span>
          {(['all', 'whatsapp', 'email'] as const).map((ch) => (
            <button
              key={ch}
              type="button"
              onClick={() => setChannelFilter(ch)}
              className={`px-3 py-1.5 rounded-xl font-bold capitalize cursor-pointer ${
                channelFilter === ch
                  ? 'bg-[#e03e1a] text-white'
                  : 'bg-[#faf7f2] text-stone-600 border border-[#ebdccd]'
              }`}
            >
              {ch}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <span className="font-bold text-stone-500 mr-1">Mock Status:</span>
          {(['all', 'sent', 'pending', 'failed'] as const).map((st) => (
            <button
              key={st}
              type="button"
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-xl font-bold capitalize cursor-pointer ${
                statusFilter === st
                  ? 'bg-stone-900 text-white'
                  : 'bg-[#faf7f2] text-stone-600 border border-[#ebdccd]'
              }`}
            >
              {st}
            </button>
          ))}
        </div>

        <select
          value={eventFilter}
          onChange={(e) => setEventFilter(e.target.value)}
          className="px-3 py-1.5 bg-[#faf7f2] border border-[#ebdccd] rounded-xl font-semibold text-stone-700"
        >
          {eventTypes.map((ev) => (
            <option key={ev} value={ev}>
              {ev === 'all' ? 'All Events' : ev}
            </option>
          ))}
        </select>
      </div>

      {/* Logs Table */}
      <div className="bg-white rounded-3xl border border-[#ebdccd] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#faf7f2] border-b border-[#ebdccd] text-stone-600 font-serif">
              <tr>
                <th className="py-3 px-4">Booking &amp; Event</th>
                <th className="py-3 px-4">Recipient</th>
                <th className="py-3 px-4">Channel</th>
                <th className="py-3 px-4">Mock Status</th>
                <th className="py-3 px-4">Sample Message Summary</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-10 text-center text-stone-500">
                    <Bell className="w-6 h-6 text-stone-300 mx-auto mb-2" />
                    No demonstration notification records match the current filter.
                  </td>
                </tr>
              ) : (
                filtered.map((log) => {
                  const st = getDisplayStatus(log.status);
                  return (
                    <tr key={log.id} className="hover:bg-[#faf7f2]/50">
                      <td className="py-3 px-4">
                        <div className="font-mono font-bold text-stone-900">
                          {log.bookingReference}
                        </div>
                        <div className="text-[11px] font-semibold text-[#e03e1a]">
                          {log.eventType}
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="font-semibold text-stone-900">
                          {log.recipientName}{' '}
                          <span className="text-stone-400 font-normal">({log.recipientRole})</span>
                        </div>
                        <div className="text-[11px] font-mono text-stone-500">
                          {log.recipientContact}
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <span className="inline-flex items-center gap-1.5 font-semibold text-stone-700 capitalize">
                          {log.channel === 'whatsapp' ? (
                            <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                          ) : (
                            <Mail className="w-3.5 h-3.5 text-stone-600" />
                          )}
                          <span>{log.channel}</span>
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <span
                          className={`px-2.5 py-0.5 rounded-lg text-[10px] font-bold ${st.badgeClass}`}
                        >
                          {st.label}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-[11px] text-stone-600 max-w-md">
                        {log.errorMessage || log.payloadSummary}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
