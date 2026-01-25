
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
  AlertTriangle,
  Database
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
        <div className="bg-black border-2 border-zinc-800 p-8 flex flex-col space-y-6">
          <div className="flex items-center gap-3 border-b-2 border-zinc-800 pb-4">
            <Video className="text-[#c5a059]" />
            <h3 className="text-xl font-black oswald uppercase tracking-widest text-white">Video Understanding AI</h3>
          </div>
          <p className="text-zinc-500 text-xs uppercase tracking-widest font-bold">Upload security footage or training clips for deep Gemini 3 Pro analysis.</p>
          
          <div className="border-2 border-dashed border-zinc-800 hover:border-[#c5a059] transition-colors p-10 text-center relative cursor-pointer group bg-zinc-900/30">
            <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" accept="video/*" onChange={handleVideoUpload} />
            <FileVideo className="mx-auto mb-4 text-zinc-600 group-hover:text-[#c5a059] transition-colors" size={40} />
            <p className="text-xs font-black uppercase oswald tracking-widest text-zinc-400 group-hover:text-white transition-colors">
              {videoFile ? videoFile.name : "Select Video File"}
            </p>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-[#c5a059]">Analysis Intent</label>
            <textarea 
              value={videoAnalysisPrompt}
              onChange={(e) => setVideoAnalysisPrompt(e.target.value)}
              className="w-full bg-zinc-950 border-2 border-zinc-800 p-4 text-sm oswald tracking-widest outline-none focus:border-[#c5a059] min-h-[100px] text-zinc-300 placeholder:text-zinc-700"
            />
          </div>

          <button 
            onClick={runVideoAnalysis}
            disabled={!videoFile || isAnalyzing}
            className="w-full bg-[#c5a059] text-black border-2 border-[#c5a059] py-4 font-black uppercase oswald tracking-[0.2em] hover:bg-black hover:text-[#c5a059] transition-all disabled:opacity-30 disabled:hover:bg-[#c5a059] disabled:hover:text-black flex items-center justify-center gap-3"
          >
            {isAnalyzing ? <Loader2 className="animate-spin" /> : <Sparkles size={18} />}
            {isAnalyzing ? 'Analyzing...' : 'Start AI Analysis'}
          </button>

          {analysisResult && (
            <div className="bg-zinc-950 border-2 border-[#c5a059]/50 p-6 mt-4 animate-in fade-in zoom-in-95 duration-300">
               <h4 className="text-[#c5a059] text-[10px] font-black uppercase oswald tracking-widest mb-4 flex items-center gap-2">
                 <CheckCircle2 size={14} /> AI Insights Report
               </h4>
               <div className="text-sm text-zinc-300 leading-relaxed font-medium whitespace-pre-wrap font-mono text-xs">
                 {analysisResult}
               </div>
            </div>
          )}
        </div>

        {/* Generation Section */}
        <div className="bg-black border-2 border-zinc-800 p-8 flex flex-col space-y-6">
          <div className="flex items-center gap-3 border-b-2 border-zinc-800 pb-4">
            <Zap className="text-[#c5a059]" />
            <h3 className="text-xl font-black oswald uppercase tracking-widest text-white">Marketing Video Engine</h3>
          </div>
          <p className="text-zinc-500 text-xs uppercase tracking-widest font-bold">Generate premium AI videos using Veo 3.1 for social media and ads.</p>
          
          <div className="bg-zinc-950 border-2 border-zinc-900 p-6 space-y-4">
            <div className="flex items-center gap-4 text-[#c5a059]">
              <Bot size={24} />
              <div>
                <p className="text-xs font-black uppercase oswald tracking-widest">Preset: Product Demo</p>
                <p className="text-[10px] text-zinc-500 font-bold uppercase">Featuring Telegram bot & Admin Panel</p>
              </div>
            </div>
          </div>

          <button 
            onClick={handleGeneratePromo}
            disabled={isGenerating}
            className="w-full bg-black border-2 border-[#c5a059] text-[#c5a059] py-4 font-black uppercase oswald tracking-[0.2em] hover:bg-[#c5a059] hover:text-black transition-all disabled:opacity-30 flex items-center justify-center gap-3"
          >
            {isGenerating ? <Loader2 className="animate-spin" /> : <Play size={18} fill="currentColor" />}
            {isGenerating ? 'Generating...' : 'Generate Promo Video'}
          </button>

          {isGenerating && (
            <div className="flex flex-col items-center justify-center py-10 space-y-4 bg-zinc-900/20 border-2 border-zinc-900 border-dashed">
               <div className="w-full max-w-[200px] bg-zinc-800 h-1 overflow-hidden">
                  <div className="bg-[#c5a059] h-full animate-[progress_20s_ease-in-out_infinite]" style={{width: '60%'}}></div>
               </div>
               <p className="text-[10px] text-[#c5a059] font-black uppercase tracking-widest animate-pulse">{generationMsg}</p>
            </div>
          )}

          {generatedVideoUrl && (
            <div className="space-y-4 animate-in fade-in duration-700">
               <video src={generatedVideoUrl} controls className="w-full border-2 border-[#c5a059] bg-black aspect-video" />
               <div className="flex justify-between items-center">
                  <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">AI Generated via Veo 3.1 • 720p 16:9</p>
                  <a href={generatedVideoUrl} download="iron-steel-promo.mp4" className="text-[#c5a059] text-xs font-black oswald uppercase tracking-widest border-b-2 border-[#c5a059] hover:text-white hover:border-white transition-colors">Download Video</a>
               </div>
            </div>
          )}

          {!generatedVideoUrl && !isGenerating && (
            <div className="flex-grow flex items-center justify-center border-2 border-zinc-900 bg-zinc-950 min-h-[200px]">
               <div className="text-center opacity-30">
                  <Video size={48} className="mx-auto mb-3" />
                  <p className="text-[10px] uppercase font-black tracking-[0.3em] oswald">No Preview Available</p>
               </div>
            </div>
          )}
        </div>
      </div>
      
      <div className="bg-zinc-950 border-2 border-zinc-800 p-6 flex items-center gap-4">
        <AlertTriangle className="text-[#c5a059] shrink-0" size={24} />
        <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">
          Note: Video AI features consume higher token counts. Gemini 3 Pro supports multimodal context up to 2 million tokens for comprehensive video understanding.
        </p>
      </div>
    </div>
  );

  const renderDashboard = () => (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="bg-black border-2 border-zinc-800 p-6 flex items-center justify-between group hover:border-[#c5a059] transition-all duration-300 relative overflow-hidden">
            <div className="relative z-10">
              <p className="text-[10px] text-zinc-500 font-black uppercase tracking-[0.2em] mb-2">{stat.label}</p>
              <p className="text-3xl font-black oswald text-white group-hover:text-[#c5a059] transition-colors">{stat.value}</p>
              <div className="flex items-center gap-2 mt-3">
                <span className={`text-[10px] font-black uppercase tracking-wider px-1.5 py-0.5 ${stat.trend.startsWith('+') ? 'bg-green-500/10 text-green-500' : 'bg-[#c5a059]/10 text-[#c5a059]'}`}>
                  {stat.trend}
                </span>
                <span className="text-[9px] text-zinc-600 font-bold uppercase tracking-wide">vs last month</span>
              </div>
            </div>
            <div className="w-12 h-12 bg-zinc-950 flex items-center justify-center border-2 border-zinc-800 group-hover:bg-[#c5a059] group-hover:text-black group-hover:border-[#c5a059] transition-all">
              <stat.icon size={22} strokeWidth={2} />
            </div>
            <div className="absolute -right-4 -bottom-4 opacity-[0.02] group-hover:opacity-[0.05] transition-opacity rotate-12">
              <stat.icon size={120} />
            </div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-black border-2 border-zinc-800 p-6">
            <div className="flex items-center justify-between mb-8 border-b-2 border-zinc-900 pb-4">
               <h3 className="text-lg font-black uppercase oswald tracking-widest flex items-center gap-3 text-white">
                <TrendingUp size={20} className="text-[#c5a059]" /> Revenue Forecast
              </h3>
              <div className="flex gap-2">
                {['1W', '1M', '3M', 'YTD'].map((p) => (
                  <button key={p} className={`text-[10px] font-black px-2 py-1 uppercase tracking-wider hover:text-[#c5a059] transition-colors ${p === '1M' ? 'text-[#c5a059]' : 'text-zinc-600'}`}>{p}</button>
                ))}
              </div>
            </div>
            <div className="h-48 w-full flex items-end gap-1 px-2 border-b-2 border-zinc-900 pb-0">
              {[45, 60, 55, 70, 80, 75, 90, 85, 95, 100, 90, 80].map((h, i) => (
                <div key={i} className="flex-1 bg-zinc-900 relative group cursor-pointer hover:bg-[#c5a059] transition-all duration-300" style={{height: `${h}%`}}>
                  <div className="absolute inset-x-0 bottom-0 bg-[#c5a059] opacity-0 group-hover:opacity-20 h-full transition-opacity"></div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-black border-2 border-zinc-800 flex flex-col">
            <div className="p-6 border-b-2 border-zinc-800 flex justify-between items-center">
              <h3 className="text-lg font-black uppercase oswald tracking-widest flex items-center gap-3 text-white">
                <Calendar size={20} className="text-[#c5a059]" /> Recent Bookings
              </h3>
              <button className="text-[10px] font-black uppercase tracking-widest text-[#c5a059] hover:text-white transition-colors flex items-center gap-1">
                View All <ArrowUpRight size={10} />
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <tbody className="divide-y-2 divide-zinc-900">
                  {[
                    { name: 'James Wilson', service: 'Classic Cut', barber: 'Max Sharp', time: '14:30', status: 'Confirmed' },
                    { name: 'Petr Novak', service: 'Beard Trim', barber: 'Viktor Prague', time: '15:15', status: 'In Progress' },
                    { name: 'Adam Smith', service: 'Cut & Beard', barber: 'Alex Storm', time: '16:00', status: 'Pending' },
                  ].map((row, i) => (
                    <tr key={i} className="group hover:bg-zinc-900/50 transition-colors">
                      <td className="px-6 py-5 font-bold uppercase oswald tracking-tight text-white">{row.name}</td>
                      <td className="px-6 py-5 text-xs text-zinc-400 font-medium uppercase tracking-wide">{row.service}</td>
                      <td className="px-6 py-5 text-xs text-[#c5a059] font-black uppercase oswald tracking-wider">{row.barber}</td>
                      <td className="px-6 py-5 text-xs font-black oswald text-white">{row.time}</td>
                      <td className="px-6 py-5">
                        <span className={`text-[9px] px-2 py-1 border-2 uppercase font-black tracking-widest ${
                          row.status === 'Confirmed' ? 'border-green-900 text-green-500 bg-green-900/10' : 
                          row.status === 'In Progress' ? 'border-[#c5a059]/30 text-[#c5a059] bg-[#c5a059]/10' : 
                          'border-zinc-700 text-zinc-500'
                        }`}>
                          {row.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="bg-black border-2 border-zinc-800 flex flex-col h-full">
          <div className="p-6 border-b-2 border-zinc-800 flex justify-between items-center bg-zinc-950">
            <h3 className="text-lg font-black uppercase oswald tracking-widest flex items-center gap-3 text-white">
              <Bot size={20} className="text-[#c5a059]" /> Bot Terminal
            </h3>
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          </div>
          <div className="p-6 flex-grow flex flex-col overflow-hidden bg-black">
            <div ref={logContainerRef} className="bg-[#050505] border-2 border-zinc-900 p-4 mb-6 flex-grow overflow-y-auto custom-scrollbar font-mono text-xs">
               <div className="space-y-3">
                  {botLogs.map(log => (
                    <div key={log.id} className="border-l-2 border-zinc-800 pl-3 py-1 hover:border-[#c5a059] transition-colors group">
                      <p className="text-zinc-600 mb-1 flex items-center gap-2">
                        <span className="font-bold text-[#c5a059]">{log.time}</span>
                        <span className="w-1 h-1 bg-zinc-800 rounded-full group-hover:bg-[#c5a059]"></span>
                        <span className="uppercase tracking-widest text-[8px]">LOG-{log.id.toString().padStart(4, '0')}</span>
                      </p>
                      <p className={`font-bold tracking-tight leading-relaxed ${log.type === 'success' ? 'text-green-500' : log.type === 'warning' ? 'text-[#c5a059]' : 'text-zinc-400'}`}>
                        {log.message}
                      </p>
                    </div>
                  ))}
                  {botLogs.length === 0 && <div className="text-zinc-700 italic text-center pt-10">Waiting for system events...</div>}
               </div>
            </div>
            
            <div className="border-t-2 border-zinc-800 pt-4 mt-auto">
               <div className="flex gap-2">
                  <input type="text" placeholder="Enter command..." className="flex-1 bg-zinc-900 border-2 border-zinc-800 p-3 text-xs text-white uppercase tracking-widest focus:border-[#c5a059] outline-none placeholder:text-zinc-700" disabled />
                  <button className="bg-zinc-800 text-zinc-500 p-3 border-2 border-zinc-800 hover:text-white hover:border-white transition-all disabled:opacity-50" disabled>
                    <Send size={16} />
                  </button>
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
      <aside className="w-72 border-r-2 border-zinc-800 flex flex-col p-0 bg-black hidden lg:flex shrink-0">
        <div className="p-8 border-b-2 border-zinc-800">
          <span className="text-2xl font-black oswald tracking-tighter flex items-center gap-3">
            <div className="w-8 h-8 bg-[#c5a059] flex items-center justify-center text-black text-xs font-bold border-2 border-white">IS</div>
            <div className="flex flex-col leading-none">
              <span className="text-white tracking-tight">IRON<span className="text-[#c5a059]">&</span>STEEL</span>
              <span className="text-[9px] text-zinc-500 tracking-[0.4em] uppercase mt-1">Admin Panel</span>
            </div>
          </span>
        </div>

        <nav className="flex-grow p-6 space-y-3 overflow-y-auto">
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
              className={`w-full group flex items-center justify-between px-5 py-4 text-xs font-black uppercase oswald tracking-widest transition-all border-2 ${
                activeTab === item.label 
                ? 'bg-[#c5a059] text-black border-[#c5a059]' 
                : 'bg-transparent text-zinc-500 border-transparent hover:border-zinc-800 hover:bg-zinc-900 hover:text-white'
              }`}
            >
              <div className="flex items-center space-x-4">
                <item.icon size={18} strokeWidth={2.5} />
                <span>{item.label}</span>
              </div>
              {activeTab === item.label && <ChevronRight size={14} className="text-black" />}
            </button>
          ))}
        </nav>

        <div className="p-6 border-t-2 border-zinc-800">
          <button 
            onClick={onLogout}
            className="w-full flex items-center justify-center space-x-3 px-4 py-4 text-xs font-black uppercase oswald tracking-widest text-zinc-500 hover:text-red-500 hover:bg-red-500/10 border-2 border-transparent hover:border-red-500/20 transition-all"
          >
            <LogOut size={16} />
            <span>Exit System</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto bg-[#0a0a0a]">
        <header className="h-24 border-b-2 border-zinc-800 flex items-center justify-between px-8 bg-black/80 backdrop-blur-md sticky top-0 z-20">
          <div className="flex items-center bg-zinc-950 px-4 py-3 border-2 border-zinc-800 w-full max-w-lg focus-within:border-[#c5a059] transition-colors">
            <Search size={18} className="text-zinc-500 mr-3 shrink-0" />
            <input type="text" placeholder="SEARCH DATABASE..." className="bg-transparent border-none outline-none text-xs w-full placeholder:text-zinc-700 text-white font-bold uppercase tracking-widest font-mono" />
          </div>

          <div className="flex items-center space-x-6 lg:space-x-8">
            <div className="hidden md:flex items-center gap-3 text-[#c5a059] text-[10px] font-black uppercase tracking-[0.15em] bg-black px-4 py-2 border-2 border-[#c5a059]/30">
               <Database size={14} />
               <span className="animate-pulse">Neon DB: Active</span>
            </div>
            <div className="h-8 w-[2px] bg-zinc-800"></div>
            <button onClick={handleRefresh} className={`text-zinc-400 hover:text-white transition-all ${isRefreshing ? 'animate-spin text-[#c5a059]' : ''}`}><RefreshCcw size={20} /></button>
            <button className="relative text-zinc-400 hover:text-white transition-colors">
              <Bell size={20} />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-[#c5a059] rounded-full"></span>
            </button>
            <div className="flex items-center space-x-4 pl-8 border-l-2 border-zinc-800 ml-2">
              <div className="text-right hidden sm:block">
                <p className="text-white text-xs font-black uppercase oswald tracking-wider">Admin</p>
                <p className="text-zinc-600 text-[9px] font-bold uppercase tracking-widest">Prague HQ</p>
              </div>
              <div className="w-10 h-10 bg-zinc-900 border-2 border-zinc-700 flex items-center justify-center text-white font-black text-sm oswald hover:border-[#c5a059] hover:text-[#c5a059] transition-colors cursor-pointer">A</div>
            </div>
          </div>
        </header>

        <div className="p-6 lg:p-10 space-y-10">
          <div className="flex items-end justify-between border-b-2 border-zinc-900 pb-6">
            <div>
              <h1 className="text-5xl font-black oswald uppercase tracking-tighter text-white mb-2">{activeTab}</h1>
              <p className="text-zinc-500 text-xs uppercase tracking-[0.3em] font-bold">Iron & Steel Management System v2.0</p>
            </div>
            <div className="hidden sm:block">
               <p className="text-right text-zinc-600 text-[10px] font-mono uppercase">System Time: {new Date().toLocaleTimeString()}</p>
            </div>
          </div>

          {activeTab === 'Dashboard' && renderDashboard()}
          {activeTab === 'Vision Lab' && renderVisionLab()}
          {activeTab !== 'Dashboard' && activeTab !== 'Vision Lab' && (
            <div className="flex flex-col items-center justify-center py-40 border-2 border-dashed border-zinc-800 bg-zinc-900/10">
               <div className="w-20 h-20 bg-zinc-900 flex items-center justify-center border-2 border-zinc-800 mb-6 rotate-45">
                  <Package size={32} className="text-zinc-700 -rotate-45" />
               </div>
               <h3 className="text-2xl font-black uppercase oswald text-zinc-700 tracking-widest">Module Under Construction</h3>
               <p className="text-zinc-600 text-xs font-mono mt-2 uppercase">deployment_pending...</p>
            </div>
          )}
        </div>
      </main>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: #0a0a0a; border-left: 1px solid #222; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #333; border: 1px solid #000; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #c5a059; }
        @keyframes progress { 0% { transform: translateX(-100%); } 100% { transform: translateX(100%); } }
      `}</style>
    </div>
  );
};

export default AdminDashboard;
