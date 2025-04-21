"use client"

import { useContext, useEffect, useState } from "react"
import { Persona } from "@/components/Persona"
import { ContentIdContext } from "../providers/content_id_provider";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { GroupChatDialog } from "@/components/GroupChatDialog";


interface GroupMessage {
  role: string;
  content: string;
  persona?: string;
}

export default function PersonasPage() {
  const ctx = useContext(ContentIdContext);
  if (!ctx) throw new Error("ContentIdContext missing");
  const { contentId, setContentId } = ctx;
  
  const [personas, setPersonas] = useState<Persona[]>([]);
  const [isLoading, setIsLoading] = useState(true)
  const [isGroupChatOpen, setIsGroupChatOpen] = useState(false);
  const [groupMessages, setGroupMessages] = useState<GroupMessage[]>([]);

  const loadPersonas = async () => {
    if (!contentId) return;
      
    try {
      const response = await fetch(`/api/load-content?contentId=${contentId}&contentType=personas`);
      if (!response.ok) {
        throw new Error('Failed to load personas');
      }
      const data = await response.json();
      setPersonas(data.personas);
    } catch (error) {
      console.error('Error loading personas:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadPersonas();
  }, [contentId]);

  const handleMessagesUpdate = (name: string, newMessages: Array<{ role: string; content: string }>) => {
    setPersonas(prevPersonas =>
      prevPersonas.map(persona =>
        persona.name === name
          ? { ...persona, messages: newMessages }
          : persona
      ) ?? []
    )
  }

  if (isLoading) {
    return (
      <div className="container py-8 space-y-8">
        <div className="flex justify-between items-center">
          <div>
            <Skeleton className="h-9 w-64" />
            <Skeleton className="h-5 w-96 mt-2" />
          </div>
          <Skeleton className="h-10 w-32" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-8">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="border rounded-lg overflow-hidden">
              <div className="p-6">
                <div className="flex items-center gap-4">
                  <Skeleton className="h-12 w-12 rounded-full" />
                  <div className="space-y-2">
                    <Skeleton className="h-6 w-40" />
                    <Skeleton className="h-4 w-60" />
                  </div>
                </div>
                <div className="mt-4">
                  <Skeleton className="h-10 w-32" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                  <div className="space-y-4">
                    <div>
                      <Skeleton className="h-5 w-24 mb-2" />
                      <div className="flex flex-wrap gap-2">
                        {[1, 2, 3].map((j) => (
                          <Skeleton key={j} className="h-6 w-20" />
                        ))}
                      </div>
                    </div>
                    <div>
                      <Skeleton className="h-5 w-24 mb-2" />
                      <div className="space-y-1">
                        {[1, 2, 3].map((j) => (
                          <Skeleton key={j} className="h-4 w-full" />
                        ))}
                      </div>
                    </div>
                    <div>
                      <Skeleton className="h-5 w-24 mb-2" />
                      <div className="space-y-1">
                        {[1, 2, 3].map((j) => (
                          <Skeleton key={j} className="h-4 w-full" />
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <Skeleton className="h-5 w-36 mb-2" />
                      <div className="flex flex-wrap gap-2">
                        {[1, 2, 3].map((j) => (
                          <Skeleton key={j} className="h-6 w-20" />
                        ))}
                      </div>
                    </div>
                    <div>
                      <Skeleton className="h-5 w-32 mb-2" />
                      <Skeleton className="h-4 w-full" />
                    </div>
                    <div>
                      <Skeleton className="h-5 w-36 mb-2" />
                      <div className="flex flex-wrap gap-2">
                        {[1, 2, 3].map((j) => (
                          <Skeleton key={j} className="h-6 w-20" />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="container py-8 space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Customer Personas</h1>
          <p className="text-muted-foreground mt-2">
            Detailed profiles of our target customers to help guide marketing and product decisions.
          </p>
        </div>
        <Dialog open={isGroupChatOpen} onOpenChange={setIsGroupChatOpen}>
          <DialogTrigger asChild>
            <Button variant="default" className="ml-4">
              Open Group Chat
            </Button>
          </DialogTrigger>
        </Dialog>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-8">
        {personas.map((persona) => (
          <Persona
            key={persona.name}
            {...persona}
            onMessagesUpdate={(messages) => handleMessagesUpdate(persona.name, messages)}
          />
        ))}
      </div>
      
      <GroupChatDialog
        open={isGroupChatOpen}
        onOpenChange={setIsGroupChatOpen}
        messages={groupMessages}
        onMessagesUpdate={setGroupMessages}
      />
    </div>
  )
} 