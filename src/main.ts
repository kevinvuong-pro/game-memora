import { gameEngine } from '@platform/bootstrap/GameEngine';

function registerServiceWorker(): void {
  if (!('serviceWorker' in navigator) || !window.isSecureContext) return;

  void navigator.serviceWorker.register('/sw.js').catch((error: unknown) => {
    console.warn('Failed to register service worker:', error);
  });
}

async function main(): Promise<void> {
  try {
    await gameEngine.bootstrap();
    registerServiceWorker();

    window.addEventListener('beforeunload', () => {
      gameEngine.destroy();
    });
  } catch (error) {
    console.error('Failed to start game platform:', error);
  }
}

main();
