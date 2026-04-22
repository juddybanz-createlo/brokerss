import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  LayoutDashboard, 
  Wallet, 
  TrendingUp, 
  History, 
  Settings, 
  Search, 
  Bell, 
  ArrowUpRight, 
  ArrowDownRight,
  Menu,
  X,
  Plus,
  ArrowRight,
  Activity,
  BarChart3,
  Globe,
  Clock,
  ArrowUp,
  ArrowDown,
  ChevronUp,
  ChevronDown,
  CreditCard,
  Banknote,
  ShieldCheck,
  Zap,
  ArrowUpDown,
  User,
  Minus,
  Shuffle,
  Anchor,
  TrendingDown
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar
} from 'recharts';
import { cn } from './lib/utils';
import { MOCK_ASSETS, MOCK_USER, MOCK_PLATFORM_USERS, MOCK_PLATFORM_STATS, Asset, Trade } from './mockData';
import AuthPage from './components/AuthPage';

// --- Shared Components ---

const Sidebar = ({ activeTab, setActiveTab, user }: { activeTab: string, setActiveTab: (t: string) => void, user: typeof MOCK_USER }) => {
  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'markets', label: 'Trading', icon: TrendingUp },
    { id: 'news', label: 'News', icon: Globe },
    { id: 'history', label: 'History', icon: History },
    { id: 'settings', label: 'Account', icon: Settings },
    { id: 'admin', label: 'Terminal Admin', icon: ShieldCheck, adminOnly: true },
  ].filter(tab => !tab.adminOnly || user.isAdmin);

  return (
    <aside className="hidden md:flex flex-col w-64 h-screen border-r border-zinc-800 bg-[#050505] fixed left-0 top-0 z-50">
      <div className="p-6">
        <div className="flex items-center gap-2 mb-8">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center shadow-lg shadow-indigo-600/20">
            <TrendingUp className="text-white w-5 h-5" />
          </div>
          <span className="text-xl font-bold tracking-tight text-white">Zenith Trade</span>
        </div>

        <nav className="space-y-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group",
                activeTab === tab.id 
                  ? "bg-indigo-600/10 text-indigo-500" 
                  : "text-zinc-500 hover:bg-zinc-900/50 hover:text-zinc-200"
              )}
            >
              <tab.icon className={cn("w-5 h-5", activeTab === tab.id ? "text-indigo-500" : "text-zinc-600 group-hover:text-zinc-400")} />
              <span className="text-sm font-semibold">{tab.label}</span>
              {activeTab === tab.id && (
                <motion.div 
                  layoutId="sidebar-indicator"
                  className="ml-auto w-1 h-5 bg-indigo-600 rounded-full"
                />
              )}
            </button>
          ))}
        </nav>
      </div>

      <div className="mt-auto p-6 border-t border-zinc-800/50">
        <div className="flex items-center gap-3">
          <img src={user.avatar} alt="Avatar" className="w-10 h-10 rounded-full border border-zinc-800" />
          <div className="flex flex-col">
            <span className="text-sm font-semibold text-zinc-100">{user.name}</span>
            <span className="text-[10px] text-zinc-500 uppercase font-bold tracking-wider">{user.isAdmin ? 'Terminal Admin' : 'Professional'}</span>
          </div>
        </div>
      </div>
    </aside>
  );
};

const Header = ({ title, showSearch = true }: { title: string, showSearch?: boolean }) => (
  <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 md:mb-8">
    <div className="flex justify-between items-start">
      <div>
        <h1 className="text-2xl md:text-3xl font-black md:font-bold tracking-tight text-white uppercase md:capitalize">{title}</h1>
        <p className="text-zinc-500 text-[10px] md:text-sm mt-1 uppercase md:normal-case tracking-widest md:tracking-normal">Markets: <span className="text-emerald-400 font-black">Open</span></p>
      </div>
      <div className="flex md:hidden items-center gap-2">
         <button className="p-2 rounded-xl bg-zinc-900 border border-zinc-800 relative">
            <Bell className="w-4 h-4 text-zinc-400" />
            <span className="absolute top-2 right-2 w-1.5 h-1.5 bg-indigo-500 rounded-full"></span>
         </button>
      </div>
    </div>
    <div className="flex items-center gap-3">
      {showSearch && (
        <div className="relative flex-1 md:flex-none">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
          <input 
            type="text" 
            placeholder="Search..." 
            className="bg-zinc-900/50 border border-zinc-800 rounded-2xl md:rounded-full pl-10 pr-4 py-2.5 md:py-2 text-xs focus:outline-none focus:ring-1 focus:ring-indigo-600 w-full md:w-64 transition-all font-medium"
          />
        </div>
      )}
      <button className="hidden md:block p-2.5 rounded-full bg-zinc-900 border border-zinc-800 relative hover:bg-zinc-800 transition-colors">
        <Bell className="w-4 h-4 text-zinc-400" />
        <span className="absolute top-2.5 right-2.5 w-1.5 h-1.5 bg-indigo-500 rounded-full"></span>
      </button>
      <div className="hidden sm:flex items-center gap-3 px-4 py-2 bg-zinc-900 border border-zinc-800 rounded-xl">
        <div className="flex flex-col items-end">
          <span className="text-[10px] text-zinc-500 uppercase font-bold">Equity</span>
          <span className="text-sm font-bold text-white">${MOCK_USER.equity.toLocaleString()}</span>
        </div>
        <div className="w-px h-6 bg-zinc-800" />
        <div className="flex flex-col items-end">
          <span className="text-[10px] text-zinc-500 uppercase font-bold">Profit</span>
          <span className="text-sm font-bold text-emerald-400">+$1,515.90</span>
        </div>
      </div>
    </div>
  </header>
);

// --- View: Dashboard ---

const DashboardView = ({ setActiveTab, user, assets, onCloseTrade }: { setActiveTab: (t: string) => void, user: typeof MOCK_USER, assets: Asset[], onCloseTrade: (id: string) => void }) => {
  return (
    <div className="animate-in fade-in duration-500 space-y-6 pb-20">
      <Header title="Mission Control" />
      
      {/* User Profile & Balance Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 glass-panel p-6 rounded-3xl bg-zinc-950/50 flex flex-col items-center text-center">
          <div className="relative mb-4">
            <img src={user.avatar} alt="Profile" className="w-24 h-24 rounded-full border-4 border-indigo-600/20 shadow-2xl shadow-indigo-600/10" />
            <div className="absolute bottom-1 right-1 w-5 h-5 bg-emerald-500 border-2 border-zinc-950 rounded-full" />
          </div>
          <h2 className="text-xl font-bold text-white">{user.name}</h2>
          <span className="text-[10px] text-zinc-500 uppercase font-black tracking-widest mt-1">Tier 3 Terminal Operator</span>
          <div className="grid grid-cols-2 gap-4 w-full mt-8">
            <div className="flex flex-col p-3 rounded-2xl bg-black border border-zinc-900">
              <span className="text-[9px] text-zinc-600 uppercase font-bold">Leverage</span>
              <span className="text-sm font-bold text-indigo-400">1:500</span>
            </div>
            <div className="flex flex-col p-3 rounded-2xl bg-black border border-zinc-900">
               <span className="text-[9px] text-zinc-600 uppercase font-bold">Region</span>
               <span className="text-sm font-bold text-white uppercase tracking-tighter">GB / LON</span>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 glass-panel p-6 md:p-8 rounded-3xl bg-gradient-to-br from-indigo-600/20 to-transparent border-indigo-600/20 flex flex-col justify-between overflow-hidden relative">
          <div className="absolute top-0 right-0 p-8 hidden md:block">
            <Activity className="w-32 h-32 text-white opacity-[0.03] -rotate-12" />
          </div>
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <span className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.3em]">Operational Liquidity</span>
              <div className="flex gap-2">
                 <button onClick={() => setActiveTab('settings')} className="flex-1 sm:flex-none px-4 py-2.5 bg-white text-black rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-zinc-200 transition-all flex items-center justify-center gap-2">
                    <Plus className="w-3 h-3" /> Deposit
                 </button>
                 <button onClick={() => setActiveTab('settings')} className="flex-1 sm:flex-none px-4 py-2.5 bg-zinc-950 text-white border border-zinc-800 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-zinc-900 transition-all flex items-center justify-center gap-2">
                    <ArrowDownRight className="w-3 h-3" /> Withdraw
                 </button>
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl md:text-5xl font-black text-white tracking-tighter tabular-nums">${user.balance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
              <div className="px-2 py-0.5 bg-emerald-500/10 rounded-md border border-emerald-500/20 text-[8px] font-black text-emerald-500 uppercase tracking-widest animate-pulse">Live</div>
            </div>
          </div>
          <div className="flex flex-wrap gap-x-8 gap-y-4 mt-8">
            <div className="flex flex-col min-w-[100px]">
              <span className="text-[10px] text-zinc-500 uppercase font-black tracking-widest mb-1">Equity</span>
              <span className="text-xl font-black text-white tabular-nums">${user.equity.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
            </div>
            <div className="flex flex-col min-w-[100px]">
              <span className="text-[10px] text-zinc-500 uppercase font-black tracking-widest mb-1">Free Margin</span>
              <span className="text-xl font-black text-white tabular-nums">${user.freeMargin.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
            </div>
            <div className="flex flex-col min-w-[100px]">
              <span className="text-[10px] text-zinc-500 uppercase font-black tracking-widest mb-1">Profit / Loss</span>
              <span className={cn("text-xl font-black tabular-nums", (user.equity - user.balance) >= 0 ? "text-emerald-400" : "text-rose-400")}>
                {(user.equity - user.balance) >= 0 ? '+' : ''}${(user.equity - user.balance).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Live Trades Section */}
      <div className="glass-panel rounded-3xl overflow-hidden border-zinc-800 bg-black/20">
        <div className="p-4 md:p-6 border-b border-zinc-800 bg-zinc-900/40 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-600/10 flex items-center justify-center shrink-0">
               <Activity className="w-5 h-5 text-indigo-500" />
            </div>
            <div>
              <h3 className="text-sm md:text-base font-black text-white uppercase tracking-[.15em]">Live Operations</h3>
              <p className="text-[9px] text-zinc-500 font-bold uppercase tracking-tighter">Real-time terminal execution status</p>
            </div>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-500/10 rounded-full border border-emerald-500/20 self-start sm:self-auto">
             <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
             <span className="text-[9px] font-black text-emerald-500 uppercase tracking-widest leading-none">Linked</span>
          </div>
        </div>
        
        {/* Desktop Table View */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="text-[10px] text-zinc-500 uppercase font-black tracking-widest border-b border-zinc-800 bg-zinc-950/30">
              <tr>
                <th className="px-6 py-5">Instrument</th>
                <th className="px-4 py-5">Signal</th>
                <th className="px-4 py-5">Lot</th>
                <th className="px-4 py-5">Entry</th>
                <th className="px-4 py-5 text-right font-black">Net P/L</th>
                <th className="px-6 py-5 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/30">
              {user.trades.filter(t => t.status === 'OPEN').map((trade) => (
                <tr key={trade.id} className="hover:bg-zinc-900/30 transition-all group">
                  <td className="px-6 py-5">
                    <div className="flex flex-col">
                      <span className="font-black text-white tracking-widest">{trade.symbol}</span>
                      <span className="text-[9px] text-zinc-500 uppercase font-bold tracking-tighter">{trade.time}</span>
                    </div>
                  </td>
                  <td className="px-4 py-5">
                    <span className={cn("px-2.5 py-1 rounded-lg text-[9px] font-black tracking-widest uppercase border", trade.type === 'BUY' ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" : "bg-rose-500/10 text-rose-400 border-rose-500/20")}>
                      {trade.type}
                    </span>
                  </td>
                  <td className="px-4 py-5 font-mono font-black text-white">{trade.lot.toFixed(2)}</td>
                  <td className="px-4 py-5 font-mono text-zinc-500">{trade.openPrice.toFixed(4)}</td>
                  <td className={cn("px-4 py-5 text-right font-black font-mono text-lg tracking-tighter tabular-nums", trade.profit >= 0 ? "text-emerald-400" : "text-rose-400")}>
                    {trade.profit >= 0 ? '+' : ''}{trade.profit.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </td>
                  <td className="px-6 py-5 text-right">
                    <button 
                      onClick={() => onCloseTrade(trade.id)}
                      className="p-2.5 rounded-xl bg-zinc-900/50 hover:bg-rose-500/20 text-zinc-600 hover:text-rose-400 transition-all border border-zinc-800 active:scale-95"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Card View */}
        <div className="md:hidden flex flex-col divide-y divide-zinc-900/50">
          {user.trades.filter(t => t.status === 'OPEN').map((trade) => (
             <div key={trade.id} className="p-4 flex flex-col gap-4 bg-zinc-950/20">
                <div className="flex justify-between items-start">
                   <div className="flex flex-col">
                      <span className="text-sm font-black text-white tracking-widest">{trade.symbol}</span>
                      <span className="text-[9px] text-zinc-600 uppercase font-bold">{trade.time}</span>
                   </div>
                   <div className="flex items-center gap-2">
                       <span className={cn("px-2.5 py-1 rounded-lg text-[9px] font-black tracking-widest uppercase border", trade.type === 'BUY' ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" : "bg-rose-500/10 text-rose-400 border-rose-500/20")}>
                          {trade.type}
                       </span>
                       <button onClick={() => onCloseTrade(trade.id)} className="p-2 bg-zinc-900 border border-zinc-800 rounded-lg text-rose-500">
                          <X className="w-3 h-3" />
                       </button>
                   </div>
                </div>
                <div className="flex justify-between items-end">
                   <div className="flex gap-4">
                      <div className="flex flex-col">
                        <span className="text-[8px] text-zinc-600 font-black uppercase tracking-tighter mb-0.5" >Lot</span>
                        <span className="text-xs font-black text-white tabular-nums">{trade.lot.toFixed(2)}</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[8px] text-zinc-600 font-black uppercase tracking-tighter mb-0.5">Entry</span>
                        <span className="text-xs font-black text-zinc-400 font-mono tracking-tighter italic">{trade.openPrice.toFixed(4)}</span>
                      </div>
                   </div>
                   <div className="flex flex-col items-end">
                      <span className="text-[8px] text-zinc-600 font-black uppercase tracking-tighter mb-0.5">Net P/L</span>
                      <span className={cn("text-xl font-black font-mono tracking-tighter tabular-nums", trade.profit >= 0 ? "text-emerald-400" : "text-rose-400")}>
                        {trade.profit >= 0 ? '+' : ''}{trade.profit.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </span>
                   </div>
                </div>
             </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// --- View: Markets (Trading Terminal) ---

// --- View: Markets (Trading Terminal) ---

const MarketsView = ({ selectedAsset, setSelectedAsset, assets, onPlaceTrade }: { selectedAsset: Asset, setSelectedAsset: (a: Asset) => void, assets: Asset[], onPlaceTrade: (type: 'BUY' | 'SELL', lot: number) => void }) => {
  const [lot, setLot] = useState('0.10');

  return (
    <div className="h-full flex flex-col gap-6 animate-in slide-in-from-top duration-700">
      <Header title="Trading Floor" />

      {/* Top Section: Hero Chart */}
      <div className="glass-panel rounded-[2rem] overflow-hidden flex flex-col border-zinc-800 shadow-2xl relative">
        <div className="p-6 border-b border-zinc-800 flex flex-col sm:flex-row sm:items-center justify-between bg-black/40 backdrop-blur-md sticky top-0 z-10 gap-4">
          <div className="flex items-center justify-between sm:justify-start gap-6">
            <div className="flex flex-col">
              <span className="text-xl md:text-2xl font-black text-white tracking-widest">{selectedAsset.symbol}</span>
              <span className="text-[9px] text-zinc-600 font-extrabold uppercase tracking-[.25em]">{selectedAsset.name}</span>
            </div>
            <div className="hidden sm:block h-10 w-px bg-zinc-800" />
            <div className="flex bg-zinc-950/80 rounded-2xl p-1 border border-zinc-900 shadow-inner">
              {['M1', 'M5', 'H1', 'D1'].map(t => (
                <button key={t} className="px-3 py-1.5 text-[9px] font-black text-zinc-500 hover:text-white rounded-xl transition-all hover:bg-zinc-900">
                  {t}
                </button>
              ))}
            </div>
          </div>
          <div className="flex justify-between sm:flex-col sm:items-end gap-1 border-t border-zinc-900 pt-3 sm:border-none sm:pt-0">
            <span className="text-[9px] text-zinc-600 uppercase font-black tracking-widest">Market Price</span>
            <span className="text-2xl md:text-3xl font-black text-indigo-500 font-mono tracking-tighter tabular-nums">{selectedAsset.price.toFixed(selectedAsset.symbol === 'GOLD' || selectedAsset.symbol.includes('JPY') ? 2 : 4)}</span>
          </div>
        </div>
        <div className="h-[300px] md:h-[450px] p-4 md:p-6 bg-[radial-gradient(circle_at_top_right,rgba(79,70,229,0.05),transparent)]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={selectedAsset.sparkline}>
              <defs>
                <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.1}/>
                  <stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#18181b" vertical={true} />
              <XAxis dataKey="time" hide />
              <YAxis hide domain={['auto', 'auto']} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#09090b', border: '1px solid #27272a', borderRadius: '16px', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)' }}
              />
              <Area isAnimationActive={false} type="monotone" dataKey="value" stroke="#4f46e5" fill="url(#chartGrad)" strokeWidth={3} dot={{ r: 0 }} activeDot={{ r: 6, fill: '#4f46e5', stroke: '#fff', strokeWidth: 2 }} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Bottom Section: Asset Selection & Execution */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Pair Selection */}
        <div className="lg:col-span-2 glass-panel rounded-3xl overflow-hidden border-zinc-800 bg-black/20 flex flex-col">
          <div className="p-5 border-b border-zinc-800 bg-zinc-950/30 flex justify-between items-center">
            <h3 className="font-black text-white text-[10px] uppercase tracking-[0.3em]">Select Instrument</h3>
            <div className="flex gap-2">
                <button className="px-3 py-1 bg-zinc-900 border border-zinc-800 rounded-lg text-[9px] font-black text-zinc-500 uppercase tracking-widest">Major Pairs</button>
                <button className="px-3 py-1 border border-zinc-800 rounded-lg text-[9px] font-black text-zinc-600 uppercase tracking-widest hover:text-white transition-colors">Commodities</button>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-3 gap-2 p-3 max-h-[400px] overflow-y-auto custom-scrollbar">
            {assets.map((asset) => (
              <div 
                key={asset.id} 
                onClick={() => setSelectedAsset(asset)}
                className={cn(
                  "p-3 md:p-4 rounded-2xl cursor-pointer transition-all flex items-center justify-between border-2",
                  selectedAsset.id === asset.id ? "bg-indigo-600/10 border-indigo-600/30 shadow-inner" : "hover:bg-zinc-900/40 border-transparent"
                )}
              >
                <div className="flex flex-col">
                  <span className={cn("text-xs font-black transition-colors", selectedAsset.id === asset.id ? "text-indigo-400" : "text-zinc-200")}>{asset.symbol}</span>
                  <span className="text-[8px] md:text-[9px] text-zinc-600 font-bold uppercase truncate max-w-[60px]">{asset.name.split(' / ')[0]}</span>
                </div>
                <div className="flex flex-col items-end">
                  <span className="text-[11px] md:text-xs font-black text-white font-mono">{asset.price.toFixed(asset.symbol === 'GOLD' || asset.symbol.includes('JPY') ? 2 : 4)}</span>
                  <span className={cn("text-[8px] md:text-[9px] font-black", asset.change24h >= 0 ? "text-emerald-500" : "text-rose-500")}>
                    {asset.change24h >= 0 ? '+' : ''}{asset.change24h.toFixed(2)}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Execution */}
        <div className="glass-panel rounded-3xl p-6 bg-zinc-900/50 flex flex-col gap-5 border-zinc-800">
           <div className="flex items-center justify-between">
              <h3 className="font-black text-white uppercase tracking-[0.2em] text-[10px]">Execution</h3>
              <div className="px-2 py-0.5 bg-indigo-500/10 rounded-md border border-indigo-500/20 text-[8px] font-black text-indigo-400 uppercase tracking-widest">Instant</div>
           </div>
          
          <div className="space-y-1">
            <label className="text-[9px] font-black text-zinc-600 uppercase tracking-widest pl-1">Volume Selection</label>
            <div className="flex items-center gap-3">
              <input 
                type="text" 
                value={lot}
                onChange={(e) => setLot(e.target.value)}
                className="flex-1 h-12 bg-black border border-zinc-800 rounded-2xl text-center font-black text-white font-mono focus:outline-none focus:ring-2 focus:ring-indigo-600/50 text-lg transition-all"
              />
              <div className="flex flex-col gap-1">
                 <button onClick={() => setLot((prev) => (parseFloat(prev) + 0.01).toFixed(2))} className="w-8 h-5 bg-zinc-800 rounded-md flex items-center justify-center hover:bg-indigo-600 transition-colors"><ChevronUp className="w-3 h-3 text-white" /></button>
                 <button onClick={() => setLot((prev) => (Math.max(0.01, parseFloat(prev) - 0.01)).toFixed(2))} className="w-8 h-5 bg-zinc-800 rounded-md flex items-center justify-center hover:bg-rose-600 transition-colors"><ChevronDown className="w-3 h-3 text-white" /></button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button 
              onClick={() => onPlaceTrade('SELL', parseFloat(lot))}
              className="flex flex-col items-center justify-center gap-1 bg-rose-500 hover:bg-rose-400 py-5 rounded-2xl shadow-2xl shadow-rose-500/10 active:scale-[0.98] transition-all group border-b-4 border-rose-700"
            >
              <span className="text-[9px] font-black text-rose-100/60 uppercase tracking-widest">Market</span>
              <span className="text-lg font-black text-white tracking-widest uppercase mb-1">Sell</span>
              <span className="text-xs font-bold text-white/50 font-mono">{(selectedAsset.price - 0.0002).toFixed(selectedAsset.symbol === 'GOLD' || selectedAsset.symbol.includes('JPY') ? 2 : 4)}</span>
            </button>
            <button 
              onClick={() => onPlaceTrade('BUY', parseFloat(lot))}
              className="flex flex-col items-center justify-center gap-1 bg-indigo-600 hover:bg-indigo-500 py-5 rounded-2xl shadow-2xl shadow-indigo-600/10 active:scale-[0.98] transition-all group border-b-4 border-indigo-800"
            >
              <span className="text-[9px] font-black text-indigo-100/60 uppercase tracking-widest">Market</span>
              <span className="text-lg font-black text-white tracking-widest uppercase mb-1">Buy</span>
              <span className="text-xs font-bold text-white/50 font-mono">{(selectedAsset.price + 0.0002).toFixed(selectedAsset.symbol === 'GOLD' || selectedAsset.symbol.includes('JPY') ? 2 : 4)}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- View: Portfolio (Forex Terminal) ---

// --- View: News ---

const NewsView = () => {
    const news = [
        { id: 1, title: "Federal Reserve hints at interest rate cuts in upcoming Q3 meeting", source: "Market Watch", time: "12m ago", impact: "High" },
        { id: 2, title: "EUR/USD breaks key resistance level at 1.0850 amid dollar weakness", source: "FX Street", time: "45m ago", impact: "Medium" },
        { id: 3, title: "Gold prices hit all-time high as safe-haven demand surges globally", source: "Bloomberg", time: "2h ago", impact: "High" },
        { id: 4, title: "BoE Governor Bailey speaks on inflation targets and monetary policy", source: "Reuters", time: "3h ago", impact: "High" },
        { id: 5, title: "Nikkei 225 slides as Yen intervention fears grow in Tokyo", source: "Nikkei Asia", time: "5h ago", impact: "Medium" }
    ];

    return (
        <div className="h-full flex flex-col gap-6 animate-in slide-in-from-right duration-500">
            <Header title="Market Intelligence" />
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-4">
                    {news.map((item) => (
                        <div key={item.id} className="glass-panel p-6 rounded-3xl bg-zinc-950/40 hover:bg-zinc-900/40 transition-all border border-zinc-800/50 group cursor-pointer">
                            <div className="flex justify-between items-start mb-4">
                                <div className="flex items-center gap-3">
                                    <div className={cn(
                                        "px-2 py-0.5 rounded-md text-[9px] font-black uppercase tracking-widest border",
                                        item.impact === 'High' ? "bg-rose-500/10 text-rose-400 border-rose-500/20" : "bg-indigo-500/10 text-indigo-400 border-indigo-500/20"
                                    )}>
                                        {item.impact} Impact
                                    </div>
                                    <span className="text-[10px] text-zinc-600 font-bold uppercase tracking-widest">{item.source} • {item.time}</span>
                                </div>
                                <ArrowRight className="w-4 h-4 text-zinc-700 group-hover:text-indigo-500 group-hover:translate-x-1 transition-all" />
                            </div>
                            <h3 className="text-lg font-bold text-white group-hover:text-zinc-200 transition-colors leading-tight">{item.title}</h3>
                        </div>
                    ))}
                </div>
                <div className="space-y-6 text-sm text-zinc-500">
                    <div className="glass-panel p-6 rounded-3xl bg-indigo-600/10 border-indigo-600/20">
                         <h4 className="text-indigo-400 font-black uppercase tracking-widest text-[10px] mb-4">Economic Calendar</h4>
                         <div className="space-y-4">
                            {[
                                { event: "USD CPI m/m", time: "Today 15:30", forecast: "0.4%", prev: "0.3%" },
                                { event: "GBP GDP q/q", time: "Tomorrow 09:00", forecast: "0.1%", prev: "0.0%" },
                                { event: "EUR ECB Press Conf", time: "Thu 14:45", forecast: "--", prev: "--" },
                            ].map((cal, i) => (
                                <div key={i} className="flex flex-col gap-1 pb-3 border-b border-white/5">
                                    <div className="flex justify-between font-bold text-zinc-300">
                                        <span>{cal.event}</span>
                                        <span className="text-white font-mono">{cal.time}</span>
                                    </div>
                                    <div className="flex justify-between text-[10px] uppercase font-black tracking-tighter">
                                        <span>F: {cal.forecast}</span>
                                        <span>P: {cal.prev}</span>
                                    </div>
                                </div>
                            ))}
                         </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// --- View: History ---

const HistoryView = ({ user }: { user: typeof MOCK_USER }) => {
    const closedTrades = user.trades.filter(t => t.status === 'CLOSED');
    const totalPL = closedTrades.reduce((sum, t) => sum + t.profit, 0);

    return (
      <div className="h-full flex flex-col gap-6 animate-in fade-in duration-500">
        <Header title="Trade History" showSearch={false} />
  
        <div className="glass-panel p-6 rounded-2xl border-zinc-800 bg-black/20">
          <div className="flex justify-between items-center mb-6">
             <div className="flex gap-4">
                <div className="flex flex-col">
                   <span className="text-[10px] text-zinc-500 uppercase font-bold">Total P/L</span>
                   <span className={cn("text-xl font-bold tabular-nums", totalPL >= 0 ? "text-emerald-400" : "text-rose-400")}>
                     {totalPL >= 0 ? '+' : ''}${totalPL.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                   </span>
                </div>
                <div className="w-px h-10 bg-zinc-800" />
                <div className="flex flex-col">
                   <span className="text-[10px] text-zinc-500 uppercase font-bold">Closed Trades</span>
                   <span className="text-xl font-bold text-white">{closedTrades.length}</span>
                </div>
             </div>
             <div className="flex gap-2">
                <button className="px-4 py-2 bg-zinc-800 rounded-xl text-xs font-bold text-zinc-200">All Time</button>
                <button className="px-4 py-2 bg-zinc-900 border border-zinc-800 rounded-xl text-xs font-bold text-zinc-400 hover:text-white transition-colors">Export CSV</button>
             </div>
          </div>
  
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="text-[10px] text-zinc-500 uppercase font-bold border-b border-zinc-800">
                <tr>
                  <th className="px-4 py-4">Assets</th>
                  <th className="px-4 py-4">Type</th>
                  <th className="px-4 py-4">Execution</th>
                  <th className="px-4 py-4">Lot</th>
                  <th className="px-4 py-4">Entry</th>
                  <th className="px-4 py-4">Exit</th>
                  <th className="px-4 py-4 text-right">Net Profit</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/30">
                {closedTrades.map((trade) => (
                  <tr key={trade.id} className="hover:bg-zinc-900/20 transition-colors">
                    <td className="px-4 py-4">
                      <span className="font-bold text-zinc-200">{trade.symbol}</span>
                    </td>
                    <td className="px-4 py-4">
                        <span className={cn("text-[10px] font-bold transition-colors", trade.type === 'BUY' ? "text-emerald-500" : "text-rose-500")}>
                            {trade.type}
                        </span>
                    </td>
                    <td className="px-4 py-4">
                       <span className="text-[10px] text-zinc-500 uppercase font-medium">{trade.time}</span>
                    </td>
                    <td className="px-4 py-4 font-mono font-bold text-zinc-400">{trade.lot.toFixed(2)}</td>
                    <td className="px-4 py-4 font-mono text-zinc-500">{trade.openPrice.toFixed(4)}</td>
                    <td className="px-4 py-4 font-mono text-zinc-500">{trade.closePrice?.toFixed(4)}</td>
                    <td className={cn("px-4 py-4 text-right font-bold font-mono tracking-tighter", trade.profit >= 0 ? "text-emerald-400" : "text-rose-400")}>
                      {trade.profit >= 0 ? '+' : ''}{trade.profit.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };

// --- View: Admin Panel ---

const AdminView = ({ 
    assets, 
    setAssets, 
    platformUsers, 
    setPlatformUsers,
    paymentSettings,
    setPaymentSettings,
    currentUser,
    setCurrentUser
}: { 
    assets: Asset[], 
    setAssets: React.Dispatch<React.SetStateAction<Asset[]>>,
    platformUsers: typeof MOCK_PLATFORM_USERS,
    setPlatformUsers: React.Dispatch<React.SetStateAction<typeof MOCK_PLATFORM_USERS>>,
    paymentSettings: any,
    setPaymentSettings: React.Dispatch<React.SetStateAction<any>>,
    currentUser: typeof MOCK_USER,
    setCurrentUser: React.Dispatch<React.SetStateAction<typeof MOCK_USER>>
}) => {
    const [adminSubTab, setAdminSubTab] = useState<'monitor' | 'investors' | 'markets' | 'config'>('monitor');
    const [searchUser, setSearchUser] = useState('');
    const [viewingUser, setViewingUser] = useState<any>(null);

    const handleAdjustBalance = (userId: string, amount: number) => {
        setPlatformUsers(prev => prev.map(u => u.id === userId ? { ...u, balance: Math.max(0, u.balance + amount) } : u));
        // If it's the current user, sync the main user state too
        if (userId === 'u1') {
            setCurrentUser(prev => ({ ...prev, balance: Math.max(0, prev.balance + amount) }));
        }
    };

    const handleSetTrend = (assetId: string, trend: Asset['trend']) => {
        setAssets(prev => prev.map(a => a.id === assetId ? { ...a, trend } : a));
    };

    return (
        <div className="h-full flex flex-col gap-6 animate-in zoom-in-95 duration-500 pb-24">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <Header title="Command Hierarchy" showSearch={false} />
                <div className="flex bg-zinc-950 p-1 rounded-2xl border border-zinc-900 self-start md:self-auto">
                    {[
                        { id: 'monitor', label: 'Surveillance', icon: Activity },
                        { id: 'investors', label: 'The Deck', icon: User },
                        { id: 'markets', label: 'Simulation', icon: BarChart3 },
                        { id: 'config', label: 'Protocol', icon: Settings }
                    ].map((tab) => (
                        <button 
                            key={tab.id}
                            onClick={() => setAdminSubTab(tab.id as any)}
                            className={cn(
                                "flex items-center gap-2 px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all",
                                adminSubTab === tab.id ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/20" : "text-zinc-600 hover:text-white"
                            )}
                        >
                            <tab.icon className="w-3 h-3" />
                            <span className="hidden sm:inline">{tab.label}</span>
                        </button>
                    ))}
                </div>
            </div>

            {adminSubTab === 'monitor' && (
                <div className="space-y-6 animate-in fade-in duration-500">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {[
                            { label: 'Total Volume Index', value: MOCK_PLATFORM_STATS.totalVolume, icon: BarChart3, color: 'text-indigo-400' },
                            { label: 'Network Operators', value: platformUsers.length, icon: Activity, color: 'text-emerald-400' },
                            { label: 'Core System Load', value: MOCK_PLATFORM_STATS.serverLoad, icon: Zap, color: 'text-amber-400' },
                            { label: 'Daily Revenue Pool', value: MOCK_PLATFORM_STATS.revenue24h, icon: Banknote, color: 'text-rose-400' },
                        ].map((stat, i) => (
                            <div key={i} className="glass-panel p-5 rounded-3xl bg-zinc-950/20 flex flex-col gap-3">
                                <div className="flex items-center justify-between">
                                    <stat.icon className={cn("w-5 h-5", stat.color)} />
                                    <span className="text-[8px] font-black text-zinc-700 uppercase tracking-widest">Global Telemetry</span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-xl font-black text-white tabular-nums tracking-tighter">{stat.value}</span>
                                    <span className="text-[9px] text-zinc-600 font-bold uppercase tracking-wider mt-1">{stat.label}</span>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="glass-panel p-6 rounded-3xl bg-rose-600/5 border-rose-600/10 flex flex-col gap-4">
                        <div className="flex items-center gap-3">
                             <div className="w-8 h-8 rounded-lg bg-rose-600/10 flex items-center justify-center">
                                <Search className="w-4 h-4 text-rose-500" />
                             </div>
                             <h4 className="text-[10px] font-black text-rose-400 uppercase tracking-widest">Platform Activity Log</h4>
                        </div>
                        <div className="space-y-3">
                            {[
                                { t: '12:58:21', msg: 'Admin override executed: Volatility Boost v2.1' },
                                { t: '12:57:44', msg: 'High frequency trade detected: u2 -> EurUsd' },
                                { t: '12:56:01', msg: 'Protocol update: Payment gateways synchronized' },
                            ].map((log, i) => (
                                <div key={i} className="flex gap-2 text-[10px] font-mono leading-tight">
                                    <span className="text-zinc-600">[{log.t}]</span>
                                    <span className="text-zinc-400 uppercase font-bold tracking-tight">{log.msg}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {adminSubTab === 'investors' && (
                <div className="glass-panel rounded-3xl overflow-hidden border-zinc-800 bg-black/20 animate-in slide-in-from-bottom duration-500">
                    <div className="p-6 border-b border-zinc-800 bg-zinc-950/30 flex justify-between items-center gap-4">
                        <h3 className="text-[10px] font-black text-white uppercase tracking-[.3em]">Operator Management</h3>
                        <div className="relative flex-1 max-w-md">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600" />
                            <input 
                                type="text" 
                                placeholder="IDENTIFY BY NAME / EMAIL / UID..." 
                                value={searchUser}
                                onChange={(e) => setSearchUser(e.target.value)}
                                className="w-full bg-black border border-zinc-800 rounded-2xl pl-12 pr-6 py-3 text-[10px] font-black text-zinc-300 focus:ring-1 focus:ring-indigo-600 focus:outline-none transition-all uppercase tracking-widest"
                            />
                        </div>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm whitespace-nowrap">
                            <thead className="text-[9px] text-zinc-600 uppercase font-black tracking-widest border-b border-zinc-900 bg-black/40">
                                <tr>
                                    <th className="px-6 py-5">User Designation</th>
                                    <th className="px-4 py-5">Valuation</th>
                                    <th className="px-4 py-5">State</th>
                                    <th className="px-4 py-5">Integrity</th>
                                    <th className="px-6 py-5 text-right">Intervention</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-zinc-900/50">
                                {platformUsers.filter(u => u.name.toLowerCase().includes(searchUser.toLowerCase()) || u.email.toLowerCase().includes(searchUser.toLowerCase())).map((u) => (
                                    <tr key={u.id} className="hover:bg-zinc-900/20 transition-all group">
                                        <td className="px-6 py-6">
                                            <div className="flex flex-col">
                                                <span className="font-bold text-white text-xs">{u.name}</span>
                                                <span className="text-[9px] text-zinc-600 font-medium uppercase tracking-tight">{u.email}</span>
                                            </div>
                                        </td>
                                        <td className="px-4 py-6 font-mono text-zinc-400 font-bold">${u.balance.toLocaleString(undefined, { minimumFractionDigits: 2 })}</td>
                                        <td className="px-4 py-6">
                                            <span className={cn(
                                                "px-2 py-0.5 rounded-md text-[8px] font-black uppercase tracking-widest border",
                                                u.status === 'Active' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 
                                                u.status === 'Pending' ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' : 
                                                'bg-rose-500/10 text-rose-400 border-rose-500/20'
                                            )}>
                                                {u.status}
                                            </span>
                                        </td>
                                        <td className="px-4 py-6">
                                            <div className="flex items-center gap-2">
                                                <div className={cn("w-1.5 h-1.5 rounded-full shadow-[0_0_8px_rgba(0,0,0,0.5)]", u.verified ? "bg-emerald-500 shadow-emerald-500/50" : "bg-rose-500 shadow-rose-500/50")} />
                                                <span className="text-[9px] font-bold text-zinc-600 uppercase tracking-tighter">{u.verified ? 'Verified' : 'Flagged'}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-6 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <button onClick={() => handleAdjustBalance(u.id, 1000)} className="p-2 bg-emerald-600/10 hover:bg-emerald-600 text-emerald-500 hover:text-white rounded-lg border border-emerald-600/20 transition-all">
                                                    <Plus className="w-3.5 h-3.5" />
                                                </button>
                                                <button onClick={() => handleAdjustBalance(u.id, -1000)} className="p-2 bg-rose-600/10 hover:bg-rose-600 text-rose-500 hover:text-white rounded-lg border border-rose-600/20 transition-all">
                                                    <Minus className="w-3.5 h-3.5" />
                                                </button>
                                                <button 
                                                    onClick={() => setViewingUser(u)} 
                                                    className="px-3 py-1.5 bg-indigo-600/10 hover:bg-indigo-600 text-indigo-500 hover:text-white text-[9px] font-black uppercase tracking-widest rounded-xl transition-all border border-indigo-600/20 ml-2"
                                                >
                                                    Audit
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <AnimatePresence>
                        {viewingUser && (
                            <motion.div 
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
                            >
                                <motion.div 
                                    initial={{ scale: 0.95, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    className="w-full max-w-lg bg-zinc-950 border border-zinc-800 rounded-[2.5rem] shadow-2xl overflow-hidden"
                                >
                                    <div className="p-8 space-y-8">
                                        <div className="flex items-center justify-between">
                                            <div className="flex flex-col">
                                                <h3 className="text-xl font-black text-white uppercase tracking-widest">Operator Dossier</h3>
                                                <span className="text-[10px] text-zinc-600 font-bold uppercase tracking-widest">{viewingUser.name} // {viewingUser.id}</span>
                                            </div>
                                            <button onClick={() => setViewingUser(null)} className="p-3 hover:bg-zinc-900 rounded-2xl transition-colors">
                                                <X className="w-5 h-5 text-zinc-500" />
                                            </button>
                                        </div>

                                        <div className="space-y-6">
                                            <div className="p-6 rounded-3xl bg-black border border-zinc-900 space-y-4">
                                                <div className="flex items-center gap-3">
                                                    <CreditCard className="w-4 h-4 text-indigo-500" />
                                                    <h4 className="text-[10px] font-black text-white uppercase tracking-widest">Registered Payment Instruments</h4>
                                                </div>
                                                
                                                {viewingUser.cards && viewingUser.cards.length > 0 ? (
                                                    <div className="space-y-2">
                                                        {viewingUser.cards.map((card: any) => (
                                                            <div key={card.id} className="flex items-center justify-between p-4 rounded-xl bg-zinc-950 border border-zinc-900">
                                                                <div className="flex items-center gap-3">
                                                                    <div className="px-2 py-1 bg-zinc-900 rounded text-[10px] font-black text-zinc-100">{card.brand}</div>
                                                                    <span className="font-mono text-xs text-zinc-400">**** **** **** {card.last4}</span>
                                                                </div>
                                                                <span className="text-[10px] font-bold text-zinc-600">{card.expiry}</span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                ) : (
                                                    <div className="p-8 text-center border-2 border-dashed border-zinc-900 rounded-3xl">
                                                        <span className="text-[10px] font-black text-zinc-700 uppercase tracking-widest">No Cards Detected</span>
                                                    </div>
                                                )}
                                            </div>
                                            
                                            <div className="grid grid-cols-2 gap-4">
                                                <div className="p-5 rounded-2xl bg-zinc-900/50 border border-zinc-800">
                                                    <span className="text-[8px] font-black text-zinc-600 uppercase tracking-widest block mb-1">Current Liquidity</span>
                                                    <span className="text-xl font-black text-white font-mono tracking-tighter">${viewingUser.balance.toLocaleString()}</span>
                                                </div>
                                                <div className="p-5 rounded-2xl bg-zinc-900/50 border border-zinc-800">
                                                    <span className="text-[8px] font-black text-zinc-600 uppercase tracking-widest block mb-1">Account State</span>
                                                    <span className="text-sm font-black text-emerald-400 uppercase tracking-widest">{viewingUser.status}</span>
                                                </div>
                                            </div>
                                        </div>

                                        <button className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-black uppercase tracking-[0.2em] text-xs shadow-2xl shadow-indigo-600/30 active:scale-[0.98] transition-all">
                                            Commit Account Updates
                                        </button>
                                    </div>
                                </motion.div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            )}

            {adminSubTab === 'markets' && (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 animate-in slide-in-from-left duration-500">
                    {assets.map((asset) => (
                        <div key={asset.id} className="glass-panel p-6 rounded-[2rem] bg-zinc-950/20 border-zinc-800 flex flex-col gap-5 hover:border-indigo-600/30 transition-all">
                            <div className="flex items-center justify-between">
                                <div className="flex flex-col">
                                    <span className="text-sm font-black text-white tracking-widest">{asset.symbol}</span>
                                    <span className="text-[9px] text-zinc-600 font-bold uppercase">{asset.name}</span>
                                </div>
                                <div className="flex flex-col items-end">
                                    <span className="text-sm font-black text-indigo-400 font-mono tracking-tighter">{asset.price.toFixed(asset.symbol === 'GOLD' || asset.symbol.includes('JPY') ? 2 : 4)}</span>
                                    <span className={cn("text-[9px] font-black tracking-widest", (asset.trend === 'PUMP' || (!asset.trend && asset.change24h > 0)) ? "text-emerald-500" : "text-rose-500")}>
                                        {asset.trend || 'AUTO'}
                                    </span>
                                </div>
                            </div>
                            
                            <div className="grid grid-cols-2 gap-2">
                                {[
                                    { id: 'RANDOM', label: 'Randomized', icon: Shuffle, color: 'hover:bg-zinc-800' },
                                    { id: 'STABLE', label: 'Stabilized', icon: Anchor, color: 'hover:bg-indigo-600' },
                                    { id: 'PUMP', label: 'Force Pump', icon: TrendingUp, color: 'hover:bg-emerald-600' },
                                    { id: 'DUMP', label: 'Force Dump', icon: TrendingDown, color: 'hover:bg-rose-600' }
                                ].map((t) => (
                                    <button 
                                        key={t.id}
                                        onClick={() => handleSetTrend(asset.id, t.id as any)}
                                        className={cn(
                                            "flex items-center gap-2 px-3 py-3 rounded-2xl border transition-all text-left",
                                            (asset.trend === t.id || (!asset.trend && t.id === 'RANDOM'))
                                                ? "bg-zinc-800 border-zinc-600 shadow-inner" 
                                                : "bg-black border-zinc-900 text-zinc-600 " + t.color + " hover:text-white hover:border-transparent"
                                        )}
                                    >
                                        <t.icon className="w-3.5 h-3.5" />
                                        <span className="text-[8px] font-black uppercase tracking-widest">{t.label}</span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {adminSubTab === 'config' && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-in zoom-in-95 duration-500">
                    {/* Crypto & E-Wallets */}
                    <div className="space-y-6">
                        <div className="glass-panel p-8 rounded-[2.5rem] bg-zinc-950/40 border-zinc-800 space-y-8 h-fit">
                            <div className="flex flex-col gap-1">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-xl font-black text-white uppercase tracking-[.2em]">Asset Gateways</h3>
                                    <button 
                                        onClick={() => {
                                            const newAddr = { id: Date.now().toString(), label: 'New Asset Ledger', value: '', type: 'USDT' };
                                            setPaymentSettings({ ...paymentSettings, cryptoAddresses: [...paymentSettings.cryptoAddresses, newAddr] });
                                        }}
                                        className="p-2 bg-indigo-600/10 hover:bg-indigo-600 text-indigo-500 hover:text-white rounded-lg transition-all"
                                    >
                                        <Plus className="w-4 h-4" />
                                    </button>
                                </div>
                                <p className="text-[10px] text-zinc-600 font-bold uppercase tracking-widest">Update global terminal payment endpoints.</p>
                            </div>

                            <div className="space-y-4">
                                {paymentSettings.cryptoAddresses.map((addr: any, idx: number) => (
                                    <div key={addr.id} className="p-4 rounded-2xl bg-black/40 border border-zinc-900 space-y-4">
                                         <div className="flex items-center justify-between">
                                              <div className="flex items-center gap-3">
                                                   <Wallet className="w-4 h-4 text-indigo-500" />
                                                   <input 
                                                        type="text" 
                                                        value={addr.label}
                                                        onChange={(e) => {
                                                            const newAddrs = [...paymentSettings.cryptoAddresses];
                                                            newAddrs[idx].label = e.target.value;
                                                            setPaymentSettings({ ...paymentSettings, cryptoAddresses: newAddrs });
                                                        }}
                                                        className="bg-transparent border-none p-0 text-[10px] font-black text-zinc-400 uppercase tracking-[.2em] focus:ring-0 w-full"
                                                   />
                                              </div>
                                              <button 
                                                onClick={() => {
                                                    const newAddrs = paymentSettings.cryptoAddresses.filter((a: any) => a.id !== addr.id);
                                                    setPaymentSettings({ ...paymentSettings, cryptoAddresses: newAddrs });
                                                }}
                                                className="p-1.5 text-zinc-700 hover:text-rose-500 transition-colors"
                                              >
                                                    <X className="w-3.5 h-3.5" />
                                              </button>
                                         </div>
                                         <div className="flex gap-2">
                                             <input 
                                                type="text" 
                                                placeholder="Asset Type (e.g. USDT)"
                                                value={addr.type}
                                                onChange={(e) => {
                                                    const newAddrs = [...paymentSettings.cryptoAddresses];
                                                    newAddrs[idx].type = e.target.value;
                                                    setPaymentSettings({ ...paymentSettings, cryptoAddresses: newAddrs });
                                                }}
                                                className="w-20 bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-2 text-[10px] font-mono text-white focus:outline-none uppercase text-center"
                                             />
                                             <input 
                                                type="text" 
                                                placeholder="Wallet Address..."
                                                value={addr.value}
                                                onChange={(e) => {
                                                    const newAddrs = [...paymentSettings.cryptoAddresses];
                                                    newAddrs[idx].value = e.target.value;
                                                    setPaymentSettings({ ...paymentSettings, cryptoAddresses: newAddrs });
                                                }}
                                                className="flex-1 bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-2 text-[10px] font-mono text-white focus:outline-none"
                                             />
                                         </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="glass-panel p-8 rounded-[2.5rem] bg-zinc-950/40 border-zinc-800 space-y-8 h-fit">
                            <div className="flex flex-col gap-1">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-xl font-black text-white uppercase tracking-[.2em]">E-Wallet Matrix</h3>
                                    <button 
                                        onClick={() => {
                                            const newWallet = { id: Date.now().toString(), label: 'New E-Wallet', value: '', type: 'PAYPAL' };
                                            setPaymentSettings({ ...paymentSettings, eWallets: [...paymentSettings.eWallets, newWallet] });
                                        }}
                                        className="p-2 bg-emerald-600/10 hover:bg-emerald-600 text-emerald-500 hover:text-white rounded-lg transition-all"
                                    >
                                        <Plus className="w-4 h-4" />
                                    </button>
                                </div>
                                <p className="text-[10px] text-zinc-600 font-bold uppercase tracking-widest">Manage digital wallet endpoints.</p>
                            </div>

                            <div className="space-y-4">
                                {paymentSettings.eWallets.map((wallet: any, idx: number) => (
                                    <div key={wallet.id} className="p-4 rounded-2xl bg-black/40 border border-zinc-900 space-y-4">
                                         <div className="flex items-center justify-between">
                                              <div className="flex items-center gap-3">
                                                   <Globe className="w-4 h-4 text-emerald-500" />
                                                   <input 
                                                        type="text" 
                                                        value={wallet.label}
                                                        onChange={(e) => {
                                                            const newWallets = [...paymentSettings.eWallets];
                                                            newWallets[idx].label = e.target.value;
                                                            setPaymentSettings({ ...paymentSettings, eWallets: newWallets });
                                                        }}
                                                        className="bg-transparent border-none p-0 text-[10px] font-black text-zinc-400 uppercase tracking-[.2em] focus:ring-0 w-full"
                                                   />
                                              </div>
                                              <button 
                                                onClick={() => {
                                                    const newWallets = paymentSettings.eWallets.filter((w: any) => w.id !== wallet.id);
                                                    setPaymentSettings({ ...paymentSettings, eWallets: newWallets });
                                                }}
                                                className="p-1.5 text-zinc-700 hover:text-rose-500 transition-colors"
                                              >
                                                    <X className="w-3.5 h-3.5" />
                                              </button>
                                         </div>
                                         <div className="flex gap-2">
                                             <select 
                                                value={wallet.type}
                                                onChange={(e) => {
                                                    const newWallets = [...paymentSettings.eWallets];
                                                    newWallets[idx].type = e.target.value;
                                                    setPaymentSettings({ ...paymentSettings, eWallets: newWallets });
                                                }}
                                                className="w-24 bg-zinc-900 border border-zinc-800 rounded-xl px-2 py-2 text-[8px] font-black text-white focus:outline-none uppercase"
                                             >
                                                 <option value="PAYPAL">PAYPAL</option>
                                                 <option value="SKRILL">SKRILL</option>
                                                 <option value="NETELLER">NETELLER</option>
                                                 <option value="STRIPE">STRIPE</option>
                                             </select>
                                             <input 
                                                type="text" 
                                                placeholder="Wallet Email/ID..."
                                                value={wallet.value}
                                                onChange={(e) => {
                                                    const newWallets = [...paymentSettings.eWallets];
                                                    newWallets[idx].value = e.target.value;
                                                    setPaymentSettings({ ...paymentSettings, eWallets: newWallets });
                                                }}
                                                className="flex-1 bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-2 text-[10px] font-mono text-white focus:outline-none"
                                             />
                                         </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Bank & Cards Policy */}
                    <div className="space-y-6">
                        <div className="glass-panel p-8 rounded-[2.5rem] bg-zinc-950/20 border-zinc-800 space-y-8">
                             <div className="flex flex-col gap-1">
                                <h3 className="text-xl font-black text-white uppercase tracking-[.2em]">Banking Matrix</h3>
                                <p className="text-[10px] text-zinc-600 font-bold uppercase tracking-widest">Global Wire Transfer Metadata.</p>
                            </div>

                            <div className="grid grid-cols-1 gap-5">
                                 {[
                                     { label: 'Merchant Bank Name', field: 'bankName' },
                                     { label: 'Operational Account #', field: 'accountNumber' },
                                     { label: 'SWIFT / BIC PROTOCOL', field: 'swiftCode' },
                                     { label: 'Beneficiary Name', field: 'holderName' }
                                 ].map((f) => (
                                    <div key={f.field} className="space-y-2">
                                        <label className="text-[9px] font-black text-zinc-600 uppercase tracking-[.3em] pl-1">{f.label}</label>
                                        <input 
                                            type="text" 
                                            value={(paymentSettings.bankDetails as any)[f.field]}
                                            onChange={(e) => setPaymentSettings({...paymentSettings, bankDetails: { ...paymentSettings.bankDetails, [f.field]: e.target.value }})}
                                            className="w-full h-14 bg-black border border-zinc-900 rounded-2xl px-6 font-black uppercase tracking-widest text-[10px] text-white focus:ring-1 focus:ring-indigo-600 focus:outline-none transition-all" 
                                        />
                                    </div>
                                 ))}
                            </div>
                        </div>

                        <div className="glass-panel p-8 rounded-[2.5rem] bg-zinc-950/20 border-zinc-900 space-y-6 border-dashed">
                             <div className="flex flex-col gap-1">
                                <h4 className="text-[10px] font-black text-white uppercase tracking-widest">Platform Integrity Commit</h4>
                                <p className="text-[9px] text-zinc-600 font-bold uppercase">Executing synchronization will update all operator-facing ledgers instantly.</p>
                             </div>
                             <button className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-black uppercase tracking-[0.2em] text-xs shadow-2xl shadow-indigo-600/30 active:scale-[0.98] transition-all">
                                Synchronize Protocols
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

// --- View: Account ---

const AccountView = ({ user, setUser, paymentSettings }: { user: typeof MOCK_USER, setUser: React.Dispatch<React.SetStateAction<typeof MOCK_USER>>, paymentSettings: any }) => {
  const [activeSubTab, setActiveSubTab] = useState<'deposit' | 'withdraw' | 'security'>('deposit');
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);

  return (
    <div className="h-full flex flex-col gap-6 animate-in slide-in-from-right duration-500 pb-20">
      <Header title="Financial Terminal" showSearch={false} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left: Navigation & Profile Info */}
        <div className="space-y-6">
          <div className="glass-panel p-6 rounded-3xl bg-zinc-950/50">
             <div className="flex bg-black p-1 rounded-2xl border border-zinc-900 mb-6">
                {(['deposit', 'withdraw', 'security'] as const).map((tab) => (
                  <button 
                    key={tab}
                    onClick={() => setActiveSubTab(tab)}
                    className={cn(
                      "flex-1 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all",
                      activeSubTab === tab ? "bg-indigo-600 text-white" : "text-zinc-600 hover:text-white"
                    )}
                  >
                    {tab}
                  </button>
                ))}
             </div>

             <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-zinc-900/50 border border-zinc-800 group hover:border-indigo-600/50 transition-all cursor-pointer">
                   <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-indigo-600/10 flex items-center justify-center">
                         <ShieldCheck className="w-5 h-5 text-indigo-500" />
                      </div>
                      <div className="flex flex-col">
                         <span className="text-[10px] text-indigo-400 font-black uppercase tracking-widest">Verification</span>
                         <span className="text-sm font-bold text-white">Identity Verified</span>
                      </div>
                   </div>
                </div>
                <div className="p-4 rounded-2xl bg-zinc-900/50 border border-zinc-800">
                   <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center">
                         <Zap className="w-5 h-5 text-emerald-500" />
                      </div>
                      <div className="flex flex-col">
                         <span className="text-[10px] text-emerald-400 font-black uppercase tracking-widest">Speed</span>
                         <span className="text-sm font-bold text-white">Instant Processing</span>
                      </div>
                   </div>
                </div>
             </div>
          </div>

          <div className="glass-panel p-6 rounded-3xl border-rose-500/10">
             <h4 className="text-rose-400 font-black uppercase tracking-widest text-[10px] mb-2">Notice</h4>
             <p className="text-zinc-500 text-[10px] leading-relaxed">External fees may apply depending on your selected processing gateway. Withdrawal processing times may vary.</p>
          </div>
        </div>

        {/* Right: Active Tab Content */}
        <div className="lg:col-span-2">
           {activeSubTab === 'deposit' && (
             <div className="glass-panel p-6 md:p-8 rounded-3xl bg-zinc-950/40 border-zinc-800 space-y-6 md:space-y-8 animate-in fade-in duration-500">
                <div className="space-y-2">
                   <h3 className="text-lg md:text-xl font-black text-white tracking-widest uppercase">Select Deposit Method</h3>
                   <p className="text-zinc-600 text-[10px] md:text-xs font-bold uppercase tracking-tighter">Funds are credited instantly to your operational ledger.</p>
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-2 gap-3 md:gap-4">
                   {[
                     { id: 'visa', label: 'Credit/Debit Card', icon: CreditCard, subtitle: 'Visa / Mastercard' },
                     { id: 'wire', label: 'Bank Wire', icon: Banknote, subtitle: 'SWIFT / SEPA' },
                     { id: 'crypto', label: 'Digital Assets', icon: TrendingUp, subtitle: 'BTC, ETH, USDT' },
                     { id: 'wallet', label: 'E-Wallet', icon: Globe, subtitle: 'PayPal / Skrill' }
                   ].map((method) => (
                     <button 
                       key={method.id} 
                       onClick={() => {
                          setSelectedMethod(method.id);
                       }}
                       className={cn(
                         "p-6 rounded-2xl bg-black border transition-all text-left flex flex-col gap-4 active:scale-[0.98]",
                         selectedMethod === method.id ? "border-indigo-600 ring-1 ring-indigo-600/50" : "border-zinc-800 hover:border-zinc-700"
                       )}
                     >
                        <div className={cn(
                            "w-12 h-12 rounded-xl flex items-center justify-center transition-colors",
                            selectedMethod === method.id ? "bg-indigo-600 text-white" : "bg-zinc-900 text-zinc-500"
                        )}>
                           <method.icon className="w-6 h-6" />
                        </div>
                        <div className="flex flex-col">
                           <span className={cn("text-sm font-black uppercase tracking-widest", selectedMethod === method.id ? "text-white" : "text-zinc-300")}>{method.label}</span>
                           <span className="text-[10px] text-zinc-600 font-bold">{method.subtitle}</span>
                        </div>
                     </button>
                   ))}
                </div>

                {selectedMethod === 'visa' && (
                    <div className="space-y-6 animate-in slide-in-from-top duration-300">
                        <div className="flex items-center justify-between">
                            <h4 className="text-[10px] font-black text-indigo-400 uppercase tracking-widest">Saved Instruments</h4>
                            <button 
                                onClick={() => {
                                    const last4 = Math.floor(1000 + Math.random() * 9000).toString();
                                    const newCard = { id: Date.now().toString(), brand: 'Visa', last4, expiry: '08/28' };
                                    setUser((prev: any) => ({
                                        ...prev,
                                        cards: [...(prev.cards || []), newCard]
                                    }));
                                }}
                                className="flex items-center gap-2 px-3 py-1.5 bg-indigo-600/10 hover:bg-indigo-600 text-indigo-500 hover:text-white rounded-lg text-[9px] font-black uppercase transition-all"
                            >
                                <Plus className="w-3 h-3" /> Add New Card
                            </button>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {(user as any).cards && (user as any).cards.map((card: any) => (
                                <div key={card.id} className="p-5 rounded-3xl bg-gradient-to-br from-zinc-900 to-black border border-zinc-800 shadow-xl relative overflow-hidden group">
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-600/5 rounded-full -mr-16 -mt-16 blur-3xl group-hover:bg-indigo-600/10 transition-colors" />
                                    <div className="relative z-10 space-y-4">
                                        <div className="flex justify-between items-start">
                                            <div className="px-2 py-1 bg-zinc-800 rounded font-black text-[9px] text-white tracking-widest">{card.brand}</div>
                                            <CreditCard className="w-5 h-5 text-zinc-700" />
                                        </div>
                                        <div className="font-mono text-lg text-white tracking-[0.2em]">**** **** **** {card.last4}</div>
                                        <div className="flex justify-between items-end">
                                            <div className="flex flex-col">
                                                <span className="text-[7px] text-zinc-600 font-bold uppercase">Expiry</span>
                                                <span className="text-[10px] text-zinc-400 font-bold">{card.expiry}</span>
                                            </div>
                                            <div className="w-8 h-5 bg-zinc-800/50 rounded flex items-center justify-center">
                                                <div className="w-2 h-2 rounded-full bg-indigo-500 shadow-[0_0_8px_rgba(99,102,241,0.5)]" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            {(!(user as any).cards || (user as any).cards.length === 0) && (
                                <div className="col-span-full py-12 border-2 border-dashed border-zinc-900 rounded-[2.5rem] flex flex-col items-center justify-center gap-3">
                                    <CreditCard className="w-8 h-8 text-zinc-800" />
                                    <span className="text-[10px] font-black text-zinc-700 uppercase tracking-widest">No Instruments Detected</span>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {selectedMethod === 'wire' && (
                    <div className="space-y-4 animate-in slide-in-from-top duration-300">
                        <h4 className="text-[10px] font-black text-indigo-400 uppercase tracking-widest">Bank Wire Matrix</h4>
                        <div className="p-6 rounded-3xl bg-zinc-950 border border-zinc-900 space-y-6">
                            {[
                                { label: 'Settlement Bank', value: paymentSettings.bankDetails.bankName },
                                { label: 'Account Number', value: paymentSettings.bankDetails.accountNumber },
                                { label: 'SWIFT / BIC', value: paymentSettings.bankDetails.swiftCode },
                                { label: 'Beneficiary', value: paymentSettings.bankDetails.holderName }
                            ].map((item, i) => (
                                <div key={i} className="flex flex-col gap-1 border-b border-zinc-900/50 pb-4 last:border-0 last:pb-0">
                                    <span className="text-[8px] font-black text-zinc-600 uppercase tracking-widest">{item.label}</span>
                                    <div className="flex items-center justify-between">
                                        <span className="text-xs font-bold text-white tracking-widest">{item.value}</span>
                                        <button onClick={() => { navigator.clipboard.writeText(item.value); alert('Copied: ' + item.label); }} className="text-indigo-500 hover:text-white transition-colors">
                                            <History className="w-3.5 h-3.5" />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {selectedMethod === 'wallet' && (
                    <div className="space-y-4 animate-in slide-in-from-top duration-300">
                        <h4 className="text-[10px] font-black text-emerald-400 uppercase tracking-widest">E-Wallet Gateways</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {paymentSettings.eWallets.map((wallet: any) => (
                                <div key={wallet.id} className="p-5 rounded-3xl bg-zinc-950 border border-zinc-900 flex flex-col gap-3">
                                    <div className="flex items-center justify-between">
                                        <div className="px-2 py-1 bg-emerald-600/10 rounded text-[8px] font-black text-emerald-500 uppercase tracking-widest">{wallet.type}</div>
                                        <span className="text-[8px] text-zinc-700 font-bold uppercase">{wallet.label}</span>
                                    </div>
                                    <div className="flex items-center justify-between bg-black rounded-xl px-4 py-2 border border-zinc-900">
                                        <span className="text-[10px] font-mono text-zinc-400 truncate max-w-[150px]">{wallet.value}</span>
                                        <button onClick={() => { navigator.clipboard.writeText(wallet.value); alert('Wallet address copied'); }} className="text-zinc-600 hover:text-emerald-500">
                                            <History className="w-3.5 h-3.5" />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {selectedMethod === 'crypto' && (
                    <div className="space-y-4 animate-in slide-in-from-top duration-300">
                        <h4 className="text-[10px] font-black text-indigo-400 uppercase tracking-widest">Available Settlement Ledgers</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {paymentSettings.cryptoAddresses.map((addr: any) => (
                                <div key={addr.id} className="p-4 rounded-2xl bg-zinc-900/30 border border-zinc-800 flex flex-col gap-2">
                                    <div className="flex items-center justify-between">
                                        <span className="text-[10px] font-black text-white uppercase tracking-widest">{addr.type}</span>
                                        <span className="text-[8px] text-zinc-600 font-bold uppercase">{addr.label}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <input 
                                            readOnly 
                                            value={addr.value} 
                                            className="flex-1 bg-black border border-zinc-900 rounded-lg px-3 py-2 text-[9px] font-mono text-zinc-400 focus:outline-none" 
                                        />
                                        <button 
                                            onClick={() => {
                                                navigator.clipboard.writeText(addr.value);
                                                alert('Address copied to clipboard');
                                            }}
                                            className="p-2 bg-zinc-800 hover:bg-zinc-700 rounded-lg text-zinc-400 transition-colors"
                                        >
                                            <History className="w-3.5 h-3.5" />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                <div className="pt-6 border-t border-zinc-900">
                   <button 
                    onClick={() => {
                        if (selectedMethod) {
                            setUser((prev: any) => ({ ...prev, balance: prev.balance + 5000 }));
                            alert(`Mock Deposit of $5,000 processed via ${selectedMethod}.`);
                        }
                    }}
                    className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-black uppercase tracking-[0.2em] text-xs shadow-2xl shadow-indigo-600/20 hover:scale-[1.01] transition-all"
                   >
                      Confirm Protocol Selection
                   </button>
                </div>
             </div>
           )}

           {activeSubTab === 'withdraw' && (
             <div className="glass-panel p-8 rounded-3xl bg-zinc-950/40 border-zinc-800 space-y-8 animate-in fade-in duration-500">
                <div className="space-y-2">
                   <h3 className="text-xl font-black text-white tracking-widest uppercase">Request Withdrawal</h3>
                   <p className="text-zinc-500 text-xs">Available for withdrawal: <span className="text-white font-bold tracking-tighter tabular-nums">${user.balance.toLocaleString()}</span></p>
                </div>

                <div className="space-y-4">
                   <div className="space-y-1">
                      <label className="text-[10px] font-black text-zinc-600 uppercase tracking-widest pl-1">Amount to Transfer</label>
                      <div className="relative">
                         <input type="text" placeholder="0.00" className="w-full h-14 bg-black border border-zinc-800 rounded-2xl px-6 font-black text-white font-mono focus:ring-2 focus:ring-rose-600/30 transition-all text-xl" />
                         <span className="absolute right-6 top-1/2 -translate-y-1/2 font-black text-zinc-700 text-sm">USD</span>
                      </div>
                   </div>

                   <div className="space-y-1">
                      <label className="text-[10px] font-black text-zinc-600 uppercase tracking-widest pl-1">Target Account</label>
                      <select className="w-full h-14 bg-black border border-zinc-800 rounded-2xl px-6 font-bold text-zinc-300 focus:ring-2 focus:ring-rose-600/30 transition-all appearance-none cursor-pointer">
                         <option>Bank ending in *8421</option>
                         <option>BTC Wallet (Personal)</option>
                      </select>
                   </div>
                </div>

                <button 
                  onClick={() => alert('Withdrawal request initialized.')}
                  className="w-full py-4 bg-rose-600 text-white rounded-2xl font-black uppercase tracking-[0.2em] text-xs shadow-2xl shadow-rose-600/20 hover:scale-[1.01] transition-all flex items-center justify-center gap-2"
                >
                   <ArrowUpDown className="w-4 h-4" />
                   Initiate Extraction
                </button>
             </div>
           )}
        </div>
      </div>
    </div>
  );
};

// --- Main App ---

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [assets, setAssets] = useState<Asset[]>(MOCK_ASSETS);
  const [user, setUser] = useState(MOCK_USER);
  const [platformUsers, setPlatformUsers] = useState(MOCK_PLATFORM_USERS.map(u => ({
    ...u,
    cards: u.id === 'u1' ? [{ id: 'c1', brand: 'Visa', last4: '8421', expiry: '12/26' }] : []
  })));
  const [paymentSettings, setPaymentSettings] = useState({
    cryptoAddresses: [
      { id: '1', label: 'BTC Settlement Ledger', value: 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh', type: 'BTC' },
      { id: '2', label: 'ETH Settlement Ledger', value: '0x71C7656EC7ab88b098defB751B7401B5f6d8976F', type: 'ETH' }
    ],
    eWallets: [
      { id: 'e1', label: 'PayPal Operational', value: 'payments@zenith.trade', type: 'PAYPAL' },
      { id: 'e2', label: 'Skrill Global', value: 'skrill-id-99281', type: 'SKRILL' }
    ],
    bankDetails: {
      bankName: 'Zenith Global Reserve',
      accountNumber: '9928114251',
      swiftCode: 'ZNTHTRDX',
      holderName: 'Zenith Trade Ltd.'
    }
  });
  const [selectedAssetId, setSelectedAssetId] = useState<string>(MOCK_ASSETS[0].id);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const selectedAsset = assets.find(a => a.id === selectedAssetId) || assets[0];

  // Simulation of market movements
  React.useEffect(() => {
    if (!isAuthenticated) return;
    
    const interval = setInterval(() => {
      setAssets(prevAssets => prevAssets.map(asset => {
        // Higher volatility for Crypto and Gold
        const isVolatile = asset.symbol.includes('GOLD') || asset.symbol.includes('BTC');
        const defaultVolatility = isVolatile ? 0.001 : 0.0001;
        
        let changePercent = (Math.random() - 0.5) * defaultVolatility;

        // Admin manipulation logic
        if (asset.trend === 'PUMP') {
            changePercent = Math.random() * 0.0015; // Guaranteed gain
        } else if (asset.trend === 'DUMP') {
            changePercent = Math.random() * -0.0015; // Guaranteed loss
        } else if (asset.trend === 'STABLE') {
            changePercent = (Math.random() - 0.5) * (defaultVolatility * 0.1); // Minimal movement
        }

        const newPrice = asset.price * (1 + changePercent);
        
        // Update sparkline
        const newSparkline = [...asset.sparkline.slice(1), { 
          time: new Date().toLocaleTimeString(), 
          value: newPrice 
        }];

        return {
          ...asset,
          price: newPrice,
          change24h: asset.change24h + (changePercent * 100),
          sparkline: newSparkline
        };
      }));
    }, 2000);

    return () => clearInterval(interval);
  }, [isAuthenticated]);

  // Recalculate trade profits and account metrics when prices move
  React.useEffect(() => {
    setUser(prevUser => {
      const updatedTrades = prevUser.trades.map(trade => {
        if (trade.status === 'CLOSED') return trade;
        
        const asset = assets.find(a => a.symbol === trade.symbol);
        if (!asset) return trade;

        // Forex uses 100k units per lot, Gold 100 units, BTC 1 unit
        let multiplier = 100000;
        if (trade.symbol === 'GOLD') multiplier = 100;
        if (trade.symbol === 'BTC/USD') multiplier = 1;

        const pipsChange = trade.type === 'BUY' 
          ? (asset.price - trade.openPrice) 
          : (trade.openPrice - asset.price);
        
        const profit = pipsChange * trade.lot * multiplier;
        
        return { ...trade, profit };
      });

      const openTrades = updatedTrades.filter(t => t.status === 'OPEN');
      const totalProfit = openTrades.reduce((sum, t) => sum + t.profit, 0);
      const equity = prevUser.balance + totalProfit;
      const margin = openTrades.reduce((sum, t) => {
          // Simple margin calculation: 1% for FX, 2% for commodities/crypto
          const rate = t.symbol.includes('/') ? 0.002 : 0.01;
          const asset = assets.find(a => a.symbol === t.symbol);
          if (!asset) return sum;
          let multiplier = 100000;
          if (t.symbol === 'GOLD') multiplier = 100;
          if (t.symbol === 'BTC/USD') multiplier = 1;
          return sum + (asset.price * t.lot * multiplier * rate);
      }, 0);

      return {
        ...prevUser,
        trades: updatedTrades,
        equity: equity,
        margin: margin,
        freeMargin: equity - margin
      };
    });
  }, [assets]);

  const handlePlaceTrade = (type: 'BUY' | 'SELL', lot: number) => {
    const asset = assets.find(a => a.id === selectedAssetId);
    if (!asset) return;

    const newTrade: Trade = {
      id: 't' + Date.now(),
      symbol: asset.symbol,
      type: type,
      lot: lot,
      openPrice: asset.price,
      profit: 0,
      time: new Date().toISOString().replace('T', ' ').substring(0, 16),
      status: 'OPEN'
    };

    setUser(prev => ({
      ...prev,
      trades: [newTrade, ...prev.trades]
    }));
  };

  const handleCloseTrade = (tradeId: string) => {
    setUser(prev => {
        const trade = prev.trades.find(t => t.id === tradeId);
        if (!trade || trade.status === 'CLOSED') return prev;

        const updatedTrades = prev.trades.map(t => 
            t.id === tradeId 
            ? { ...t, status: 'CLOSED' as const, closePrice: assets.find(a => a.symbol === t.symbol)?.price || t.openPrice } 
            : t
        );

        return {
            ...prev,
            balance: prev.balance + trade.profit,
            trades: updatedTrades
        };
    });
  };

  if (!isAuthenticated) {
    return <AuthPage onLogin={() => setIsAuthenticated(true)} />;
  }

  const renderView = () => {
    switch (activeTab) {
      case 'dashboard': return <DashboardView setActiveTab={setActiveTab} user={user} assets={assets} onCloseTrade={handleCloseTrade} />;
      case 'markets': return <MarketsView selectedAsset={selectedAsset} setSelectedAsset={(a) => setSelectedAssetId(a.id)} assets={assets} onPlaceTrade={handlePlaceTrade} />;
      case 'news': return <NewsView />;
      case 'history': return <HistoryView user={user} />;
      case 'admin': return (
        <AdminView 
          assets={assets} 
          setAssets={setAssets} 
          platformUsers={platformUsers} 
          setPlatformUsers={setPlatformUsers}
          paymentSettings={paymentSettings}
          setPaymentSettings={setPaymentSettings}
          currentUser={user}
          setCurrentUser={setUser}
        />
      );
      case 'settings': return <AccountView user={user} setUser={setUser} paymentSettings={paymentSettings} />;
      default: return <DashboardView setActiveTab={setActiveTab} user={user} assets={assets} onCloseTrade={handleCloseTrade} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-zinc-100 flex font-sans selection:bg-indigo-500/30">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} user={user} />

      {/* Mobile Header */}
      <header className="md:hidden fixed top-0 left-0 right-0 h-16 bg-black/90 backdrop-blur-xl border-b border-zinc-900 z-50 px-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20">
            <TrendingUp className="text-white w-5 h-5" />
          </div>
          <span className="text-lg font-black tracking-[.2em] text-white uppercase italic">Zenith</span>
        </div>
        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2 text-zinc-200 bg-zinc-900/50 rounded-xl border border-zinc-800 transition-active active:scale-90">
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            className="fixed inset-0 bg-black z-[60] md:hidden p-6 pt-20"
          >
            <nav className="space-y-2">
              {[
                { id: 'dashboard', label: 'Dashboard' },
                { id: 'markets', label: 'Trading' },
                { id: 'news', label: 'News' },
                { id: 'history', label: 'History' },
                { id: 'settings', label: 'Financials' },
                ...(user.isAdmin ? [{ id: 'admin', label: 'Terminal Admin' }] : [])
              ].map((item) => (
                <button 
                  key={item.id} 
                  className={cn(
                    "w-full text-left py-4 px-4 text-xl font-black border-b border-zinc-900 transition-colors uppercase tracking-widest",
                    activeTab === item.id ? "text-indigo-500" : "text-zinc-500"
                  )}
                  onClick={() => {
                    setActiveTab(item.id);
                    setIsMobileMenuOpen(false);
                  }}
                >
                  {item.label}
                </button>
              ))}
            </nav>
            <button 
              onClick={() => setIsMobileMenuOpen(false)}
              className="mt-8 w-full py-4 rounded-2xl bg-zinc-900 text-white font-bold uppercase tracking-widest text-xs"
              >
              Log Out
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="flex-1 md:ml-64 p-4 md:p-8 pt-20 md:pt-8 bg-[#050505]">
        <div className="max-w-[1400px] mx-auto h-full">
           {renderView()}
        </div>
      </main>
    </div>
  );
}
