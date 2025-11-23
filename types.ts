import React from 'react';
import { LucideIcon } from 'lucide-react';

export interface AppConfig {
  id: string;
  name: string;
  icon: LucideIcon;
  color: string;
  component: React.ComponentType<any>;
  description?: string; // For App Store
  category?: string;    // For App Store
}

export interface SystemState {
  isLocked: boolean;
  activeAppId: string | null;
  openApps: string[]; // List of App IDs
  installedAppIds: string[]; // List of Installed App IDs
  isControlCenterOpen: boolean;
  isRecentsOpen: boolean; // New state for Task Switcher
  brightness: number;
  volume: number;
  wifi: boolean;
  bluetooth: boolean;
  flashlight: boolean;
  wallpaperIndex: number;
}

export enum AppId {
  Calculator = 'calculator',
  Camera = 'camera',
  Settings = 'settings',
  Gallery = 'gallery',
  Browser = 'browser',
  Assistant = 'assistant',
  Clock = 'clock',
  Notes = 'notes',
  AppStore = 'appstore',
  ThemeStore = 'themestore',
  Music = 'music',
  Calendar = 'calendar',
  Weather = 'weather'
}