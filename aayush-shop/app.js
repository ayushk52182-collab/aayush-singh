/* =====================================================
   WISTERIA SHOP — JavaScript
   Features: Cart, Wishlist, Toast, Animations, etc.
   ===================================================== */

(function () {
  'use strict';

  // ===================== STATE =====================
  const state = {
    cart: [],
    wishlist: new Set(),
    cartOpen: false,
  };

  // ===================== SELECTORS =====================
  const $ = (id) => document.getElementById(id);
  const cartBtn        = $('cart-btn');
  const cartOverlay    = $('cart-overlay');
  const cartSidebar    = $('cart-sidebar');
  const cartClose      = $('cart-close');
  const cartCount      = $('cart-count');
  const cartBody       = $('cart-body');
  const cartItemsList  = $('cart-items-list');
  const cartEmpty      = $('cart-empty');
  const cartSubtotal   = $('cart-subtotal');
  const toast          = $('toast-notification');
  const toastMsg       = $('toast-msg');
  const backToTop      = $('back-to-top');
  const newsletterForm = $('newsletter-form');
  const searchInput    = $('search-input');
  const searchBtn      = $('search-btn');
  const checkoutBtn    = $('checkout-btn');

  // ===================== TOAST =====================
  let toastTimer = null;

  function showToast(message, icon = '✅') {
    toastMsg.textContent = message;
    const iconEl = toast.querySelector('.toast__icon');
    if (iconEl) iconEl.textContent = icon;
    toast.classList.add('show');
    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('show'), 2800);
  }

  // ===================== CART OPEN/CLOSE =====================
  function openCart() {
    state.cartOpen = true;
    cartSidebar.classList.add('open');
    cartOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeCart() {
    state.cartOpen = false;
    cartSidebar.classList.remove('open');
    cartOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  cartBtn.addEventListener('click', openCart);
  cartClose.addEventListener('click', closeCart);
  cartOverlay.addEventListener('click', closeCart);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && state.cartOpen) closeCart();
  });

  // ===================== CART LOGIC =====================
  function formatPrice(amount) {
    return '₹' + amount.toLocaleString('en-IN');
  }

  function getProductImg(id) {
    const imgMap = {
      1: 'public/product_electronics.png',
      2: 'public/product_fashion.png',
      3: 'public/product_home.png',
      4: 'public/product_book.png',
      5: 'public/product_watch.png',
      6: 'public/product_perfume.png',
      7: 'public/product_electronics.png',
      8: 'public/product_fashion.png',
      9: 'public/product_home.png',
      10: 'public/product_book.png',
      11: 'public/product_watch.png',
      12: 'public/product_perfume.png',
    };
    return imgMap[id] || 'public/product_electronics.png';
  }

  function updateCartCount() {
    const totalQty = state.cart.reduce((sum, item) => sum + item.qty, 0);
    cartCount.textContent = totalQty;
    if (totalQty > 0) {
      cartCount.classList.add('visible');
    } else {
      cartCount.classList.remove('visible');
    }
  }

  function updateSubtotal() {
    const total = state.cart.reduce((sum, item) => sum + item.price * item.qty, 0);
    cartSubtotal.textContent = formatPrice(total);
  }

  function renderCartItems() {
    if (state.cart.length === 0) {
      cartEmpty.style.display = 'flex';
      cartItemsList.innerHTML = '';
      cartSubtotal.textContent = '₹0';
      return;
    }

    cartEmpty.style.display = 'none';
    cartItemsList.innerHTML = '';

    state.cart.forEach((item) => {
      const li = document.createElement('li');
      li.className = 'cart-item';
      li.id = `cart-item-${item.id}`;
      li.innerHTML = `
        <img src="${getProductImg(item.id)}" alt="${item.name}" class="cart-item__img" />
        <div class="cart-item__info">
          <div class="cart-item__name">${item.name}</div>
          <div class="cart-item__price">${formatPrice(item.price)}</div>
          <div class="cart-item__qty-row">
            <button class="qty-btn" data-action="decrease" data-id="${item.id}" aria-label="Decrease quantity">−</button>
            <span class="qty-display" id="qty-${item.id}">${item.qty}</span>
            <button class="qty-btn" data-action="increase" data-id="${item.id}" aria-label="Increase quantity">+</button>
            <button class="cart-item__remove" data-id="${item.id}" aria-label="Remove item">Remove</button>
          </div>
        </div>
      `;
      cartItemsList.appendChild(li);
    });

    updateSubtotal();
  }

  function addToCart(id, name, price) {
    const existing = state.cart.find((item) => item.id === id);
    if (existing) {
      existing.qty += 1;
      showToast(`${name} quantity updated!`, '🛒');
    } else {
      state.cart.push({ id, name, price, qty: 1 });
      showToast(`${name} added to cart!`, '✅');
    }
    updateCartCount();
    renderCartItems();
  }

  function changeQty(id, delta) {
    const item = state.cart.find((i) => i.id === id);
    if (!item) return;
    item.qty += delta;
    if (item.qty <= 0) {
      removeFromCart(id);
      return;
    }
    updateCartCount();
    renderCartItems();
  }

  function removeFromCart(id) {
    state.cart = state.cart.filter((i) => i.id !== id);
    updateCartCount();
    renderCartItems();
    showToast('Item removed from cart', '🗑️');
  }

  // Cart item events (event delegation)
  cartItemsList.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-action], [data-id].cart-item__remove');
    if (!btn) return;

    const id   = parseInt(btn.dataset.id);
    const action = btn.dataset.action;

    if (btn.classList.contains('cart-item__remove')) {
      removeFromCart(id);
    } else if (action === 'increase') {
      changeQty(id, 1);
    } else if (action === 'decrease') {
      changeQty(id, -1);
    }
  });

  // ===================== ADD TO CART BUTTONS =====================
  document.querySelectorAll('.btn--add-cart').forEach((btn) => {
    btn.addEventListener('click', () => {
      const id    = parseInt(btn.dataset.id);
      const name  = btn.dataset.name;
      const price = parseInt(btn.dataset.price);
      addToCart(id, name, price);

      // Button feedback
      const original = btn.textContent;
      btn.textContent = '✓ Added!';
      btn.classList.add('added');
      setTimeout(() => {
        btn.textContent = original;
        btn.classList.remove('added');
      }, 1800);
    });
  });

  // Mini cart buttons
  document.querySelectorAll('.btn--mini-cart').forEach((btn) => {
    btn.addEventListener('click', () => {
      const id    = parseInt(btn.dataset.id);
      const name  = btn.dataset.name;
      const price = parseInt(btn.dataset.price);
      addToCart(id, name, price);
    });
  });

  // ===================== WISHLIST =====================
  document.querySelectorAll('.product-card__wishlist').forEach((btn) => {
    btn.addEventListener('click', () => {
      const card = btn.closest('.product-card');
      const titleEl = card?.querySelector('.product-card__title');
      const name = titleEl?.textContent || 'item';
      const id = btn.id;

      if (state.wishlist.has(id)) {
        state.wishlist.delete(id);
        btn.textContent = '♡';
        btn.classList.remove('active');
        showToast(`Removed from wishlist`, '💔');
      } else {
        state.wishlist.add(id);
        btn.textContent = '♥';
        btn.classList.add('active');
        showToast(`${name} wishlisted!`, '💜');
      }
    });
  });

  // ===================== CHECKOUT =====================
  checkoutBtn?.addEventListener('click', () => {
    if (state.cart.length === 0) {
      showToast('Your cart is empty!', '🛒');
      return;
    }
    const total = state.cart.reduce((sum, item) => sum + item.price * item.qty, 0);
    showToast(`Order placed! Total: ${formatPrice(total)} 🎉`, '🎊');
    state.cart = [];
    updateCartCount();
    renderCartItems();
    closeCart();
  });

  // ===================== NEWSLETTER =====================
  newsletterForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const emailInput = $('newsletter-email');
    const email = emailInput?.value?.trim();
    if (email) {
      showToast(`🌸 Welcome! You're subscribed with ${email}`, '✅');
      emailInput.value = '';
    }
  });

  // ===================== SEARCH =====================
  searchBtn?.addEventListener('click', () => {
    const query = searchInput?.value?.trim();
    if (query) {
      showToast(`Searching for "${query}"...`, '🔍');
    } else {
      showToast('Please enter a search term', '💡');
    }
  });

  searchInput?.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') searchBtn?.click();
  });

  // ===================== PRIME BUTTON =====================
  $('prime-join-btn')?.addEventListener('click', () => {
    showToast('Welcome to Aayush Prime! Free trial started 🌟', '⭐');
  });

  // ===================== BACK TO TOP =====================
  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      backToTop?.classList.add('visible');
    } else {
      backToTop?.classList.remove('visible');
    }
  });

  backToTop?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // ===================== SCROLL REVEAL =====================
  function initReveal() {
    const elements = document.querySelectorAll(
      '.product-card, .cat-card, .trust-item, .mini-product, .stat-card, .prime-float'
    );

    elements.forEach((el) => el.classList.add('reveal'));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );

    elements.forEach((el, i) => {
      el.style.transitionDelay = `${(i % 6) * 60}ms`;
      observer.observe(el);
    });
  }

  // ===================== STICKY HEADER SHADOW =====================
  const header = $('main-header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 10) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }
  });

  // ===================== NAV CAT ACTIVE STATE =====================
  document.querySelectorAll('.nav-cat').forEach((link) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      document.querySelectorAll('.nav-cat').forEach((l) => l.classList.remove('active'));
      link.classList.add('active');
    });
  });

  // ===================== CATEGORY CARDS =====================
  document.querySelectorAll('.cat-card').forEach((card) => {
    card.addEventListener('click', (e) => {
      e.preventDefault();
      const name = card.querySelector('.cat-card__name')?.textContent;
      showToast(`Browsing ${name} →`, '🔍');
    });
  });

  // ===================== INIT =====================
  document.addEventListener('DOMContentLoaded', () => {
    initReveal();
    updateCartCount();
    renderCartItems();
  });

  // Also run if DOM already loaded
  if (document.readyState !== 'loading') {
    initReveal();
    updateCartCount();
    renderCartItems();
  }

})();
