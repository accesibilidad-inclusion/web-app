window.addEventListener('beforeinstallprompt', (evt) => {
  deferredInstallPrompt = evt;
  installButton.removeAttribute('hidden');
  deferredInstallPrompt.prompt();
  evt.srcElement.setAttribute('hidden', true);
});
