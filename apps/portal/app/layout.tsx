import React from 'react';
import PageLayout from '@/components/templates/layout/PageLayout';
import Footer from '@/components/organisms/navigation/Footer';
import './globals.css';

export const metadata = {
  title: 'Tech+ UW',
  description: 'Tech+ University of Waterloo Portal',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen">
        <PageLayout>
          <div className="flex-1">
            {children}
          </div>
        </PageLayout>
        <Footer />
      </body>
    </html>
  );
}
