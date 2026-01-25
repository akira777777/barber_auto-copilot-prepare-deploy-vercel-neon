
import React, { useState, useEffect, useRef } from 'react';
import { 
  LayoutDashboard, 
  Users, 
  Calendar, 
  Package, 
  MessageSquare, 
  TrendingUp, 
  Settings, 
  LogOut,
  Bell,
  Search,
  Filter,
  MoreVertical,
  CheckCircle2,
  Clock,
  Send,
  Bot,
  ChevronRight,
  Zap,
  ArrowUpRight,
  RefreshCcw,
  Video,
  Play,
  FileVideo,
  Sparkles,
  Loader2,
  AlertTriangle
} from 'lucide-react';
import { analyzeVideoContent, generateAiVideo } from '../services/gemini';

const AdminDashboard: React.FC<{onLogout: () => void}> = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [botLogs, setBotLogs] = useState<{id: number, time: string, message: string, type: 'info' | 'success' | 'warning'}[]>([]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [videoAnalysisPrompt, setVideoAnalysisPrompt] = useState('Analyze this video and identify key actions or potential improvements in customer service.');
  const [analysisResult, setAnalysisResult] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationMsg, setGenerationMsg] = useState('');
  const [generatedVideoUrl, setGeneratedVideoUrl] = useState<string | null>(null);
  
  const logContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const logs = [
      { id: 1, time: '10:15', message: 'New booking notification sent to Max Sharp', type: 'info' },
      { id: 2, time: '10:32', message: 'Appointment reminder sent to Lukas M. via Telegram', type: 'success' },
      { id: 3, time: '11:05', message: 'Customer feedback received: 5 stars from Mark D.', type: 'success' },
      { id: 4, time: '11:20', message: 'Daily inventory report generated for manager', type: 'info' },
      { id: 5, time: '12:00', message: 'Automatic broadcast: "Happy Hour" promo sent to 150 users', type: 'warning' },
    ];
    setBotLogs(logs as any);
  }, []);

  useEffect(() => {
    if (logContainerRef.current) {
      logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
    }
  }, [botLogs]);

  const addLog = (message: string, type: 'info' | 'success' | 'warning' = 'info') => {
    const now = new Date();
    const time = `${now.getHours()}:${now.getMinutes().toString().padStart(2, '0')}`;
    setBotLogs(prev => [...prev, { id: prev.length + 1, time, message, type }]);
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      addLog('System cache cleared and dashboard data refreshed', 'info');
    }, 1000);
  };

  const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setVideoFile(file);
  };

  const runVideoAnalysis = async () => {
    if (!videoFile) return;
    setIsAnalyzing(true);
    setAnalysisResult(null);
    try {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64 = (reader.result as string).split(',')[1];
        const result = await analyzeVideoContent(base64, videoFile.type, videoAnalysisPrompt);
        setAnalysisResult(result);
        setIsAnalyzing(false);
        addLog('Video analysis complete: ' + videoFile.name, 'success');
      };
      reader.readAsDataURL(videoFile);
    } catch (err) {
      console.error(err);
      setIsAnalyzing(false);
    }
  };

  const handleGeneratePromo = async () => {
    setIsGenerating(true);
    setGeneratedVideoUrl(null);
    try {
      // Prompt specifically requested: Telegram bot and admin panel
      const url = await generateAiVideo("A high-tech cinematic video featuring a sleek Telegram bot interface and a modern dark-mode admin dashboard for a premium barbershop, moving smoothly between interfaces with neon gold accents", setGenerationMsg);
      setGeneratedVideoUrl(url);
      addLog('AI Promotional video generated successfully', 'success');
    } catch (err) {
      console.error(err);
      addLog('Failed to generate promo video', 'warning');
    } finally {
      setIsGenerating(false);
    }
  };

  const stats = [
    { label: 'Total Revenue', value: '42,500 Kč', trend: '+12%', icon: TrendingUp },
    { label: 'Today\'s Bookings', value: '18', trend: '+5', icon: Calendar },
    { label: 'Active Clients', value: '1,204', trend: '+24', icon: Users },
    { label: 'Bot Interactions', value: '85', trend: 'Online', icon: Bot },
  ];

  const renderVisionLab = () => (
    <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500">
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Analysis Section */}
        <div className="bg-zinc-950 border border-zinc-800 p-8 flex flex-col space-y-6">
          <div className="flex items-center gap-3 border-b border-zinc-800 pb-4">
            <Video className="text-[#c5a059]" />
            <h3 className="text-xl font-black oswald uppercase tracking-widest">Video Understanding AI</h3>
          </div>
          <p className="text-zinc-500 text-xs uppercase tracking-widest font-bold">Upload security footage or training clips for deep Gemini 3 Pro analysis.</p>
          
          <div className="border-2 border-dashed border-zinc-800 hover:border-[#c5a059] transition-colors p-10 text-center relative cursor-pointer group">
            <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" accept="video/*" onChange={handleVideoUpload} />
            <FileVideo className="mx-auto mb-4 text-zinc-700 group-hover:text-[#c5a059] transition-colors" size={40} />
            <p className="text-xs font-black uppercase oswald tracking-widest">
              {videoFile ? videoFile.name : "Click to select or drag video file"}
            </p>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-600">Analysis Intent</label>
            <textarea 
              value={videoAnalysisPrompt}
              onChange={(e) => setVideoAnalysisPrompt(e.target.value)}
              className="w-full bg-black border border-zinc-800 p-4 text-sm oswald tracking-widest outline-none focus:border-[#c5a059] min-h-[100px] text-zinc-300"
            />
          </div>

          <button 
            onClick={runVideoAnalysis}
            disabled={!videoFile || isAnalyzing}
            className="w-full bg-[#c5a059] text-black py-4 font-black uppercase oswald tracking-[0.2em] hover:bg-white transition-all disabled:opacity-30 flex items-center justify-center gap-3"
          >
            {isAnalyzing ? <Loader2 className="animate-spin" /> : <Sparkles size={18} />}
            {isAnalyzing ? 'Analyzing with Gemini 3 Pro...' : 'Start AI Analysis'}
          </button>

          {analysisResult && (
            <div className="bg-black border border-[#c5a059]/30 p-6 mt-4 animate-in fade-in zoom-in-95 duration-300">
               <h4 className="text-[#c5a059] text-[10px] font-black uppercase oswald tracking-widest mb-4 flex items-center gap-2">
                 <CheckCircle2 size={14} /> AI Insights Report
               </h4>
               <div className="text-sm text-zinc-400 leading-relaxed font-medium whitespace-pre-wrap">
                 {analysisResult}
               </div>
            </div>
          )}
        </div>

        {/* Generation Section */}
        <div className="bg-zinc-950 border border-zinc-800 p-8 flex flex-col space-y-6">
          <div className="flex items-center gap-3 border-b border-zinc-800 pb-4">
            <Zap className="text-[#c5a059]" />
            <h3 className="text-xl font-black oswald uppercase tracking-widest">Marketing Video Engine</h3>
          </div>
          <p className="text-zinc-500 text-xs uppercase tracking-widest font-bold">Generate premium AI videos using Veo 3.1 for social media and ads.</p>
          
          <div className="bg-black border border-zinc-900 p-6 rounded-sm space-y-4">
            <div className="flex items-center gap-4 text-[#c5a059]">
              <Bot size={24} />
              <div>
                <p className="text-xs font-black uppercase oswald tracking-widest">Preset: Product Demo</p>
                <p className="text-[10px] text-zinc-500 font-bold">Featuring Telegram bot & Admin Panel</p>
              </div>
            </div>
          </div>

          <button 
            onClick={handleGeneratePromo}
            disabled={isGenerating}
            className="w-full border-2 border-[#c5a059] text-[#c5a059] py-4 font-black uppercase oswald tracking-[0.2em] hover:bg-[#c5a059] hover:text-black transition-all disabled:opacity-30 flex items-center justify-center gap-3"
          >
            {isGenerating ? <Loader2 className="animate-spin" /> : <Play size={18} fill="currentColor" />}
            {isGenerating ? 'Veo is generating...' : 'Generate Promo Video'}
          </button>

          {isGenerating && (
            <div className="flex flex-col items-center justify-center py-10 space-y-4">
               <div className="w-full bg-zinc-900 h-1 overflow-hidden">
                  <div className="bg-[#c5a059] h-full animate-[progress_20s_ease-in-out_infinite]" style={{width: '60%'}}></div>
               </div>
               <p className="text-[10px] text-[#c5a059] font-black uppercase tracking-widest animate-pulse">{generationMsg}</p>
            </div>
          )}

          {generatedVideoUrl && (
            <div className="space-y-4 animate-in fade-in duration-700">
               <video src={generatedVideoUrl} controls className="w-full border-2 border-zinc-800 bg-black aspect-video" />
               <div className="flex justify-between items-center">
                  <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">AI Generated via Veo 3.1 • 720p 16:9</p>
                  <a href={generatedVideoUrl} download="iron-steel-promo.mp4" className="text-[#c5a059] text-xs font-black oswald uppercase tracking-widest border-b border-[#c5a059]">Download Video</a>
               </div>
            </div>
          )}

          {!generatedVideoUrl && !isGenerating && (
            <div className="flex-grow flex items-center justify-center border border-zinc-900 bg-zinc-900/10 min-h-[200px]">
               <div className="text-center opacity-20">
                  <Video size={48} className="mx-auto mb-2" />
                  <p className="text-[10px] uppercase font-black tracking-[0.3em]">No Preview Available</p>
               </div>
            </div>
          )}
        </div>
      </div>
      
      <div className="bg-zinc-950 border border-zinc-800 p-6 flex items-center gap-4">
        <AlertTriangle className="text-orange-500 shrink-0" size={24} />
        <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">
          Note: Video AI features consume higher token counts. Gemini 3 Pro supports multimodal context up to 2 million tokens for comprehensive video understanding.
        </p>
      </div>
    </div>
  );

  const renderDashboard = () => (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="bg-zinc-950 border border-zinc-800 p-6 flex items-center justify-between group hover:border-[#c5a059] transition-all relative overflow-hidden">
            <div className="relative z-10">
              <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest mb-1">{stat.label}</p>
              <p className="text-3xl font-black oswald">{stat.value}</p>
              <div className="flex items-center gap-1 mt-2">
                <span className={`text-[10px] font-black uppercase tracking-tighter ${stat.trend.startsWith('+') ? 'text-green-500' : 'text-[#c5a059]'}`}>
                  {stat.trend}
                </span>
                <span className="text-[9px] text-zinc-700 font-bold uppercase">vs last month</span>
              </div>
            </div>
            <div className="w-12 h-12 bg-zinc-900 flex items-center justify-center border border-zinc-800 group-hover:bg-[#c5a059] group-hover:text-black transition-all">
              <stat.icon size={22} />
            </div>
            <div className="absolute -right-2 -bottom-2 opacity-[0.03] group-hover:opacity-[0.07] transition-opacity">
              <stat.icon size={100} />
            </div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-zinc-950 border border-zinc-800 p-6">
            <div className="flex items-center justify-between mb-8">
               <h3 className="text-lg font-black uppercase oswald tracking-widest flex items-center gap-2">
                <TrendingUp size={18} className="text-[#c5a059]" /> Revenue Forecast
              </h3>
            </div>
            <div className="h-48 w-full flex items-end gap-1 px-2 border-b border-zinc-800 pb-2">
              {[45, 60, 55, 70, 80, 75, 90, 85, 95, 100, 90, 80].map((h, i) => (
                <div key={i} className="flex-1 bg-zinc-900 relative group cursor-pointer hover:bg-[#c5a059]/20 transition-all" style={{height: `${h}%`}}>
                  <div className="absolute inset-x-0 bottom-0 bg-[#c5a059] opacity-20 h-full group-hover:opacity-100 transition-opacity"></div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-zinc-950 border border-zinc-800 flex flex-col">
            <div className="p-6 border-b border-zinc-800 flex justify-between items-center">
              <h3 className="text-lg font-black uppercase oswald tracking-widest flex items-center gap-2">
                <Calendar size={18} className="text-[#c5a059]" /> Recent Bookings
              </h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <tbody className="divide-y divide-zinc-900">
                  {[
                    { name: 'James Wilson', service: 'Classic Cut', barber: 'Max Sharp', time: '14:30', status: 'Confirmed' },
                    { name: 'Petr Novak', service: 'Beard Trim', barber: 'Viktor Prague', time: '15:15', status: 'In Progress' },
                  ].map((row, i) => (
                    <tr key={i} className="group hover:bg-zinc-900/50 transition-colors">
                      <td className="px-6 py-4 font-bold uppercase oswald tracking-tight">{row.name}</td>
                      <td className="px-6 py-4 text-xs text-zinc-400 font-medium">{row.service}</td>
                      <td className="px-6 py-4 text-xs text-[#c5a059] font-bold uppercase oswald">{row.barber}</td>
                      <td className="px-6 py-4 text-xs font-black oswald">{row.time}</td>
                      <td className="px-6 py-4"><span className="text-[9px] px-2 py-1 border-2 border-green-500/30 text-green-500 uppercase font-black">{row.status}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="bg-zinc-950 border border-zinc-800 flex flex-col h-full">
          <div className="p-6 border-b border-zinc-800 flex justify-between items-center bg-black/40">
            <h3 className="text-lg font-black uppercase oswald tracking-widest flex items-center gap-2">
              <Bot size={18} className="text-[#c5a059]" /> Bot Terminal
            </h3>
          </div>
          <div className="p-6 flex-grow flex flex-col overflow-hidden">
            <div ref={logContainerRef} className="bg-black border-2 border-zinc-800 rounded-sm p-4 mb-6 flex-grow overflow-y-auto custom-scrollbar">
               <div className="space-y-4">
                  {botLogs.map(log => (
                    <div key={log.id} className="text-[10px] border-l-2 border-zinc-800 pl-3 py-1">
                      <p className="text-zinc-600 flex justify-between mb-1">
                        <span className="font-bold oswald">{log.time}</span>
                      </p>
                      <p className={`font-black uppercase tracking-tight ${log.type === 'success' ? 'text-green-500' : log.type === 'warning' ? 'text-[#c5a059]' : 'text-zinc-400'}`}>
                        {log.message}
                      </p>
                    </div>
                  ))}
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#050505] text-white flex font-sans selection:bg-[#c5a059] selection:text-black">
      {/* Sidebar */}
      <aside className="w-64 border-r border-zinc-800 flex flex-col p-6 bg-black hidden lg:flex shrink-0">
        <div className="mb-12">
          <span className="text-xl font-black oswald tracking-tighter flex items-center gap-2">
            <div className="w-6 h-6 bg-[#c5a059] flex items-center justify-center text-black text-[10px]">IS</div>
            IRON <span className="text-[#c5a059]">&</span> STEEL <span className="text-[10px] text-zinc-500 ml-2">ADMIN</span>
          </span>
        </div>

        <nav className="flex-grow space-y-2">
          {[
            { icon: LayoutDashboard, label: 'Dashboard' },
            { icon: Video, label: 'Vision Lab' },
            { icon: Calendar, label: 'Appointments' },
            { icon: Users, label: 'Customers' },
            { icon: Package, label: 'Inventory' },
            { icon: MessageSquare, label: 'Telegram Bot' },
          ].map((item) => (
            <button 
              key={item.label} 
              onClick={() => setActiveTab(item.label)}
              className={`w-full group flex items-center justify-between px-4 py-3 text-sm font-bold uppercase oswald tracking-widest transition-all ${activeTab === item.label ? 'bg-[#c5a059] text-black' : 'text-zinc-500 hover:text-white hover:bg-zinc-900'}`}
            >
              <div className="flex items-center space-x-3">
                <item.icon size={18} />
                <span>{item.label}</span>
              </div>
            </button>
          ))}
        </nav>

        <button 
          onClick={onLogout}
          className="mt-auto flex items-center space-x-3 px-4 py-3 text-sm font-bold uppercase oswald tracking-widest text-zinc-500 hover:text-red-500 transition-all"
        >
          <LogOut size={18} />
          <span>Exit Admin</span>
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <header className="h-20 border-b border-zinc-800 flex items-center justify-between px-8 bg-black/50 backdrop-blur-md sticky top-0 z-10">
          <div className="flex items-center bg-zinc-900 px-4 py-2 border border-zinc-800 w-full max-w-md">
            <Search size={16} className="text-zinc-500 mr-2 shrink-0" />
            <input type="text" placeholder="Search system..." className="bg-transparent border-none outline-none text-sm w-full placeholder:text-zinc-700" />
          </div>

          <div className="flex items-center space-x-4 lg:space-x-6">
            <button onClick={handleRefresh} className={`p-2 text-zinc-400 hover:text-white transition-all ${isRefreshing ? 'animate-spin' : ''}`}><RefreshCcw size={18} /></button>
            <button className="relative p-2 text-zinc-400 hover:text-white"><Bell size={20} /></button>
            <div className="flex items-center space-x-3 pl-6 border-l border-zinc-800 ml-2">
              <div className="w-10 h-10 bg-[#c5a059] flex items-center justify-center text-black font-black text-xl oswald">A</div>
            </div>
          </div>
        </header>

        <div className="p-4 lg:p-8 space-y-8">
          <div>
            <h1 className="text-4xl font-black oswald uppercase tracking-tight">{activeTab}</h1>
            <p className="text-zinc-500 text-sm uppercase tracking-[0.2em] font-bold mt-1">Iron & Steel Prague Management System</p>
          </div>

          {activeTab === 'Dashboard' && renderDashboard()}
          {activeTab === 'Vision Lab' && renderVisionLab()}
          {activeTab !== 'Dashboard' && activeTab !== 'Vision Lab' && (
            <div className="flex flex-col items-center justify-center py-40 border-2 border-dashed border-zinc-900">
               <Package size={48} className="text-zinc-800 mb-4" />
               <p className="text-sm font-black uppercase oswald tracking-widest text-zinc-700">{activeTab} module is coming soon</p>
            </div>
          )}
        </div>
      </main>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: #000; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #222; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #c5a059; }
        @keyframes progress { 0% { transform: translateX(-100%); } 100% { transform: translateX(100%); } }
      `}</style>
    </div>
  );
};

export default AdminDashboard;
