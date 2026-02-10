import React from 'react';

export default function NotFound() {
  return (
    <html>
      <body style={{ margin: 0, padding: 0, fontFamily: 'system-ui, sans-serif' }}>
        <div style={{ 
          minHeight: '100vh', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          backgroundColor: '#050a1f',
          padding: '1rem'
        }}>
          <div style={{ textAlign: 'center' }}>
            <h1 style={{ fontSize: '4rem', fontWeight: 'bold', color: 'white', marginBottom: '0.5rem' }}>
              404
            </h1>
            <p style={{ color: 'rgba(255, 255, 255, 0.8)', marginBottom: '1.5rem' }}>
              Page not found
            </p>
            <a
              href="/"
              style={{
                display: 'inline-block',
                padding: '0.75rem 1.5rem',
                borderRadius: '0.5rem',
                fontWeight: '500',
                color: 'white',
                backgroundColor: '#76a36d',
                textDecoration: 'none'
              }}
            >
              Go home
            </a>
          </div>
        </div>
      </body>
    </html>
  );
}
