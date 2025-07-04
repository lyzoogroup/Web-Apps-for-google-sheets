let productMap = {};

const accountSelect = document.getElementById('account');
const productSelect = document.getElementById('product');
const skuSelect = document.getElementById('sku');

const WEB_APP_URL = 'https://script.google.com/macros/s/AKfycbzJsnIHZ0BYjVt4Qhb2cdeH04Yu2pxF8sU0sHh0IASClvnk0nKIJq4-9vERh1ai3R_PrA/exec';

// Fetch data from Google Sheet on load
fetch(WEB_APP_URL)
  .then(res => res.json())
  .then(res => {
    if (res.result === 'success') {
      productMap = res.data;
      populateAccounts();
    } else {
      document.getElementById('status').textContent = '❌ Failed to load data.';
    }
  })
  .catch(err => {
    document.getElementById('status').textContent = '❌ ' + err;
  });

function populateAccounts() {
  accountSelect.innerHTML = '<option value="">Select account</option>';
  Object.keys(productMap).forEach(account => {
    const option = document.createElement('option');
    option.value = account;
    option.textContent = account;
    accountSelect.appendChild(option);
  });
}

accountSelect.addEventListener('change', () => {
  const selectedAccount = accountSelect.value;
  productSelect.innerHTML = '<option value="">Select product</option>';
  skuSelect.innerHTML = '<option value="">Select SKU</option>';

  if (selectedAccount && productMap[selectedAccount]) {
    Object.keys(productMap[selectedAccount]).forEach(product => {
      const option = document.createElement('option');
      option.value = product;
      option.textContent = product;
      productSelect.appendChild(option);
    });
  }
});

productSelect.addEventListener('change', () => {
  const selectedAccount = accountSelect.value;
  const selectedProduct = productSelect.value;
  skuSelect.innerHTML = '<option value="">Select SKU</option>';

  if (selectedAccount && selectedProduct && productMap[selectedAccount][selectedProduct]) {
    productMap[selectedAccount][selectedProduct].forEach(sku => {
      const option = document.createElement('option');
      option.value = sku;
      option.textContent = sku;
      skuSelect.appendChild(option);
    });
  }
});

document.getElementById('entryForm').addEventListener('submit', e => {
  e.preventDefault();
  const form = e.target;
  const data = new FormData(form);

  const payload = new URLSearchParams();
  payload.append('employee', data.get('employee'));
  payload.append('account', data.get('account'));
  payload.append('product', data.get('product'));
  payload.append('sku', data.get('sku'));
  payload.append('quantity', data.get('quantity'));
  payload.append('unitCost', data.get('unitCost'));

  document.getElementById('status').textContent = '⏳ Submitting...';

  fetch(WEB_APP_URL, {
    method: 'POST',
    body: payload
  })
  .then(r => r.json())
  .then(res => {
    document.getElementById('status').textContent =
      res.result === 'success' ? '✅ Submitted!' : '❌ Error occurred.';
    if (res.result === 'success') form.reset();
  })
  .catch(err => {
    document.getElementById('status').textContent = '❌ ' + err;
  });
});
