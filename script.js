// Browser storage keys and starter catalogue
const STORAGE_KEY = 'hop_catalogue_items';
const SHOW_PRICE_KEY = 'hop_show_prices';
// Add the store's WhatsApp number with its country code before launch.
const WHATSAPP_NUMBER = '';

// Starter content for the catalogue preview.
const initialCatalogue = [
  {
    id: 'item-1',
    code: 'HOP-PY-101',
    name: 'Traditional Ghungroo Bridal Payal',
    category: 'Silver Payals',
    weight: '56g (Pair)',
    finish: 'Oxidised Silver',
    price: 6500,
    image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=800&q=80',
    description: 'Bridal-style payal with ghungroo detailing and an S-hook clasp.'
  },
  {
    id: 'item-2',
    code: 'HOP-PY-102',
    name: 'Daily Wear Box Chain Payal',
    category: 'Silver Payals',
    weight: '22g (Pair)',
    finish: 'High Polish Silver',
    price: 3100,
    image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&w=800&q=80',
    description: 'A simple box-chain payal for everyday wear.'
  },
  {
    id: 'item-3',
    code: 'HOP-PY-103',
    name: 'Meenakari Floral Silver Payal',
    category: 'Silver Payals',
    weight: '44g (Pair)',
    finish: 'Silver with Enamel Work',
    price: 5200,
    image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=800&q=80',
    description: 'Floral payal design with enamel detailing and linked silver elements.'
  },
  {
    id: 'item-4',
    code: 'HOP-CH-201',
    name: 'Flat Snake Sterling Silver Chain',
    category: 'Silver Chains',
    weight: '18g',
    finish: 'Rhodium Plated Silver',
    price: 2800,
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=800&q=80',
    description: 'Flat snake-chain design with a smooth finish.'
  },
  {
    id: 'item-5',
    code: 'HOP-CH-202',
    name: 'Twisted Rope Silver Chain',
    category: 'Silver Chains',
    weight: '24g',
    finish: 'Bright Polish Silver',
    price: 3500,
    image: 'https://images.unsplash.com/photo-1599643477877-530eb83abc8e?auto=format&fit=crop&w=800&q=80',
    description: 'Rope-chain design with a polished finish.'
  },
  {
    id: 'item-6',
    code: 'HOP-CH-203',
    name: 'Minimal Solitaire Pendant Chain',
    category: 'Silver Chains',
    weight: '10g',
    finish: 'Silver with Zircon',
    price: 1950,
    image: 'https://images.unsplash.com/photo-1535632787350-4e68ef0ac584?auto=format&fit=crop&w=800&q=80',
    description: 'Fine chain paired with a solitaire-style pendant.'
  },
  {
    id: 'item-7',
    code: 'HOP-BR-301',
    name: 'Carved Temple Silver Kada',
    category: 'Silver Bracelets',
    weight: '36g',
    finish: 'Antique Oxidised Silver',
    price: 4800,
    image: 'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?auto=format&fit=crop&w=800&q=80',
    description: 'Silver kada with floral carving and a screw clasp.'
  },
  {
    id: 'item-8',
    code: 'HOP-BR-302',
    name: 'Interlock Link Silver Bracelet',
    category: 'Silver Bracelets',
    weight: '16g',
    finish: 'High Polish Silver',
    price: 2500,
    image: 'https://images.unsplash.com/photo-1602173574767-37ac01994b2a?auto=format&fit=crop&w=800&q=80',
    description: 'Link bracelet with extension rings and a lobster clasp.'
  },
  {
    id: 'item-9',
    code: 'HOP-BR-303',
    name: 'Hammered Cuff Silver Bracelet',
    category: 'Silver Bracelets',
    weight: '28g',
    finish: 'Hand-Textured Silver',
    price: 3800,
    image: 'https://images.unsplash.com/photo-1611591437163-25611572e5d2?auto=format&fit=crop&w=800&q=80',
    description: 'Open-ended cuff bracelet with a hand-textured surface.'
  },
  {
    id: 'item-10',
    code: 'HOP-OJ-401',
    name: 'Oxidised Floral Bichhiya (Toe Rings)',
    category: 'Other Jewellery',
    weight: '8g (Pair)',
    finish: 'Oxidised Silver',
    price: 1150,
    image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=800&q=80',
    description: 'Pair of adjustable toe rings with a floral design.'
  },
  {
    id: 'item-11',
    code: 'HOP-OJ-402',
    name: 'Classic Silver Jhumka Earrings',
    category: 'Other Jewellery',
    weight: '25g (Pair)',
    finish: 'Oxidised Silver',
    price: 3300,
    image: 'https://images.unsplash.com/photo-1630019852942-f89202989a59?auto=format&fit=crop&w=800&q=80',
    description: 'Dome-style jhumka earrings with bead details.'
  },
  {
    id: 'item-12',
    code: 'HOP-OJ-403',
    name: 'Statement Filigree Silver Ring',
    category: 'Other Jewellery',
    weight: '11g',
    finish: 'Oxidised Silver',
    price: 1750,
    image: 'https://images.unsplash.com/photo-1603561591411-07134e71a2a9?auto=format&fit=crop&w=800&q=80',
    description: 'Adjustable statement ring with a filigree-style design.'
  }
];

// Current catalogue and filter state
let catalogue = [];
let selectedCategory = 'all';
let searchText = '';
let currentSort = 'default';
let showPrices = true;
let currentModalId = null;
let lastFocusedElement = null;
let lastAdminTrigger = null;

// Load and save catalogue preferences
function initStorage() {
  try {
    const savedItems = localStorage.getItem(STORAGE_KEY);
    const parsedItems = savedItems ? JSON.parse(savedItems) : null;
    catalogue = Array.isArray(parsedItems) && parsedItems.every(isValidProduct)
      ? parsedItems
      : getStarterCatalogue();

    const savedPriceFlag = localStorage.getItem(SHOW_PRICE_KEY);
    if (savedPriceFlag !== null) showPrices = savedPriceFlag === 'true';
  } catch (error) {
    catalogue = getStarterCatalogue();
    showPrices = true;
  }

  const toggle = document.getElementById('priceToggle');
  if (toggle) toggle.checked = showPrices;
}

function getStarterCatalogue() {
  return initialCatalogue.map(item => ({ ...item }));
}

function isValidProduct(item) {
  const requiredText = ['id', 'code', 'name', 'category', 'weight', 'finish', 'image', 'description'];
  return item && typeof item === 'object'
    && requiredText.every(key => typeof item[key] === 'string')
    && Number.isFinite(Number(item.price));
}

function saveToStorage() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(catalogue));
    return true;
  } catch (error) {
    window.alert('The catalogue could not be saved in this browser. Try using smaller product images.');
    return false;
  }
}

// WhatsApp links and display helpers
function sendToWhatsApp(message) {
  const number = WHATSAPP_NUMBER.replace(/\D/g, '');
  const baseUrl = number ? `https://wa.me/${number}?text=` : 'https://wa.me/?text=';
  window.open(baseUrl + encodeURIComponent(message), '_blank', 'noopener,noreferrer');
}

function escapeHtml(value) {
  return String(value ?? '').replace(/[&<>"']/g, character => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  })[character]);
}

function safeImageUrl(value) {
  const imageUrl = String(value ?? '');
  if (/^data:image\/(png|jpeg|webp|gif);base64,/i.test(imageUrl)) return imageUrl;

  try {
    const parsedUrl = new URL(imageUrl, window.location.href);
    return ['http:', 'https:'].includes(parsedUrl.protocol) ? parsedUrl.href : '';
  } catch (error) {
    return '';
  }
}

function getPriceLabel(price) {
  if (!showPrices) return 'Price on Request';
  const amount = Number(price);
  return Number.isFinite(amount) && amount > 0
    ? `₹${amount.toLocaleString('en-IN')}`
    : 'Price on Request';
}

// Catalogue cards
function renderCatalogue() {
  const grid = document.getElementById('productGrid');
  if (!grid) return;

  let list = catalogue.filter(item => {
    const matchCat = selectedCategory === 'all' || item.category === selectedCategory;
    const query = searchText.trim().toLowerCase();
    const matchQuery = !query
      || String(item.name || '').toLowerCase().includes(query)
      || String(item.code || '').toLowerCase().includes(query);
    return matchCat && matchQuery;
  });

  if (currentSort === 'low') {
    list.sort((a, b) => Number(a.price) - Number(b.price));
  } else if (currentSort === 'high') {
    list.sort((a, b) => Number(b.price) - Number(a.price));
  }

  if (list.length === 0) {
    grid.innerHTML = '<p class="empty-state">No products found. Try another search or collection.</p>';
    return;
  }

  grid.innerHTML = list.map(item => `
    <article class="prod-card">
      <button class="prod-img-box" type="button" data-open="${escapeHtml(item.id)}" aria-label="View ${escapeHtml(item.name)} details">
        <img src="${escapeHtml(safeImageUrl(item.image))}" alt="${escapeHtml(item.name)}" loading="lazy">
        <span class="code-tag">${escapeHtml(item.code)}</span>
      </button>
      <div class="prod-details">
        <div class="prod-sub">
          <span>${escapeHtml(item.category)}</span>
          <span>${escapeHtml(item.weight)}</span>
        </div>
        <h3 class="prod-heading"><button class="prod-name" type="button" data-open="${escapeHtml(item.id)}">${escapeHtml(item.name)}</button></h3>
        <div class="prod-price">${escapeHtml(getPriceLabel(item.price))}</div>
        <div class="prod-btns">
          <button class="btn-wa-card" type="button" data-wa="${escapeHtml(item.id)}">Enquire on WhatsApp</button>
          <button class="btn-view-card" type="button" data-open="${escapeHtml(item.id)}">Details</button>
        </div>
      </div>
    </article>
  `).join('');
}

// Product details modal
function openModal(id) {
  const product = catalogue.find(p => p.id === id);
  if (!product) return;

  lastFocusedElement = document.activeElement;
  currentModalId = product.id;
  document.getElementById('mImg').src = safeImageUrl(product.image);
  document.getElementById('mImg').alt = product.name;
  document.getElementById('mCat').textContent = product.category;
  document.getElementById('mTitle').textContent = product.name;
  document.getElementById('mPrice').textContent = getPriceLabel(product.price);
  document.getElementById('mDesc').textContent = product.description;
  document.getElementById('mCode').textContent = product.code;
  document.getElementById('mWeight').textContent = product.weight;
  document.getElementById('mFinish').textContent = product.finish;
  document.getElementById('mCustomNote').value = '';

  document.getElementById('productModal').classList.add('active');
  document.getElementById('closeModalBtn').focus();
}

function closeProductModal() {
  document.getElementById('productModal').classList.remove('active');
  currentModalId = null;
  lastFocusedElement?.focus();
}

// Catalogue editor
function renderAdminList() {
  const container = document.getElementById('adminList');
  if (!container) return;

  container.innerHTML = catalogue.map(item => `
    <div class="admin-row">
      <img src="${escapeHtml(safeImageUrl(item.image))}" alt="${escapeHtml(item.name)}">
      <div class="admin-row-info">
        <strong>${escapeHtml(item.name)}</strong>
        <span>${escapeHtml(item.code)} | ${escapeHtml(item.category)}</span>
      </div>
      <div class="admin-row-btns">
        <label class="sm-btn">
          Photo
          <input type="file" accept="image/jpeg,image/png,image/webp" data-edit-img="${escapeHtml(item.id)}" hidden>
        </label>
        <button class="sm-btn" type="button" data-remove="${escapeHtml(item.id)}">Delete</button>
      </div>
    </div>
  `).join('');
}

function fileToDataUrl(file, cb) {
  if (!file) return;

  if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
    window.alert('Choose a JPG, PNG, or WebP image.');
    return;
  }
  if (file.size > 10 * 1024 * 1024) {
    window.alert('Choose an image smaller than 10 MB.');
    return;
  }

  const reader = new FileReader();
  reader.onerror = () => window.alert('The selected image could not be read.');
  reader.onload = event => {
    const image = new Image();
    image.onerror = () => window.alert('The selected image could not be opened.');
    image.onload = () => {
      const maxDimension = 1200;
      const scale = Math.min(1, maxDimension / Math.max(image.width, image.height));
      const canvas = document.createElement('canvas');
      canvas.width = Math.round(image.width * scale);
      canvas.height = Math.round(image.height * scale);
      canvas.getContext('2d').drawImage(image, 0, 0, canvas.width, canvas.height);

      const webpData = canvas.toDataURL('image/webp', 0.82);
      cb(webpData.startsWith('data:image/webp') ? webpData : canvas.toDataURL('image/jpeg', 0.82));
    };
    image.src = event.target.result;
  };
  reader.readAsDataURL(file);
}

// Collection filter
function filterByCategory(cat) {
  selectedCategory = cat;
  document.querySelectorAll('#categoryTabs .tab-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.filter === cat);
    btn.setAttribute('aria-pressed', String(btn.dataset.filter === cat));
  });
  renderCatalogue();
}

// Page interactions
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('currentYear').textContent = new Date().getFullYear();
  initStorage();
  renderCatalogue();
  renderAdminList();

  document.getElementById('menuToggle').addEventListener('click', () => {
    const menu = document.getElementById('navLinks');
    const isOpen = menu.classList.toggle('open');
    document.getElementById('menuToggle').setAttribute('aria-expanded', String(isOpen));
  });

  document.querySelectorAll('#navLinks a').forEach(link => {
    link.addEventListener('click', () => {
      document.getElementById('navLinks').classList.remove('open');
      document.getElementById('menuToggle').setAttribute('aria-expanded', 'false');
    });
  });

  document.querySelectorAll('#categoryTabs .tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      filterByCategory(btn.dataset.filter);
    });
  });

  document.querySelectorAll('.cat-card').forEach(card => {
    card.addEventListener('click', e => {
      e.preventDefault();
      filterByCategory(card.dataset.category);
      document.getElementById('catalogue').scrollIntoView({ behavior: 'smooth' });
    });
  });

  document.querySelectorAll('[data-cat-link]').forEach(link => {
    link.addEventListener('click', () => {
      filterByCategory(link.dataset.catLink);
    });
  });

  document.getElementById('searchInput').addEventListener('input', e => {
    searchText = e.target.value;
    renderCatalogue();
  });

  document.getElementById('sortSelect').addEventListener('change', e => {
    currentSort = e.target.value;
    renderCatalogue();
  });

  document.getElementById('productGrid').addEventListener('click', e => {
    const openTrigger = e.target.closest('[data-open]');
    if (openTrigger) {
      openModal(openTrigger.dataset.open);
      return;
    }

    const waTrigger = e.target.closest('[data-wa]');
    if (waTrigger) {
      const item = catalogue.find(p => p.id === waTrigger.dataset.wa);
      if (item) {
        const text = `Hi House of Payal, I want to enquire about this product:\n\nProduct: ${item.name}\nCode: ${item.code}\nCategory: ${item.category}\nWeight: ${item.weight}\n\nPlease share availability and details.`;
        sendToWhatsApp(text);
      }
    }
  });

  document.getElementById('closeModalBtn').addEventListener('click', () => {
    closeProductModal();
  });

  document.getElementById('productModal').addEventListener('click', e => {
    if (e.target.id === 'productModal') {
      closeProductModal();
    }
  });

  document.getElementById('mWaBtn').addEventListener('click', () => {
    const item = catalogue.find(p => p.id === currentModalId);
    if (!item) return;
    const note = document.getElementById('mCustomNote').value.trim();
    let text = `Hi House of Payal, I want to enquire about:\n\nProduct: ${item.name}\nCode: ${item.code}\nCategory: ${item.category}\nWeight: ${item.weight}`;
    if (note) {
      text += `\nNote: ${note}`;
    }
    sendToWhatsApp(text);
  });

  document.getElementById('modalImgInput').addEventListener('change', e => {
    const file = e.target.files[0];
    e.target.value = '';
    if (!file || !currentModalId) return;
    fileToDataUrl(file, url => {
      const index = catalogue.findIndex(p => p.id === currentModalId);
      if (index !== -1) {
        const previousImage = catalogue[index].image;
        catalogue[index].image = url;
        if (!saveToStorage()) {
          catalogue[index].image = previousImage;
          return;
        }
        document.getElementById('mImg').src = url;
        renderCatalogue();
        renderAdminList();
      }
    });
  });

  const handleGeneralEnquiry = () => {
    sendToWhatsApp('Hi House of Payal, I visited your website and would like to enquire about your silver jewellery collection.');
  };

  document.getElementById('navWaBtn').addEventListener('click', handleGeneralEnquiry);
  document.getElementById('heroWaBtn').addEventListener('click', handleGeneralEnquiry);
  document.getElementById('floatWaBtn').addEventListener('click', handleGeneralEnquiry);

  document.getElementById('contactForm').addEventListener('submit', e => {
    e.preventDefault();
    const name = document.getElementById('userName').value.trim();
    const cat = document.getElementById('userCat').value;
    const msg = document.getElementById('userMsg').value.trim();

    const text = `Hi House of Payal,\nName: ${name}\nInterested In: ${cat}\nMessage: ${msg}`;
    sendToWhatsApp(text);
  });

  const showAdmin = e => {
    if (e) e.preventDefault();
    lastAdminTrigger = document.activeElement;
    document.getElementById('adminDrawer').classList.add('active');
    document.getElementById('closeAdminBtn').focus();
  };

  document.getElementById('openAdminBtn').addEventListener('click', showAdmin);
  document.getElementById('footerAdminBtn').addEventListener('click', showAdmin);

  const closeAdmin = () => {
    document.getElementById('adminDrawer').classList.remove('active');
    lastAdminTrigger?.focus();
  };

  document.getElementById('closeAdminBtn').addEventListener('click', closeAdmin);
  document.getElementById('adminDrawer').addEventListener('click', e => {
    if (e.target.id === 'adminDrawer') closeAdmin();
  });
  document.addEventListener('keydown', e => {
    if (e.key !== 'Escape') return;
    if (document.getElementById('productModal').classList.contains('active')) closeProductModal();
    if (document.getElementById('adminDrawer').classList.contains('active')) closeAdmin();
  });

  document.getElementById('priceToggle').addEventListener('change', e => {
    showPrices = e.target.checked;
    try {
      localStorage.setItem(SHOW_PRICE_KEY, String(showPrices));
    } catch (error) {
      window.alert('This setting could not be saved in this browser.');
    }
    renderCatalogue();
  });

  document.getElementById('addProductForm').addEventListener('submit', e => {
    e.preventDefault();
    const name = document.getElementById('pName').value.trim();
    const code = document.getElementById('pCode').value.trim();
    const category = document.getElementById('pCat').value;
    const price = Number(document.getElementById('pPrice').value) || 0;
    const weight = document.getElementById('pWeight').value.trim();
    const finish = document.getElementById('pFinish').value.trim();
    const description = document.getElementById('pDesc').value.trim() || 'Silver jewellery from the House of Payal collection.';
    const fileEl = document.getElementById('pFile');

    if (catalogue.some(item => item.code.toLowerCase() === code.toLowerCase())) {
      window.alert('That product code is already in the catalogue.');
      return;
    }

    const insertProduct = imgUrl => {
      catalogue.unshift({
        id: 'item-' + Date.now(),
        code,
        name,
        category,
        weight,
        finish,
        price,
        image: imgUrl,
        description
      });
      if (!saveToStorage()) {
        catalogue.shift();
        return;
      }
      renderCatalogue();
      renderAdminList();
      e.target.reset();
    };

    if (fileEl.files && fileEl.files[0]) {
      fileToDataUrl(fileEl.files[0], url => insertProduct(url));
    } else {
      insertProduct('https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=800&q=80');
    }
  });

  document.getElementById('adminList').addEventListener('change', e => {
    const fileInput = e.target.closest('[data-edit-img]');
    if (fileInput && fileInput.files[0]) {
      const id = fileInput.dataset.editImg;
      const file = fileInput.files[0];
      fileInput.value = '';
      fileToDataUrl(file, url => {
        const idx = catalogue.findIndex(p => p.id === id);
        if (idx !== -1) {
          const previousImage = catalogue[idx].image;
          catalogue[idx].image = url;
          if (!saveToStorage()) {
            catalogue[idx].image = previousImage;
            return;
          }
          renderCatalogue();
          renderAdminList();
        }
      });
    }
  });

  document.getElementById('adminList').addEventListener('click', e => {
    const removeBtn = e.target.closest('[data-remove]');
    if (removeBtn) {
      const id = removeBtn.dataset.remove;
      const product = catalogue.find(item => item.id === id);
      if (!product || !window.confirm(`Remove ${product.name} from the catalogue?`)) return;
      const previousCatalogue = catalogue;
      catalogue = catalogue.filter(p => p.id !== id);
      if (!saveToStorage()) {
        catalogue = previousCatalogue;
        return;
      }
      renderCatalogue();
      renderAdminList();
    }
  });

  document.getElementById('resetBtn').addEventListener('click', () => {
    if (!window.confirm('Restore the starter catalogue? Your current catalogue will be replaced.')) return;
    const previousCatalogue = catalogue;
    catalogue = getStarterCatalogue();
    if (!saveToStorage()) {
      catalogue = previousCatalogue;
      return;
    }
    renderCatalogue();
    renderAdminList();
  });
});
