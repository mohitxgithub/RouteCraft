'use client'; // Keep this for client-side behavior

import { Inter } from 'next/font/google';
import './globals.css';
import { useEffect } from 'react';

const inter = Inter({ subsets: ['latin'] });

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    // Inject the chatbot script when the component mounts
    const script = document.createElement('script');
    script.innerHTML = ` 
      !function(w, d, s, ...args){
        var div = d.createElement('div');
        div.id = 'aichatbot';
        d.body.appendChild(div);
        w.chatbotConfig = args;
        var f = d.getElementsByTagName(s)[0],
        j = d.createElement(s);
        j.defer = true;
        j.type = 'module';
        j.src = 'https://aichatbot.sendbird.com/index.js';
        f.parentNode.insertBefore(j, f);
      }(window, document, 'script', '91E0DE82-D45B-496C-BB44-935AAF75836E', 'AF9O3XWY5xaa7Sk__rw8z', {
        apiHost: 'https://api-cf-us-1.sendbird.com',
      });
    `;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <html lang="en">
      <head>
        {/* Provide multiple favicon sizes */}
        
        <link rel="icon" href="/image/routecraftlogo.png" sizes="80x80" />
        
        
        <title>RouteCraft - Customize Your Travel Itinerary</title>
        <meta name="description" content="Craft your perfect journey with personalized travel itineraries" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
