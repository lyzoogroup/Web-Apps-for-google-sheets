const productMap = {
  "MRA TRADERS LIMITED": {
    "Product 1": ["SKU-001", "SKU-002"],
    "Product 2": ["SKU-003"]
  },
  "LYZOO GROUP LTD": {
    "Product A": ["SKU-A1", "SKU-A2"],
    "Product B": ["SKU-B1"]
  },
  "KEWY LTD": {
    "Product X": ["SKU-X1", "SKU-X2", "SKU-X3"]
  }
};

const accountSelect = document.getElementById('account');
const productSelect = document.getElementById('product');
const skuSelect = document.getElementById('sku');

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

  const WEB_APP_URL = 'https://script.google.com/macros/s/AKfycbx4zUIoMAKdBtVX4F5LMNYk7ePRu_d_Wfx5zJFVHINN2ZNeMb2LRPOoFKPhRckz2B9c7Q/exec';

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
