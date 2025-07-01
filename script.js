document.getElementById('entryForm').addEventListener('submit', e => {
  e.preventDefault();
  const form = e.target;
  const data = new FormData(form);

  const payload = new URLSearchParams();
  payload.append('name', data.get('name'));
  payload.append('email', data.get('email'));

  const WEB_APP_URL = 'https://script.google.com/macros/s/AKfycbzGjSlXR_Dze4brHfDb9EpfaoVZcpHCS9lH6xqlSBTVplPX25Yv81tTKSIH4QJNkIHdtw/exec';

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
