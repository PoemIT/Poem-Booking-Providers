"use client";

import { useEffect, useState } from "react";
import { Download } from "lucide-react";
import { getAvatarColor, getInitials } from "@/lib/format";
import { AuditLogEntry } from "@/lib/types";
import { Card } from "@/components/providerui/card";

const mockLogs: AuditLogEntry[] = [
  {
    id: "l1",
    timestamp: "Oct 24, 14:32",
    action: "Room Price Updated",
    entityAffected: "Suite Royale (ID: 402)",
    userName: "M. Dubois",
  },
  {
    id: "l2",
    timestamp: "Oct 24, 11:15",
    action: "Refund Initiated",
    entityAffected: "Booking #BK-9921",
    userName: "J. Smith",
  },
  {
    id: "l3",
    timestamp: "Oct 23, 09:00",
    action: "System Login",
    entityAffected: "Admin Dashboard",
    userName: "A. Ndi",
  },
];

export function AuditLogsCard() {
  const [logs, setLogs] = useState<AuditLogEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    setIsLoading(true);

    // await api.fetchAuditLogs()
    Promise.resolve(mockLogs).then((data) => {
      if (!cancelled) {
        setLogs(data);
        setIsLoading(false);
      }
    });

    return () => {
      cancelled = true;
    };
  }, []);

  function handleExportCsv() {
    const header = "Timestamp,Action,Entity Affected,User\n";
    const rows = logs
      .map(
        (log) =>
          `"${log.timestamp}","${log.action}","${log.entityAffected}","${log.userName}"`,
      )
      .join("\n");

    const blob = new Blob([header + rows], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "audit-logs.csv";
    link.click();
    URL.revokeObjectURL(url);
  }

  return (
    <Card className="p-5">
      <div className="mb-4 flex items-start justify-between">
        <div>
          <h2 className="text-base font-semibold text-slate-900">Audit Logs</h2>
          <p className="text-sm text-slate-500">
            Recent administrative actions across the platform.
          </p>
        </div>
        <button
          type="button"
          onClick={handleExportCsv}
          disabled={logs.length === 0}
          className="flex items-center gap-1.5 text-sm font-medium text-orange-600 hover:text-orange-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <Download size={14} /> Export CSV
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-xs uppercase tracking-wide text-slate-400">
              <th className="py-2 font-medium">Timestamp</th>
              <th className="py-2 font-medium">Action</th>
              <th className="py-2 font-medium">Entity Affected</th>
              <th className="py-2 font-medium">User</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {isLoading ? (
              <tr>
                <td colSpan={4} className="py-6 text-center text-slate-400">
                  Loading audit logs...
                </td>
              </tr>
            ) : logs.length === 0 ? (
              <tr>
                <td colSpan={4} className="py-6 text-center text-slate-400">
                  No administrative actions recorded yet.
                </td>
              </tr>
            ) : (
              logs.map((log) => (
                <tr key={log.id}>
                  <td className="py-3 text-slate-500">{log.timestamp}</td>
                  <td className="py-3 font-medium text-slate-900">
                    {log.action}
                  </td>
                  <td className="py-3 text-slate-600">{log.entityAffected}</td>
                  <td className="py-3">
                    <div className="flex items-center gap-2">
                      <span
                        className={`flex h-6 w-6 items-center justify-center rounded-full text-[10px] font-semibold text-white ${getAvatarColor(
                          log.userName,
                        )}`}
                      >
                        {getInitials(log.userName)}
                      </span>
                      <span className="text-slate-700">{log.userName}</span>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
