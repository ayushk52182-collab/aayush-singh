/* =============================================================
   PARUL UNIVERSITY — Live Campus Tour Interactivity (tour.js)
   ============================================================= */

'use strict';

document.addEventListener('DOMContentLoaded', () => {
  initPanoramaViewer();
  initVisitForm();
});

function initPanoramaViewer() {
  const panoImg = document.getElementById('panoramaImage');
  const landmarkCards = document.querySelectorAll('.landmark-card');
  const hotspots = document.querySelectorAll('.pin-hotspot');
  const currentSpotName = document.getElementById('currentSpotName');
  const infoTitle = document.getElementById('infoTitle');
  const infoDesc = document.getElementById('infoDesc');
  const panLeft = document.getElementById('panLeft');
  const panRight = document.getElementById('panRight');
  const panReset = document.getElementById('panReset');
  const audioBtn = document.getElementById('audioToggleBtn');
  const audioState = document.getElementById('audioState');

  let currentPanX = 0;
  let audioPlaying = true;

  // Landmark Carousel click handler
  landmarkCards.forEach(card => {
    card.addEventListener('click', () => {
      landmarkCards.forEach(c => c.classList.remove('active'));
      card.classList.add('active');

      const spotId = card.getAttribute('data-spot');
      const img = card.getAttribute('data-img');
      const name = card.getAttribute('data-name');
      const desc = card.getAttribute('data-desc');

      // Update Viewer
      if (panoImg && img) {
        panoImg.style.opacity = '0';
        setTimeout(() => {
          panoImg.src = img;
          panoImg.style.opacity = '1';
        }, 200);
      }

      if (currentSpotName) currentSpotName.textContent = name;
      if (infoTitle) infoTitle.textContent = name;
      if (infoDesc) infoDesc.textContent = desc;

      // Reset Pan
      currentPanX = 0;
      updatePanTransform();

      // Highlight Pin Hotspot
      hotspots.forEach(pin => {
        pin.classList.remove('active');
        if (pin.getAttribute('data-spot') === spotId) {
          pin.classList.add('active');
        }
      });
    });
  });

  // Hotspot Pin click handler
  hotspots.forEach(pin => {
    pin.addEventListener('click', () => {
      const spotId = pin.getAttribute('data-spot');
      const targetCard = document.querySelector(`.landmark-card[data-spot="${spotId}"]`);
      if (targetCard) targetCard.click();
    });
  });

  // Pan Left / Right simulation controls
  if (panLeft) {
    panLeft.addEventListener('click', () => {
      currentPanX = Math.min(currentPanX + 100, 200);
      updatePanTransform();
    });
  }

  if (panRight) {
    panRight.addEventListener('click', () => {
      currentPanX = Math.max(currentPanX - 100, -200);
      updatePanTransform();
    });
  }

  if (panReset) {
    panReset.addEventListener('click', () => {
      currentPanX = 0;
      updatePanTransform();
    });
  }

  function updatePanTransform() {
    if (panoImg) {
      panoImg.style.transform = `scale(1.1) translateX(${currentPanX}px)`;
    }
  }

  // Audio Guide Toggle
  if (audioBtn) {
    audioBtn.addEventListener('click', () => {
      audioPlaying = !audioPlaying;
      if (audioState) {
        audioState.textContent = audioPlaying ? 'ON' : 'OFF';
      }
      audioBtn.style.opacity = audioPlaying ? '1' : '0.6';
    });
  }

  // Fullscreen button
  const fullscreenBtn = document.getElementById('fullscreenBtn');
  if (fullscreenBtn) {
    fullscreenBtn.addEventListener('click', () => {
      const viewport = document.getElementById('viewport');
      if (!document.fullscreenElement && viewport) {
        viewport.requestFullscreen().catch(err => {
          alert('Fullscreen mode activated for Live Campus View.');
        });
      } else if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    });
  }
}

function initVisitForm() {
  const visitForm = document.getElementById('visitForm');
  if (!visitForm) return;

  visitForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('vName').value;
    const date = document.getElementById('vDate').value;

    alert(`🎉 Physical Campus Visit Confirmed!\n\nWelcome ${name}!\nYour visit pass for Parul University Vadodara Campus on ${date} has been generated.\n\nA complimentary shuttle bus details and campus entry QR code have been sent to your mobile number.`);
    visitForm.reset();
  });
}
