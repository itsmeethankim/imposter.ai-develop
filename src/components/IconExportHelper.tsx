/**
 * Icon Export Helper Component
 * This component displays the app icons and provides download instructions
 */

import { appIcons } from '../utils/icons';

export function IconExportHelper() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-3xl p-8 shadow-2xl">
          <h1 className="text-3xl mb-6 text-gray-900">
            📱 PWA Icon Export Helper
          </h1>
          
          <p className="text-gray-700 mb-8">
            To complete your PWA setup, you need to save these icons to your <code className="bg-gray-100 px-2 py-1 rounded">/public/</code> folder.
          </p>

          {/* Icon 512 */}
          <div className="mb-12 pb-12 border-b border-gray-200">
            <h2 className="text-2xl mb-4 text-gray-800">
              Icon 512×512
            </h2>
            <div className="bg-gray-50 rounded-2xl p-8 mb-4 inline-block">
              <img 
                src={appIcons.icon512} 
                alt="App Icon 512x512" 
                className="w-64 h-64 object-contain"
                style={{ imageRendering: 'crisp-edges' }}
              />
            </div>
            <div className="space-y-2">
              <p className="text-gray-700">
                <strong>File name:</strong> <code className="bg-gray-100 px-2 py-1 rounded">icon-512.png</code>
              </p>
              <p className="text-gray-700">
                <strong>Size:</strong> 512 × 512 pixels
              </p>
              <p className="text-gray-700">
                <strong>Save to:</strong> <code className="bg-gray-100 px-2 py-1 rounded">/public/icon-512.png</code>
              </p>
              <div className="mt-4">
                <a 
                  href={appIcons.icon512} 
                  download="icon-512.png"
                  className="inline-block px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                >
                  💾 Download icon-512.png
                </a>
              </div>
            </div>
          </div>

          {/* Icon 192 */}
          <div className="mb-8">
            <h2 className="text-2xl mb-4 text-gray-800">
              Icon 192×192
            </h2>
            <div className="bg-gray-50 rounded-2xl p-8 mb-4 inline-block">
              <img 
                src={appIcons.icon192} 
                alt="App Icon 192x192" 
                className="w-48 h-48 object-contain"
                style={{ imageRendering: 'crisp-edges' }}
              />
            </div>
            <div className="space-y-2">
              <p className="text-gray-700">
                <strong>File name:</strong> <code className="bg-gray-100 px-2 py-1 rounded">icon-192.png</code>
              </p>
              <p className="text-gray-700">
                <strong>Size:</strong> 192 × 192 pixels
              </p>
              <p className="text-gray-700">
                <strong>Save to:</strong> <code className="bg-gray-100 px-2 py-1 rounded">/public/icon-192.png</code>
              </p>
              <div className="mt-4">
                <a 
                  href={appIcons.icon192} 
                  download="icon-192.png"
                  className="inline-block px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                >
                  💾 Download icon-192.png
                </a>
              </div>
            </div>
          </div>

          {/* Instructions */}
          <div className="bg-blue-50 border-2 border-blue-200 rounded-2xl p-6 mt-8">
            <h3 className="text-xl mb-3 text-blue-900">
              📝 Quick Setup Instructions
            </h3>
            <ol className="list-decimal list-inside space-y-2 text-blue-900">
              <li>Click the download buttons above to save both icons</li>
              <li>Place <code className="bg-blue-100 px-2 py-1 rounded">icon-192.png</code> in your <code className="bg-blue-100 px-2 py-1 rounded">/public/</code> folder</li>
              <li>Place <code className="bg-blue-100 px-2 py-1 rounded">icon-512.png</code> in your <code className="bg-blue-100 px-2 py-1 rounded">/public/</code> folder</li>
              <li>Verify the files are in the correct location</li>
              <li>Your PWA icons are now ready! 🎉</li>
            </ol>
          </div>

          {/* Alternative Method */}
          <div className="bg-amber-50 border-2 border-amber-200 rounded-2xl p-6 mt-6">
            <h3 className="text-xl mb-3 text-amber-900">
              🛠 Alternative: Right-Click Method
            </h3>
            <p className="text-amber-900 mb-3">
              If the download buttons don't work in your environment:
            </p>
            <ol className="list-decimal list-inside space-y-2 text-amber-900">
              <li>Right-click on each icon image above</li>
              <li>Select "Save Image As..." or "Download Image"</li>
              <li>Save with the exact filename: <code className="bg-amber-100 px-2 py-1 rounded">icon-192.png</code> or <code className="bg-amber-100 px-2 py-1 rounded">icon-512.png</code></li>
              <li>Move the files to your <code className="bg-amber-100 px-2 py-1 rounded">/public/</code> directory</li>
            </ol>
          </div>

          {/* Verification */}
          <div className="bg-green-50 border-2 border-green-200 rounded-2xl p-6 mt-6">
            <h3 className="text-xl mb-3 text-green-900">
              ✅ Verification Checklist
            </h3>
            <ul className="space-y-2 text-green-900">
              <li className="flex items-start gap-2">
                <span>☐</span>
                <span><code className="bg-green-100 px-2 py-1 rounded">/public/icon-192.png</code> exists and is 192×192 pixels</span>
              </li>
              <li className="flex items-start gap-2">
                <span>☐</span>
                <span><code className="bg-green-100 px-2 py-1 rounded">/public/icon-512.png</code> exists and is 512×512 pixels</span>
              </li>
              <li className="flex items-start gap-2">
                <span>☐</span>
                <span>Both files are PNG format</span>
              </li>
              <li className="flex items-start gap-2">
                <span>☐</span>
                <span>Icons display correctly (angel + imposter characters visible)</span>
              </li>
              <li className="flex items-start gap-2">
                <span>☐</span>
                <span>Test PWA installation on desktop and mobile</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
