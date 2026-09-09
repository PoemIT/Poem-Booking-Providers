import { useState } from "react";
import { FileText } from "lucide-react";
import { NotificationChannel } from "@/lib/types";
import { Card } from "@/components/providerui/card";
import { ToggleRow } from "./toggle";

const channelLabels: Record<
  NotificationChannel,
  { label: string; description: string }
> = {
  email: {
    label: "Email Alerts",
    description: "Daily summaries and critical system errors.",
  },
  sms: {
    label: "SMS Alerts",
    description: "Immediate notifications for urgent booking cancellations.",
  },
  whatsapp: {
    label: "WhatsApp Integration",
    description: "Direct messaging for staff coordination and guest updates.",
  },
};

export function NotificationsCard() {
  const [channels, setChannels] = useState<
    Record<NotificationChannel, boolean>
  >({
    email: true,
    sms: false,
    whatsapp: true,
  });

  function toggleChannel(channel: NotificationChannel) {
    setChannels((prev) => ({ ...prev, [channel]: !prev[channel] }));
    // await api.updateNotificationChannel(channel, !channels[channel]);
  }

  return (
    <Card className="p-5">
      <div className="mb-2 flex items-start justify-between">
        <div>
          <h2 className="text-base font-semibold text-slate-900">
            Notification Preferences
          </h2>
          <p className="text-sm text-slate-500">
            Configure how alerts are delivered to management.
          </p>
        </div>
      </div>

      <div className="divide-y divide-slate-100">
        {(Object.keys(channelLabels) as NotificationChannel[]).map(
          (channel) => (
            <ToggleRow
              key={channel}
              label={channelLabels[channel].label}
              description={channelLabels[channel].description}
              checked={channels[channel]}
              onChange={() => toggleChannel(channel)}
            />
          ),
        )}
      </div>
    </Card>
  );
}
