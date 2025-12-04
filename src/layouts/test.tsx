// import {
//   Activity,
//   AlertCircle,
//   Bell,
//   Box,
//   CheckCircle,
//   Download,
//   Info,
//   Layout,
//   Moon,
//   Search,
//   Settings,
//   Store,
//   Sun,
//   Trash2,
//   X,
// } from 'lucide-react'
// import React, {
//   createContext,
//   useCallback,
//   useContext,
//   useEffect,
//   useRef,
//   useState,
// } from 'react'

// // ==========================================
// // 1. CORE TYPES & SDK CONTRACT
// // ==========================================

// type SlotName =
//   | 'header_action'
//   | 'sidebar_nav'
//   | 'dashboard_widget'
//   | 'global_background'
// type ToastType = 'info' | 'error' | 'success'

// interface ToastMessage {
//   id: number
//   message: string
//   type: ToastType
// }

// interface PluginAPI {
//   render: (slot: SlotName, id: string, component: React.FC<any>) => void
//   on: (event: string, callback: (data: any) => void) => void
//   notify: (message: string, type?: ToastType) => void
//   storage: {
//     get: (key: string) => any
//     set: (key: string, value: any) => void
//   }
// }

// interface PluginManifest {
//   id: string
//   name: string
//   description: string
//   version: string
//   author: string
//   icon: React.ElementType
//   sourceUrl: string // Base URL (e.g., 'https://cdn/myplugin')
// }

// interface InstalledPlugin extends PluginManifest {
//   active: boolean
// }

// interface PluginFileManifest {
//   mainScript: string
//   styles: string[]
//   // We omit 'assets' for simplicity, but the logic would be the same: fetch and store/cache.
// }

// // ==========================================
// // 2. THE REMOTE SERVER (Simulated Multi-File Hosting)
// // ==========================================

// // Maps pluginId/filename to its content
// const MOCK_CLOUD_FILES: Record<string, string> = {
//   // --- Dark Mode Pro Files ---
//   'dark-mode-pro/main.json': JSON.stringify({
//     mainScript: 'index.js',
//     styles: ['style.css'],
//   } as PluginFileManifest),
//   'dark-mode-pro/index.js': `
//         const { useState, useEffect } = React;
//         const ThemeToggler = () => {
//             const initialSetting = api.storage.get('theme') === 'dark';
//             const [isDark, setDark] = useState(initialSetting);

//             useEffect(() => {
//                 document.documentElement.style.filter = isDark ? 'invert(0.9) hue-rotate(180deg)' : 'none';
//                 api.storage.set('theme', isDark ? 'dark' : 'light');
//             }, [isDark]);

//             const toggle = () => {
//                 setDark(!isDark);
//                 api.notify(isDark ? "Light Mode Activated" : "Dark Mode Activated", 'info');
//             };

//             return h('button', {
//                 onClick: toggle,
//                 className: 'p-2 rounded-full hover:bg-slate-200 transition-colors dark-mode-pro-button'
//             }, isDark ? h(Icons.Sun, { size: 20 }) : h(Icons.Moon, { size: 20 }));
//         };
//         api.render('header_action', 'theme-toggle', ThemeToggler);
//     `,
//   'dark-mode-pro/style.css': `
//         .dark-mode-pro-button:hover { background-color: #f1f5f9 !important; }
//         /* Just demonstrating an injected style */
//     `,

//   // --- Team Presence Files ---
//   'team-chat/main.json': JSON.stringify({
//     mainScript: 'index.js',
//     styles: [],
//   } as PluginFileManifest),
//   'team-chat/index.js': `
//         const { useState, useEffect } = React;
//         const StatusBadge = () => {
//             const [onlineCount, setOnlineCount] = useState(5);

//             useEffect(() => {
//                 const interval = setInterval(() => {
//                     setOnlineCount(2 + Math.floor(Math.random() * 5));
//                 }, 10000);
//                 return () => clearInterval(interval);
//             }, []);

//             return h('div', { className: 'mt-auto pt-4 border-t border-slate-700' },
//                 h('div', { className: 'flex items-center gap-3 px-2 py-2 text-slate-400' },
//                     h('div', { className: 'w-2 h-2 rounded-full bg-green-500 animate-pulse' }),
//                     h('span', { className: 'text-xs font-medium' }, onlineCount + ' Team Members Online')
//                 )
//             );
//         };
//         api.render('sidebar_nav', 'status-badge', StatusBadge);
//     `,

//   // --- Analytics Logger Files (Background Only) ---
//   'analytics-logger/main.json': JSON.stringify({
//     mainScript: 'index.js',
//     styles: [],
//   } as PluginFileManifest),
//   'analytics-logger/index.js': `
//         let pageViews = 0;
//         api.on('navigation', (route) => {
//             pageViews++;
//             console.log(\`[Analytics Plugin] User moved to: \${route}. Total views: \${pageViews}\`);
//             if (pageViews % 3 === 0) {
//                 api.notify('You have viewed 3 pages. Good job.', 'success');
//             }
//         });
//         api.notify('Analytics Engine Running in Background', 'info');
//     `,

//   // --- Crypto Ticker Files ---
//   'crypto-ticker/main.json': JSON.stringify({
//     mainScript: 'index.js',
//     styles: ['ticker.css'],
//   } as PluginFileManifest),
//   'crypto-ticker/index.js': `
//         const { useState, useEffect } = React;
//         const Ticker = () => {
//             const [price, setPrice] = useState(90000);

//             useEffect(() => {
//                 const interval = setInterval(() => {
//                     setPrice(p => p + (Math.random() > 0.5 ? 1 : -1) * 1000);
//                 }, 3000);
//                 return () => clearInterval(interval);
//             }, []);

//             const formattedPrice = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(price);

//             return h('div', { className: 'crypto-ticker-card flex flex-col justify-center' },
//                 h('div', { className: 'flex justify-between items-center' },
//                     h('span', { className: 'font-bold' }, 'BTC/USD'),
//                     h(Icons.Activity, { size: 16 })
//                 ),
//                 h('div', { className: 'text-2xl font-bold mt-2' }, formattedPrice),
//                 h('div', { className: 'text-xs opacity-75 mt-1' }, price > 90000 ? h('span', {className: 'text-green-300'}, '+5.2% today') : h('span', {className: 'text-red-300'}, '-1.5% today'))
//             );
//         };
//         api.render('dashboard_widget', 'btc-ticker', Ticker);
//     `,
//   'crypto-ticker/ticker.css': `
//         .crypto-ticker-card {
//             background: linear-gradient(135deg, #4f46e5, #8b5cf6);
//             color: white;
//             padding: 1rem;
//             border-radius: 0.75rem;
//             box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
//         }
//     `,
// }

// const MARKETPLACE_LIST: PluginManifest[] = [
//   {
//     id: 'dark-mode-pro',
//     name: 'Dark Mode Pro',
//     description:
//       'Adds a high-contrast dark mode toggle to your header. Settings persist across reloads.',
//     version: '1.2.0',
//     author: 'DesignCorp',
//     icon: Moon,
//     sourceUrl: 'mock://dark-mode',
//   },
//   {
//     id: 'team-chat',
//     name: 'Team Presence',
//     description: 'See simulated online status directly in your sidebar.',
//     version: '0.9.5',
//     author: 'SlackClone',
//     icon: Box,
//     sourceUrl: 'mock://team-chat',
//   },
//   {
//     id: 'analytics-logger',
//     name: 'BG Analytics',
//     description: 'Tracks navigation events in the background and notifies you.',
//     version: '2.0.0',
//     author: 'DataInc',
//     icon: Activity,
//     sourceUrl: 'mock://analytics',
//   },
//   {
//     id: 'crypto-ticker',
//     name: 'Crypto Widget',
//     description:
//       'Live simulated Bitcoin price on your dashboard, styled with custom CSS.',
//     version: '1.0.1',
//     author: 'FinTech',
//     icon: Activity,
//     sourceUrl: 'mock://crypto',
//   },
// ]

// // ==========================================
// // 3. THE RUNTIME ENGINE & PROVIDER
// // ==========================================

// interface SystemContextType {
//   installedPlugins: InstalledPlugin[]
//   install: (plugin: PluginManifest) => Promise<void>
//   uninstall: (id: string) => void
//   slots: Record<SlotName, { id: string; Component: React.FC }[]>
//   emit: (event: string, data: any) => void
//   addToast: (message: string, type: ToastType) => void
// }

// const SystemContext = createContext<SystemContextType | null>(null)
// const useSystem = () => {
//   const context = useContext(SystemContext)
//   if (!context) throw new Error('SystemContext not found')
//   return context
// }

// // Key format for local storage files
// const PLUGIN_KEY = 'nexus-os-plugins'
// const FILE_KEY = (id: string, filename: string) =>
//   `nexus-os-file:${id}/${filename}`
// const MANIFEST_KEY = (id: string) => `nexus-os-manifest:${id}`

// const SystemProvider: React.FC<{ children: React.ReactNode }> = ({
//   children,
// }) => {
//   const [installedPlugins, setInstalledPlugins] = useState<InstalledPlugin[]>(
//     []
//   )
//   const [slots, setSlots] = useState<
//     Record<SlotName, { id: string; Component: React.FC }[]>
//   >({
//     header_action: [],
//     sidebar_nav: [],
//     dashboard_widget: [],
//     global_background: [],
//   })
//   const [toasts, setToasts] = useState<ToastMessage[]>([])

//   const eventListeners = useRef<Record<string, ((data: any) => void)[]>>({})
//   const activeCleanupFunctions = useRef<Record<string, () => void>>({})
//   const activeStyleTags = useRef<Record<string, HTMLStyleElement>>({}) // Track injected CSS

//   const addToast = useCallback((message: string, type: ToastType = 'info') => {
//     const newToast: ToastMessage = { id: Date.now(), message, type }
//     setToasts((prev) => [...prev, newToast])
//     setTimeout(() => {
//       setToasts((prev) => prev.filter((t) => t.id !== newToast.id))
//     }, 5000)
//   }, [])

//   const clearPluginUI = (id: string) => {
//     // 1. Remove style tags
//     if (activeStyleTags.current[id]) {
//       activeStyleTags.current[id].remove()
//       delete activeStyleTags.current[id]
//     }

//     // 2. Remove React components
//     setSlots((prev) => {
//       const next = { ...prev }
//       ;(Object.keys(next) as SlotName[]).forEach((key) => {
//         next[key] = next[key].filter((item) => !item.id.startsWith(id))
//       })
//       return next
//     })
//   }

//   const clearPluginEvents = (id: string) => {
//     // Run plugin cleanup function
//     if (activeCleanupFunctions.current[id]) {
//       activeCleanupFunctions.current[id]()
//       delete activeCleanupFunctions.current[id]
//     }
//   }

//   // --- Core Plugin Runner ---
//   const runPlugin = useCallback(
//     (
//       id: string,
//       fileManifest: PluginFileManifest,
//       fileContents: Record<string, string>
//     ) => {
//       const { mainScript, styles } = fileManifest

//       // 1. Inject Styles
//       if (styles.length > 0) {
//         const cssContent = styles
//           .map((file) => fileContents[file] || '')
//           .join('\n')
//         if (cssContent) {
//           const styleTag = document.createElement('style')
//           styleTag.textContent = cssContent
//           styleTag.id = `plugin-style-${id}`
//           document.head.appendChild(styleTag)
//           activeStyleTags.current[id] = styleTag
//         }
//       }

//       // 2. Execute Main Script
//       const mainJsCode = fileContents[mainScript]
//       if (!mainJsCode) {
//         throw new Error(
//           `Main script '${mainScript}' not found in plugin files.`
//         )
//       }

//       // Create the API bridge
//       const api: PluginAPI = {
//         render: (slot, compId, Component) => {
//           setSlots((prev) => ({
//             ...prev,
//             [slot]: [
//               ...(prev[slot] || []),
//               { id: `${id}-${compId}`, Component },
//             ],
//           }))
//         },
//         on: (evt, cb) => {
//           if (!eventListeners.current[evt]) eventListeners.current[evt] = []
//           eventListeners.current[evt].push(cb)
//         },
//         notify: (msg, type = 'info') => addToast(msg, type),
//         storage: {
//           get: (key) => localStorage.getItem(`${id}:${key}`),
//           set: (key, val) => localStorage.setItem(`${id}:${key}`, val),
//         },
//       }

//       // The Sandbox execution
//       try {
//         const h = React.createElement
//         const Icons = { Moon, Sun, Box, Activity, Bell, Info }
//         // Pass the React object itself so plugins can use { useState, useEffect } = React
//         const factory = new Function('React', 'h', 'Icons', 'api', mainJsCode)
//         const cleanupFn = factory(React, h, Icons, api)

//         if (typeof cleanupFn === 'function') {
//           activeCleanupFunctions.current[id] = cleanupFn
//         }
//       } catch (e: any) {
//         addToast(`Plugin ${id} failed to run: ${e.message}`, 'error')
//         console.error(`Failed to run plugin ${id}`, e)
//       }
//     },
//     [addToast]
//   )

//   // --- Installation Process (Fetch + Persist) ---
//   const install = useCallback(
//     async (manifest: PluginManifest) => {
//       const id = manifest.id
//       addToast(`Starting download for '${manifest.name}'...`, 'info')

//       // 1. Fetch main.json (Manifest)
//       await new Promise((r) => setTimeout(r, 500)) // Simulate initial network delay
//       const manifestContent = MOCK_CLOUD_FILES[`${id}/main.json`]

//       if (!manifestContent) {
//         addToast(
//           `Error: Could not find manifest file for '${manifest.name}'.`,
//           'error'
//         )
//         return
//       }
//       const fileManifest: PluginFileManifest = JSON.parse(manifestContent)

//       // 2. Fetch all required files
//       const filesToFetch = [fileManifest.mainScript, ...fileManifest.styles]
//       const fileContents: Record<string, string> = {}
//       let allSucceeded = true

//       for (const filename of filesToFetch) {
//         const content = MOCK_CLOUD_FILES[`${id}/${filename}`]
//         if (content) {
//           fileContents[filename] = content
//           // 3. Persist individual file content
//           localStorage.setItem(FILE_KEY(id, filename), content)
//         } else {
//           addToast(
//             `Error: Missing file '${filename}' for plugin '${manifest.name}'.`,
//             'error'
//           )
//           allSucceeded = false
//         }
//       }

//       if (!allSucceeded) return

//       // 4. Persist plugin manifest and details
//       localStorage.setItem(MANIFEST_KEY(id), manifestContent) // Save the file manifest

//       const newPlugin = { ...manifest, active: true }
//       const updatedList = [
//         ...installedPlugins.filter((p) => p.id !== id),
//         newPlugin,
//       ]

//       setInstalledPlugins(updatedList)
//       localStorage.setItem(PLUGIN_KEY, JSON.stringify(updatedList))

//       // 5. Run the plugin immediately after successful download
//       try {
//         runPlugin(id, fileManifest, fileContents)
//         addToast(`Plugin '${manifest.name}' installed successfully.`, 'success')
//       } catch (e) {
//         // runPlugin already handles toast for its error
//         console.error(e)
//       }
//     },
//     [installedPlugins, runPlugin, addToast]
//   )

//   // --- Uninstallation Process (Cleanup + Unpersist) ---
//   const uninstall = useCallback(
//     (id: string) => {
//       // 1. Run cleanup functions (removes styles, components, and listeners)
//       clearPluginUI(id)
//       clearPluginEvents(id)

//       // 2. Remove files from local storage
//       const manifestContent = localStorage.getItem(MANIFEST_KEY(id))
//       if (manifestContent) {
//         try {
//           const fileManifest: PluginFileManifest = JSON.parse(manifestContent)
//           const filesToRemove = [
//             fileManifest.mainScript,
//             ...fileManifest.styles,
//           ]
//           filesToRemove.forEach((filename) => {
//             localStorage.removeItem(FILE_KEY(id, filename))
//           })
//           localStorage.removeItem(MANIFEST_KEY(id))
//         } catch (e) {
//           console.warn(`Could not parse manifest for cleanup: ${id}`, e)
//         }
//       }

//       // 3. Update state and persistence
//       const updatedList = installedPlugins.filter((p) => p.id !== id)
//       setInstalledPlugins(updatedList)
//       localStorage.setItem(PLUGIN_KEY, JSON.stringify(updatedList))

//       const manifest = MARKETPLACE_LIST.find((p) => p.id === id)
//       addToast(
//         `Plugin '${manifest?.name || id}' uninstalled and local files removed.`,
//         'info'
//       )
//     },
//     [installedPlugins, addToast]
//   )

//   // Handle Event Emitting
//   const emit = useCallback((event: string, data: any) => {
//     ;(eventListeners.current[event] || []).forEach((cb) => {
//       setTimeout(() => cb(data), 0)
//     })
//   }, [])

//   // --- Hydration Effect (Offline Loading) ---
//   useEffect(() => {
//     const saved = localStorage.getItem(PLUGIN_KEY)
//     if (saved) {
//       try {
//         const parsedPlugins: InstalledPlugin[] = JSON.parse(saved)
//         setInstalledPlugins(parsedPlugins)

//         // Re-run the code for all persisted plugins
//         parsedPlugins.forEach((plugin) => {
//           const id = plugin.id
//           const manifestContent = localStorage.getItem(MANIFEST_KEY(id))

//           if (manifestContent) {
//             try {
//               const fileManifest: PluginFileManifest =
//                 JSON.parse(manifestContent)
//               const filesToLoad = [
//                 fileManifest.mainScript,
//                 ...fileManifest.styles,
//               ]
//               const fileContents: Record<string, string> = {}
//               let allFilesFound = true

//               filesToLoad.forEach((filename) => {
//                 const content = localStorage.getItem(FILE_KEY(id, filename))
//                 if (content) {
//                   fileContents[filename] = content
//                 } else {
//                   console.error(
//                     `File ${filename} missing for persisted plugin ${id}`
//                   )
//                   allFilesFound = false
//                 }
//               })

//               if (allFilesFound) {
//                 runPlugin(id, fileManifest, fileContents)
//               }
//             } catch (e) {
//               console.error(`Failed to parse manifest for ${id}`, e)
//             }
//           }
//         })
//       } catch (e) {
//         console.error('Failed to load plugins from storage', e)
//       }
//     }
//   }, [runPlugin, addToast])

//   return (
//     <SystemContext.Provider
//       value={{ installedPlugins, install, uninstall, slots, emit, addToast }}>
//       {children}
//       <ToastContainer
//         setToasts={setToasts}
//         toasts={toasts}
//       />
//     </SystemContext.Provider>
//   )
// }

// // ==========================================
// // 4. UI COMPONENTS (The "OS" Shell)
// // ==========================================

// // --- Toast Notification System ---
// const Toast: React.FC<ToastMessage & { onClose: (id: number) => void }> = ({
//   id,
//   message,
//   type,
//   onClose,
// }) => {
//   const colorMap = {
//     info: 'bg-blue-500',
//     error: 'bg-red-500',
//     success: 'bg-emerald-500',
//   }

//   const IconMap = {
//     info: Info,
//     error: AlertCircle,
//     success: CheckCircle,
//   }

//   const Icon = IconMap[type] || Info

//   return (
//     <div
//       className={`flex items-center justify-between p-4 mb-2 text-white rounded-lg shadow-lg transform translate-x-0 transition-all duration-300 ${colorMap[type]}`}
//       role="alert">
//       <div className="flex items-center">
//         <Icon
//           className="mr-3 flex-shrink-0"
//           size={20}
//         />
//         <span className="text-sm font-medium">{message}</span>
//       </div>
//       <button
//         className="ml-4 p-1 rounded-full hover:bg-white hover:bg-opacity-20 transition-colors"
//         onClick={() => onClose(id)}>
//         <X size={16} />
//       </button>
//     </div>
//   )
// }

// const ToastContainer: React.FC<{
//   toasts: ToastMessage[]
//   setToasts: React.Dispatch<React.SetStateAction<ToastMessage[]>>
// }> = ({ toasts, setToasts }) => {
//   const handleClose = (id: number) => {
//     setToasts((prev) => prev.filter((t) => t.id !== id))
//   }

//   return (
//     <div className="fixed bottom-4 right-4 z-50 w-full max-w-xs">
//       {toasts.map((toast) => (
//         <Toast
//           key={toast.id}
//           {...toast}
//           onClose={handleClose}
//         />
//       ))}
//     </div>
//   )
// }

// // --- Slot Renderer ---
// const ExtensionSlot: React.FC<{ name: SlotName; className?: string }> = ({
//   name,
//   className,
// }) => {
//   const { slots } = useSystem()
//   const components = slots[name] || []

//   if (components.length === 0) return null

//   return (
//     <div className={className}>
//       {components.map((item, i) => (
//         <item.Component key={item.id || i} />
//       ))}
//     </div>
//   )
// }

// // --- Marketplace UI ---
// const MarketplaceCard: React.FC<{ plugin: PluginManifest }> = ({ plugin }) => {
//   const { installedPlugins, install, uninstall } = useSystem()
//   const [loading, setLoading] = useState(false)

//   const isInstalled = installedPlugins.some((p) => p.id === plugin.id)

//   const handleAction = async () => {
//     setLoading(true)
//     try {
//       if (isInstalled) {
//         uninstall(plugin.id)
//       } else {
//         await install(plugin)
//       }
//     } finally {
//       setLoading(false)
//     }
//   }

//   return (
//     <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col h-full">
//       <div className="flex items-start justify-between mb-4">
//         <div className="p-3 bg-indigo-50 text-indigo-600 rounded-lg">
//           <plugin.icon size={24} />
//         </div>
//         {isInstalled && (
//           <CheckCircle
//             className="text-emerald-500"
//             size={20}
//           />
//         )}
//       </div>
//       <h3 className="font-bold text-slate-900">{plugin.name}</h3>
//       <p className="text-slate-500 text-sm mt-2 flex-1">{plugin.description}</p>

//       <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between">
//         <span className="text-xs text-slate-400">
//           v{plugin.version} • {plugin.author}
//         </span>
//         <button
//           className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
//             isInstalled
//               ? 'bg-red-50 text-red-600 hover:bg-red-100'
//               : 'bg-slate-900 text-white hover:bg-slate-800 shadow-sm shadow-slate-300'
//           }`}
//           disabled={loading}
//           onClick={handleAction}>
//           {loading ? (
//             <span className="animate-spin w-4 h-4 border-2 border-current border-t-transparent rounded-full" />
//           ) : isInstalled ? (
//             <>
//               <Trash2 size={16} /> Uninstall
//             </>
//           ) : (
//             <>
//               <Download size={16} /> Install
//             </>
//           )}
//         </button>
//       </div>
//     </div>
//   )
// }

// // --- Main App Layout ---
// const MainLayout = () => {
//   const [page, setPage] = useState<'dashboard' | 'store'>('dashboard')
//   const { installedPlugins, emit } = useSystem()

//   const navigate = (p: 'dashboard' | 'store') => {
//     setPage(p)
//     emit('navigation', p) // Notify background plugins about the navigation change
//   }

//   // Run initial navigation event
//   useEffect(() => {
//     emit('navigation', page)
//   }, [emit, page])

//   return (
//     <div className="min-h-screen bg-slate-50 flex text-slate-900 font-sans">
//       {/* SIDEBAR */}
//       <aside className="w-64 bg-slate-900 text-white flex flex-col fixed inset-y-0 z-20">
//         <div className="p-6 border-b border-slate-800 flex items-center gap-3">
//           <Layout className="text-indigo-400" />
//           <span className="font-bold text-lg tracking-tight">NexusOS</span>
//         </div>

//         <nav className="flex-1 p-4 space-y-1">
//           <button
//             className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${page === 'dashboard' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}
//             onClick={() => navigate('dashboard')}>
//             <Layout size={20} /> Dashboard
//           </button>
//           <button
//             className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${page === 'store' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}
//             onClick={() => navigate('store')}>
//             <Store size={20} /> App Store ({MARKETPLACE_LIST.length})
//           </button>
//         </nav>

//         {/* PLUGIN SLOT: SIDEBAR */}
//         <ExtensionSlot
//           className="px-4 pb-4 flex flex-col"
//           name="sidebar_nav"
//         />
//       </aside>

//       {/* MAIN CONTENT */}
//       <main className="ml-64 flex-1 flex flex-col min-h-screen">
//         <header className="bg-white border-b border-slate-200 h-16 flex items-center justify-between px-8 sticky top-0 z-10">
//           <div className="flex items-center gap-4 bg-slate-100 px-4 py-2 rounded-lg w-96 max-w-xs">
//             <Search
//               className="text-slate-400"
//               size={18}
//             />
//             <input
//               className="bg-transparent outline-none text-sm w-full"
//               placeholder="Search..."
//               type="text"
//             />
//           </div>

//           <div className="flex items-center gap-4">
//             {/* PLUGIN SLOT: HEADER ACTION */}
//             <ExtensionSlot
//               className="flex items-center gap-2"
//               name="header_action"
//             />

//             <button className="relative text-slate-500 hover:bg-slate-100 p-2 rounded-full">
//               <Bell size={20} />
//             </button>
//             <div className="w-8 h-8 bg-gradient-to-tr from-indigo-500 to-purple-500 rounded-full" />
//           </div>
//         </header>

//         <div className="p-8 max-w-7xl mx-auto w-full">
//           {page === 'dashboard' ? (
//             <div className="space-y-8">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <h1 className="text-2xl font-bold text-slate-900">
//                     Dashboard
//                   </h1>
//                   <p className="text-slate-500">
//                     Welcome back. {installedPlugins.length} plugins are
//                     currently active.
//                   </p>
//                 </div>
//               </div>

//               {/* PLUGIN SLOT: DASHBOARD WIDGET */}
//               <ExtensionSlot
//                 className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
//                 name="dashboard_widget"
//               />

//               <div className="bg-white rounded-xl border border-slate-200 p-8 text-center py-20">
//                 <div className="inline-flex p-4 bg-slate-50 rounded-full mb-4">
//                   <Box
//                     className="text-slate-400"
//                     size={32}
//                   />
//                 </div>
//                 <h3 className="text-lg font-medium text-slate-900">
//                   Core System Content
//                 </h3>
//                 <p className="text-slate-500 mt-2 max-w-md mx-auto">
//                   This is the base operating system. Go to the{' '}
//                   <strong>App Store</strong> to download plugins that will
//                   modify this dashboard, the sidebar, or run background tasks.
//                 </p>
//                 <button
//                   className="mt-6 px-6 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors"
//                   onClick={() => navigate('store')}>
//                   Browse Plugins
//                 </button>
//               </div>
//             </div>
//           ) : (
//             <div className="space-y-6">
//               <div>
//                 <h1 className="text-2xl font-bold text-slate-900">
//                   Plugin Marketplace
//                 </h1>
//                 <p className="text-slate-500">
//                   Discover extensions to boost your workflow.
//                 </p>
//               </div>

//               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                 {MARKETPLACE_LIST.map((plugin) => (
//                   <MarketplaceCard
//                     key={plugin.id}
//                     plugin={plugin}
//                   />
//                 ))}
//               </div>
//             </div>
//           )}
//         </div>
//       </main>
//     </div>
//   )
// }

// export default function App() {
//   return (
//     <SystemProvider>
//       <MainLayout />
//     </SystemProvider>
//   )
// }
