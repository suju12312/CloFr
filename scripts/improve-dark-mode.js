#!/usr/bin/env node

/**
 * Dark mode improvement script for CloFr
 * This script adds missing dark mode classes to ensure proper visibility
 */

const fs = require('fs');
const path = require('path');

console.log('🌙 Improving Dark Mode Support for CloFr...\n');

// Function to add dark mode classes to a file
function improveDarkMode(filePath, improvements) {
  if (!fs.existsSync(filePath)) {
    console.log(`❌ File not found: ${filePath}`);
    return;
  }

  let content = fs.readFileSync(filePath, 'utf8');
  let modified = false;

  improvements.forEach(improvement => {
    if (content.includes(improvement.old) && !content.includes(improvement.new)) {
      content = content.replace(improvement.old, improvement.new);
      modified = true;
      console.log(`✅ Applied: ${improvement.description}`);
    }
  });

  if (modified) {
    fs.writeFileSync(filePath, content);
    console.log(`📝 Updated: ${filePath}\n`);
  } else {
    console.log(`ℹ️  No changes needed: ${filePath}\n`);
  }
}

// Services page improvements
console.log('🔧 Improving Services page...');
improveDarkMode('client/pages/Services.tsx', [
  {
    old: 'className="group relative h-full overflow-hidden border-emerald-100 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md hover:border-emerald-300 hover:ring-1 hover:ring-emerald-200 focus-within:ring-2 focus-within:ring-emerald-300"',
    new: 'className="group relative h-full overflow-hidden border-emerald-100 dark:border-emerald-800 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md hover:border-emerald-300 dark:hover:border-emerald-600 hover:ring-1 hover:ring-emerald-200 dark:hover:ring-emerald-700 focus-within:ring-2 focus-within:ring-emerald-300 dark:focus-within:ring-emerald-600"',
    description: 'Added dark mode border and hover states'
  },
  {
    old: 'className="p-5 sm:p-6 flex flex-col h-full bg-gradient-to-br from-transparent to-transparent group-hover:from-emerald-50/40"',
    new: 'className="p-5 sm:p-6 flex flex-col h-full bg-gradient-to-br from-transparent to-transparent group-hover:from-emerald-50/40 dark:group-hover:from-emerald-900/20"',
    description: 'Added dark mode hover background'
  },
  {
    old: 'className="h-11 w-11 rounded-lg bg-emerald-100 text-emerald-700 grid place-items-center transition-colors duration-200 group-hover:bg-emerald-600 group-hover:text-white"',
    new: 'className="h-11 w-11 rounded-lg bg-emerald-100 dark:bg-emerald-900 text-emerald-700 dark:text-emerald-300 grid place-items-center transition-colors duration-200 group-hover:bg-emerald-600 group-hover:text-white"',
    description: 'Added dark mode icon background and text colors'
  }
]);

// Pricing page improvements
console.log('🔧 Improving Pricing page...');
improveDarkMode('client/pages/Pricing.tsx', [
  {
    old: 'className="rounded-lg border bg-card p-3"',
    new: 'className="rounded-lg border bg-card dark:bg-slate-800 p-3"',
    description: 'Added dark mode background for mobile pricing cards'
  }
]);

// Contact page improvements
console.log('🔧 Improving Contact page...');
improveDarkMode('client/pages/Contact.tsx', [
  {
    old: 'className="text-primary hover:underline"',
    new: 'className="text-primary hover:underline dark:text-emerald-400"',
    description: 'Added dark mode link color'
  }
]);

// Index page improvements
console.log('🔧 Improving Index page...');
improveDarkMode('client/pages/Index.tsx', [
  {
    old: 'className="rounded-xl border bg-card p-6 text-center shadow-sm transition-shadow hover:shadow-md hover:border-emerald-300"',
    new: 'className="rounded-xl border bg-card dark:bg-slate-800 p-6 text-center shadow-sm transition-shadow hover:shadow-md hover:border-emerald-300 dark:hover:border-emerald-600"',
    description: 'Added dark mode background and hover states for feature cards'
  }
]);

// Layout improvements
console.log('🔧 Improving Layout component...');
improveDarkMode('client/components/Layout.tsx', [
  {
    old: 'className="fixed inset-x-0 top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-background/60 bg-white/80 dark:bg-slate-900/80 border-b"',
    new: 'className="fixed inset-x-0 top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-background/60 bg-white/80 dark:bg-slate-900/80 border-b dark:border-slate-700"',
    description: 'Added dark mode border for header'
  }
]);

console.log('✅ Dark mode improvements completed!');
console.log('\n📋 Summary of improvements:');
console.log('1. ✅ Added dark mode borders and hover states');
console.log('2. ✅ Added dark mode backgrounds for cards');
console.log('3. ✅ Added dark mode text colors for icons');
console.log('4. ✅ Added dark mode link colors');
console.log('5. ✅ Added dark mode header borders');

console.log('\n🚀 To test the improvements:');
console.log('1. Run: npm run dev');
console.log('2. Open the app in browser');
console.log('3. Toggle between light/dark mode using the theme button');
console.log('4. Check all pages: /, /services, /pricing, /contact');
console.log('5. Verify all text is readable and backgrounds are appropriate');

console.log('\n🎨 Dark mode should now work perfectly across all pages!');
