/**
 * Clutch Code - Main Client Script
 * Progressive enhancement, mechanical "click-lock" interactions, live counter demo
 */
(function() {
  'use strict';

  // Check prefers-reduced-motion
  var motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  var prefersReducedMotion = motionQuery.matches;
  motionQuery.addEventListener('change', function(e) {
    prefersReducedMotion = e.matches;
  });

  /* ==========================================================================
     1. MOBILE MENU
     ========================================================================== */
  var btn = document.getElementById('menuBtn');
  var menu = document.getElementById('mobileMenu');
  var isOpen = false;

  function setMenu(state) {
    isOpen = state;
    if (btn) {
      btn.classList.toggle('is-open', state);
      btn.setAttribute('aria-expanded', state ? 'true' : 'false');
    }
    if (menu) {
      menu.classList.toggle('is-open', state);
      menu.setAttribute('aria-hidden', state ? 'false' : 'true');
    }
    document.body.classList.toggle('menu-open', state);
  }

  if (btn && menu) {
    btn.addEventListener('click', function() {
      setMenu(!isOpen);
    });

    var menuLinks = menu.querySelectorAll('a');
    for (var i = 0; i < menuLinks.length; i++) {
      menuLinks[i].addEventListener('click', function() {
        setMenu(false);
      });
    }

    window.addEventListener('resize', function() {
      if (window.innerWidth > 860 && isOpen) {
        setMenu(false);
      }
    });

    window.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && isOpen) {
        setMenu(false);
        btn.focus();
      }
    });
  }

  /* ==========================================================================
     1.B SEAMLESS GAPLESS DUAL-VIDEO CROSSFADER
     ========================================================================== */
  var vidA = document.getElementById('heroVidA');
  var vidB = document.getElementById('heroVidB');

  if (vidA && vidB) {
    var activeVid = vidA;
    var inactiveVid = vidB;
    var crossfadeThreshold = 0.6; // Start crossfading 600ms before current clip ends
    var isFading = false;

    function handleTimeUpdate() {
      if (!activeVid.duration || isFading) return;
      var remaining = activeVid.duration - activeVid.currentTime;

      if (remaining <= crossfadeThreshold) {
        isFading = true;
        inactiveVid.currentTime = 0;
        var playPromise = inactiveVid.play();
        if (playPromise !== undefined) {
          playPromise.then(function() {
            // Swap active visibility layers seamlessly
            inactiveVid.classList.add('active');
            activeVid.classList.remove('active');

            setTimeout(function() {
              activeVid.pause();
              activeVid.currentTime = 0;
              // Swap references
              var temp = activeVid;
              activeVid = inactiveVid;
              inactiveVid = temp;
              isFading = false;
            }, 550);
          }).catch(function() {
            isFading = false;
          });
        }
      }
    }

    vidA.addEventListener('timeupdate', function() {
      if (activeVid === vidA) handleTimeUpdate();
    });

    vidB.addEventListener('timeupdate', function() {
      if (activeVid === vidB) handleTimeUpdate();
    });
  }

  /* Audio detent synthesizer via Web Audio API */
  var audioCtx = null;
  function playDetentSound(pitch) {
    if (prefersReducedMotion) return;
    try {
      if (!audioCtx) {
        var AudioContextClass = window.AudioContext || window.webkitAudioContext;
        if (AudioContextClass) audioCtx = new AudioContextClass();
      }
      if (audioCtx && audioCtx.state === 'suspended') {
        audioCtx.resume();
      }
      if (!audioCtx) return;

      var osc = audioCtx.createOscillator();
      var gain = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(pitch || 620, audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(140, audioCtx.currentTime + 0.015);
      
      gain.gain.setValueAtTime(0.04, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.018);

      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.02);
    } catch(e) {
      // Audio not supported or blocked by policy
    }
  }

  /* ==========================================================================
     2. HOME CONSOLE (ROTATING TABS & SIGNATURE SNAP)
     ========================================================================== */
  var consoleEl = document.querySelector('.console');
  var tabs = Array.prototype.slice.call(document.querySelectorAll('.tab-btn'));
  var panels = Array.prototype.slice.call(document.querySelectorAll('.panel'));

  if (tabs.length && panels.length) {
    var cur = 0;
    var timer = null;
    var isPaused = false;

    var setTab = function(index) {
      cur = index;
      tabs.forEach(function(b) {
        var match = parseInt(b.dataset.tab, 10) === index;
        b.classList.toggle('active', match);
        b.setAttribute('aria-selected', match ? 'true' : 'false');
      });
      panels.forEach(function(p) {
        var match = parseInt(p.dataset.panel, 10) === index;
        p.classList.toggle('active', match);
        p.setAttribute('aria-hidden', match ? 'false' : 'true');
      });

      playDetentSound(580 + (index * 80));
    };

    var startTimer = function() {
      if (timer) clearInterval(timer);
      if (prefersReducedMotion) return;
      timer = setInterval(function() {
        if (!isPaused) {
          setTab((cur + 1) % tabs.length);
        }
      }, 4000);
    };

    tabs.forEach(function(b) {
      b.addEventListener('click', function() {
        setTab(parseInt(b.dataset.tab, 10));
        startTimer();
      });
    });

    if (consoleEl) {
      consoleEl.addEventListener('mouseenter', function() { isPaused = true; });
      consoleEl.addEventListener('mouseleave', function() { isPaused = false; });
      consoleEl.addEventListener('focusin', function() { isPaused = true; });
      consoleEl.addEventListener('focusout', function() { isPaused = false; });
    }

    startTimer();

    // Render marketing bars
    var row = document.getElementById('barRow');
    if (row && row.children.length === 0) {
      var heights = [21, 29, 25, 36, 32, 44, 52];
      heights.forEach(function(h) {
        var d = document.createElement('div');
        d.className = 'bar';
        d.style.height = h + 'px';
        d.setAttribute('role', 'img');
        d.setAttribute('aria-label', 'Bar value ' + h);
        row.appendChild(d);
      });
    }
  }

  /* ==========================================================================
     3. WORK FILTER CHIPS (TOGGLE RAIL WITH RE-FLOW)
     ========================================================================== */
  var filterChips = Array.prototype.slice.call(document.querySelectorAll('[data-filter]'));
  var projectCards = Array.prototype.slice.call(document.querySelectorAll('[data-cats]'));

  if (filterChips.length && projectCards.length) {
    filterChips.forEach(function(chip) {
      chip.addEventListener('click', function() {
        var filter = chip.dataset.filter;
        
        // Use View Transitions API if supported
        var updateDom = function() {
          filterChips.forEach(function(c) {
            var match = (c === chip);
            c.classList.toggle('on', match);
            c.setAttribute('aria-pressed', match ? 'true' : 'false');
          });

          projectCards.forEach(function(card) {
            var cats = (card.dataset.cats || '').split(' ');
            var shouldShow = (filter === 'all' || cats.indexOf(filter) !== -1);
            card.classList.toggle('hide', !shouldShow);
          });
        };

        if (document.startViewTransition && !prefersReducedMotion) {
          document.startViewTransition(updateDom);
        } else {
          updateDom();
        }
      });
    });
  }

  /* ==========================================================================
     4. CLUTCHKART — LIVE INTERACTIVE COUNTER RECEIPT
     ========================================================================== */
  var posRegister = document.getElementById('posRegister');
  if (posRegister) {
    var items = [
      { id: 'item1', name: 'Basmati Rice 5kg', price: 540.00, qty: 1 },
      { id: 'item2', name: 'Sunflower Oil 1L', price: 210.00, qty: 1 },
      { id: 'item3', name: 'Toor Dal 1kg', price: 140.00, qty: 1 }
    ];

    function renderPosReceipt() {
      var itemsContainer = document.getElementById('rcptItemList');
      if (!itemsContainer) return;
      itemsContainer.innerHTML = '';

      var subtotal = 0;
      items.forEach(function(it, idx) {
        var itemTotal = it.price * it.qty;
        subtotal += itemTotal;

        var row = document.createElement('div');
        row.className = 'rcpt-item-row';
        row.innerHTML = 
          '<div><span class="rcpt-item-name">' + it.name + '</span> (₹' + it.price.toFixed(2) + ' × ' + it.qty + ')</div>' +
          '<div>' +
            '<b>₹' + itemTotal.toFixed(2) + '</b>' +
            '<span class="rcpt-actions">' +
              '<button type="button" class="pos-btn-mini" data-action="dec" data-idx="' + idx + '" aria-label="Decrease quantity">−</button>' +
              '<button type="button" class="pos-btn-mini" data-action="inc" data-idx="' + idx + '" aria-label="Increase quantity">+</button>' +
            '</span>' +
          '</div>';
        itemsContainer.appendChild(row);
      });

      var discountRate = 0.05; // 5% loyalty discount
      var discount = subtotal * discountRate;
      var total = subtotal - discount;

      var subtotalEl = document.getElementById('rcptSubtotal');
      var discountEl = document.getElementById('rcptDiscount');
      var totalEl = document.getElementById('rcptTotal');

      if (subtotalEl) subtotalEl.textContent = '₹' + subtotal.toFixed(2);
      if (discountEl) discountEl.textContent = '−₹' + discount.toFixed(2);
      if (totalEl) totalEl.textContent = '₹' + total.toFixed(2);

      // Low stock flag dynamic update
      var toorItem = items.find(function(it) { return it.id === 'item3'; });
      var lowStockFlag = document.getElementById('flagLowStock');
      if (lowStockFlag && toorItem) {
        var remainingStock = 12 - (toorItem.qty - 1);
        lowStockFlag.textContent = 'low stock: Toor Dal · ' + Math.max(0, remainingStock) + ' left';
      }
    }

    posRegister.addEventListener('click', function(e) {
      var btn = e.target.closest('.pos-btn-mini');
      if (!btn) return;
      var idx = parseInt(btn.dataset.idx, 10);
      var action = btn.dataset.action;

      if (action === 'inc') {
        items[idx].qty += 1;
        playDetentSound(720);
      } else if (action === 'dec') {
        if (items[idx].qty > 0) {
          items[idx].qty -= 1;
          playDetentSound(520);
        }
      }
      renderPosReceipt();

      // Mechanical readout flash
      var totalEl = document.getElementById('rcptTotal');
      if (totalEl) {
        totalEl.style.transition = 'none';
        totalEl.style.color = 'var(--signal-lime)';
        setTimeout(function() {
          totalEl.style.transition = 'color 0.3s ease';
          totalEl.style.color = 'var(--white)';
        }, 120);
      }
    });

    renderPosReceipt();
  }

  /* ==========================================================================
     5. CONTACT FORM & WORK ORDER LATCHING
     ========================================================================== */
  var contactForm = document.getElementById('contactForm');
  var formSuccess = document.getElementById('formSuccess');

  if (contactForm) {
    try {
      var params = new URLSearchParams(window.location.search);
      var interest = params.get('interest');
      if (interest) {
        var targetCheckbox = contactForm.querySelector('input[type="checkbox"][value="' + interest.toLowerCase() + '"]');
        if (targetCheckbox) {
          targetCheckbox.checked = true;
        }
      }
    } catch (e) {
      var match = /[?&]interest=([a-z]+)/i.exec(window.location.search);
      if (match) {
        var cb = contactForm.querySelector('input[type="checkbox"][value="' + match[1].toLowerCase() + '"]');
        if (cb) cb.checked = true;
      }
    }

    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();

      var honeypot = contactForm.querySelector('input[name="_hp_company"]');
      if (honeypot && honeypot.value.trim() !== '') {
        contactForm.style.display = 'none';
        if (formSuccess) formSuccess.classList.add('show');
        return;
      }

      var isValid = true;
      var nameInput = contactForm.querySelector('input[name="name"]');
      var emailInput = contactForm.querySelector('input[name="email"]');

      function validateField(input, testFn, errorId) {
        if (!input) return true;
        var parent = input.closest('.field');
        var errEl = errorId ? document.getElementById(errorId) : (parent ? parent.querySelector('.field-error') : null);
        var passes = testFn(input.value.trim());
        if (!passes) {
          if (parent) parent.classList.add('has-error');
          if (errEl) errEl.style.display = 'block';
          return false;
        } else {
          if (parent) parent.classList.remove('has-error');
          if (errEl) errEl.style.display = 'none';
          return true;
        }
      }

      var nameValid = validateField(nameInput, function(val) { return val.length > 0; }, 'nameError');
      var emailValid = validateField(emailInput, function(val) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
      }, 'emailError');

      isValid = nameValid && emailValid;

      if (!isValid) {
        if (!nameValid && nameInput) nameInput.focus();
        else if (!emailValid && emailInput) emailInput.focus();
        return;
      }

      // TODO: send the form data to your email service / backend here.
      contactForm.style.display = 'none';
      if (formSuccess) {
        formSuccess.classList.add('show');
        formSuccess.focus();
      }
    });
  }

  /* ==========================================================================
     8. EXPANDABLE BENTO GRID CONTROLLER (#whyGrid)
     ========================================================================== */
  var bentoModal = document.getElementById('bentoModal');
  var bentoBackdrop = document.getElementById('bentoBackdrop');
  var bentoCloseBtn = document.getElementById('bentoModalClose');
  var bentoCells = document.querySelectorAll('#whyGrid .bento-cell');

  var modalNum = document.getElementById('bentoModalNum');
  var modalTitle = document.getElementById('bentoModalTitle');
  var modalSub = document.getElementById('bentoModalSub');
  var modalContent = document.getElementById('bentoModalContent');
  var modalIcon = document.getElementById('bentoModalIcon');
  var lastFocusedCell = null;

  function openBentoModal(cell) {
    if (!bentoModal || !cell) return;
    lastFocusedCell = cell;

    var numEl = cell.querySelector('.num');
    var titleEl = cell.querySelector('h3');
    var pEl = cell.querySelector('p');
    var iconEl = cell.querySelector('.bento-icon-box');
    var tpl = cell.querySelector('.bento-detail-content');

    if (modalNum) modalNum.textContent = numEl ? numEl.textContent.trim() : '';
    if (modalTitle) modalTitle.textContent = titleEl ? titleEl.textContent.trim() : '';
    if (modalSub) modalSub.textContent = pEl ? pEl.textContent.trim() : '';
    if (modalIcon && iconEl) modalIcon.innerHTML = iconEl.innerHTML;
    if (modalContent) {
      modalContent.innerHTML = tpl ? tpl.innerHTML : (pEl ? '<p>' + pEl.textContent + '</p>' : '');
    }

    bentoModal.classList.add('is-active');
    bentoModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    playDetentSound();
    if (bentoCloseBtn) bentoCloseBtn.focus();
  }

  function closeBentoModal() {
    if (!bentoModal || !bentoModal.classList.contains('is-active')) return;
    bentoModal.classList.remove('is-active');
    bentoModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';

    if (lastFocusedCell) {
      lastFocusedCell.focus();
      lastFocusedCell = null;
    }
  }

  if (bentoCells.length > 0 && bentoModal) {
    bentoCells.forEach(function(cell) {
      cell.addEventListener('click', function() {
        openBentoModal(cell);
      });

      cell.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          openBentoModal(cell);
        }
      });
    });

    if (bentoBackdrop) {
      bentoBackdrop.addEventListener('click', closeBentoModal);
    }
    if (bentoCloseBtn) {
      bentoCloseBtn.addEventListener('click', closeBentoModal);
    }

    window.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && bentoModal.classList.contains('is-active')) {
        closeBentoModal();
      }
    });
  }
})();
