import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { Dashboard } from "@/components/Dashboard";
import { BadgesPage } from "@/components/BadgesPage";
import { StudyPage } from "@/components/StudyPage";

const Index = () => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'badges' | 'study'>('dashboard');

  return (
    <div className="min-h-screen bg-background relative">
      {/* Background elements */}
      <div className="fixed inset-0 bg-grid-pattern bg-[length:40px_40px] opacity-[0.03] pointer-events-none" />
      <div className="fixed top-0 right-0 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[150px] opacity-20 pointer-events-none" />
      <div className="fixed bottom-0 left-0 w-[400px] h-[400px] bg-success/20 rounded-full blur-[120px] opacity-10 pointer-events-none" />

      <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
      
      <main className="pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative">
        {activeTab === 'dashboard' && <Dashboard />}
        {activeTab === 'badges' && <BadgesPage />}
        {activeTab === 'study' && <StudyPage />}
      </main>
    </div>
  );
};

export default Index;
