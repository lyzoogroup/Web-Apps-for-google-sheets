document.getElementById('entryForm').addEventListener('submit', e => {
  e.preventDefault();
  const form = e.target;
  const data = new FormData(form);

  const reader = new FileReader();
  reader.onload = () => {
    const [meta, blobData] = reader.result.split(',');

    const payload = new URLSearchParams();
    payload.append('name', data.get('name'));
    payload.append('email', data.get('email'));
    payload.append('file', blobData);
    payload.append('fileType', meta.match(/:(.*?);/)[1]);
    payload.append('fileName', data.get('file').name);

    // 🔑 IMPORTANT: Replace this with your own Web App URL!
    const WEB_APP_URL = 'https://script.google.com/macros/s/AKfycbxU5yfcDJRjkjYBmm_nUQJNMMju1G2BZ-baSMAzajahiCUDkYmI8KafH9KyTwEv33STyA/exec';

    fetch(WEB_APP_URL, {
      method: 'POST',
      body: payload
    })
    .then(r => r.json())
    .then(res => {
      document.getElementById('status').textContent =
        res.result === 'success' ? '✅ Submitted!' : '❌ Error occurred.';
    })
    .catch(err => {
      document.getElementById('status').textContent = '❌ ' + err;
    });
  };

  reader.readAsDataURL(data.get('file'));
});
