import React from 'react';
import { 
  Calculator, Camera, Settings, Image, Globe, Sparkles, Clock, FileText, 
  ShoppingBag, Palette, Music, Calendar, CloudRain
} from 'lucide-react';
import { AppConfig, AppId } from './types';
import CalculatorApp from './components/apps/Calculator';
import CameraApp from './components/apps/Camera';
import SettingsApp from './components/apps/Settings';
import GeminiAssistant from './components/apps/GeminiAssistant';
import GalleryApp from './components/apps/Gallery';
import BrowserApp from './components/apps/Browser';
import ClockApp from './components/apps/Clock';
import NotesApp from './components/apps/Notes';
import AppMarket from './components/apps/AppMarket';
import ThemeStore from './components/apps/ThemeStore';
import { MusicApp, CalendarApp, WeatherApp } from './components/apps/SimpleApps';

export const APPS: AppConfig[] = [
  // System Apps
  { id: AppId.Assistant, name: '智能助手', icon: Sparkles, color: 'bg-gradient-to-br from-indigo-500 to-purple-600', component: GeminiAssistant, category: 'AI 工具' },
  { id: AppId.AppStore, name: '应用商店', icon: ShoppingBag, color: 'bg-blue-600', component: AppMarket, category: '系统' },
  { id: AppId.ThemeStore, name: '主题商店', icon: Palette, color: 'bg-purple-600', component: ThemeStore, category: '系统' },
  { id: AppId.Settings, name: '设置', icon: Settings, color: 'bg-gradient-to-br from-gray-400 to-gray-600', component: SettingsApp, category: '系统' },
  { id: AppId.Gallery, name: '相册', icon: Image, color: 'bg-gradient-to-br from-purple-500 to-pink-500', component: GalleryApp, category: '工具' },
  { id: AppId.Camera, name: '相机', icon: Camera, color: 'bg-gradient-to-br from-gray-700 to-gray-900', component: CameraApp, category: '工具' },
  { id: AppId.Browser, name: 'Chrome', icon: Globe, color: 'bg-blue-500', component: BrowserApp, category: '工具' },
  
  // Optional / Pre-installed
  { id: AppId.Clock, name: '时钟', icon: Clock, color: 'bg-black border border-gray-700', component: ClockApp, category: '工具' },
  { id: AppId.Notes, name: '笔记', icon: FileText, color: 'bg-yellow-400', component: NotesApp, category: '效率' },
  { id: AppId.Calculator, name: '计算器', icon: Calculator, color: 'bg-orange-500', component: CalculatorApp, category: '工具' },

  // Downloadable
  { id: AppId.Music, name: '音乐', icon: Music, color: 'bg-red-500', component: MusicApp, category: '娱乐' },
  { id: AppId.Calendar, name: '日历', icon: Calendar, color: 'bg-white text-black border border-gray-200', component: CalendarApp, category: '效率' },
  { id: AppId.Weather, name: '天气', icon: CloudRain, color: 'bg-blue-400', component: WeatherApp, category: '生活' },
];

export const WALLPAPERS = [
  'bg-gradient-to-br from-blue-900 via-purple-900 to-black',
  'bg-gradient-to-tr from-emerald-900 via-teal-900 to-black',
  'bg-gradient-to-bl from-rose-900 via-pink-900 to-black',
  'bg-[url("https://picsum.photos/1080/1920?blur=5")] bg-cover bg-center',
  'bg-black'
];