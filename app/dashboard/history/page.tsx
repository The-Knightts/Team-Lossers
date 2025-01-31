"use client";
import Templates from '@/app/(data)/Templates';
import { db } from '@/utils/db';
import { AIOutput } from '@/utils/schema';
import { useUser } from '@clerk/nextjs';
import { desc, eq } from 'drizzle-orm';
import React, { useEffect, useState } from 'react';
import { TEMPLATE } from '../_component/TemplateListSection';
import moment from 'moment';
import { Button } from '@/components/ui/button';
import { Copy } from 'lucide-react';

// HISTORY Interface (Allow Nullable Fields)
export interface HISTORY {
  formData: string;
  aiResponse: string | null;
  templateSlug: string;
  createdBy: string;
  createdAt: string | null;
}

function History() {
  const { isLoaded, user } = useUser();
  const [historyList, setHistoryList] = useState<HISTORY[]>([]);

  useEffect(() => {
    if (isLoaded && user && user.primaryEmailAddress?.emailAddress) {
      const fetchHistory = async () => {
        const email = user.primaryEmailAddress?.emailAddress;
        
        if (!email) {
          return; // Return early if email is not available
        }

        const history = await db
          .select()
          .from(AIOutput)
          .where(eq(AIOutput.createdBy, email))
          .orderBy(desc(AIOutput.id));
        
        setHistoryList(history);
      };

      fetchHistory();
    }
  }, [isLoaded, user]);

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  if (!user || !user.primaryEmailAddress?.emailAddress) {
    return (
      <div className="m-5 p-5 border rounded-lg bg-white">
        <h1 className="text-3xl font-bold text-gray-900">History</h1>
        <p>You must be logged in to view your history.</p>
      </div>
    );
  }

  const templateMap = new Map(
    Templates.map((template: TEMPLATE) => [
      template.slug,
      { name: template.name, iconUrl: template.icon },
    ])
  );

  return (
    <div className="m-5 p-5 border rounded-lg bg-white">
      <h1 className="text-3xl font-bold text-gray-900">History</h1>
      <h2 className="text-xl text-gray-600">Search for your previously generated AI content.</h2>

      {historyList.length === 0 ? (
        <p className="mt-4">No history found.</p>
      ) : (
        <div className="overflow-x-auto mt-4">
          <table className="min-w-full bg-white border rounded-lg">
            <thead>
              <tr className="border-b bg-gray-100 text-left">
                <th className="p-3">Template</th>
                <th className="p-3">AI Resp</th>
                <th className="p-3">Date</th>
                <th className="p-3">Words</th>
                <th className="p-3">Edit</th>
              </tr>
            </thead>
            <tbody>
              {historyList.map((item, index) => {
                const template = templateMap.get(item.templateSlug) || { name: 'Unknown Template', iconUrl: '' };
                const wordCount = item.aiResponse ? item.aiResponse.split(/\s+/).length : 0;

                return (
                  <tr key={index} className="border-b hover:bg-gray-50">
                    <td className="p-6 flex items-center">
                      {template.iconUrl && (
                        <img src={template.iconUrl} alt={template.name} className="w-6 h-6 mr-2" />
                      )}
                      {template.name}
                    </td>
                    <td className="p-6">
                      {(item.aiResponse ?? 'No response').substring(1, 50) + '...'}
                    </td>
                    <td className="p-6">
                      {item.createdAt && moment(item.createdAt, 'DD/MM/YYYY', true).isValid()
                        ? moment(item.createdAt, 'DD/MM/YYYY').format('DD/MM/YYYY')
                        : 'Unknown'}
                    </td>
                    <td className="p-6">{wordCount || 'N/A'}</td>
                    <td className="p-6 text-blue-600 cursor-pointer text-primary">
                      <Button onClick={() => navigator.clipboard.writeText(item.aiResponse ?? '')}>
                        <Copy className="w-4 h-4" /> Copy
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default History;
