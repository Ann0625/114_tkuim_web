const form = document.querySelector('#signup-form');
const resultEl = document.querySelector('#result');
const submitBtn = document.querySelector('#submit-btn');
const getListBtn = document.querySelector('#get-list-btn');

let isSubmitting = false;

form.addEventListener('submit', async (event) => {
  event.preventDefault();

  if (isSubmitting) return;

  const formData = new FormData(form);
  const payload = Object.fromEntries(formData.entries());
  
  payload.password = payload.confirmPassword = 'demoPass88';
  payload.interests = ['後端入門'];
  payload.terms = true;

  try {
    isSubmitting = true;
    submitBtn.disabled = true;
    submitBtn.textContent = '送出中...';
    resultEl.textContent = '資料傳送中...';

    const res = await fetch('http://localhost:3001/api/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    
    const data = await res.json();
    
    if (!res.ok) {
      throw new Error(data.error || '失敗');
    }
    
    resultEl.textContent = `報名成功！\n${JSON.stringify(data, null, 2)}`;
    form.reset();
  } catch (error) {
    resultEl.textContent = `錯誤：${error.message}`;
  } finally {
    isSubmitting = false;
    submitBtn.disabled = false;
    submitBtn.textContent = '送出';
  }
});

getListBtn.addEventListener('click', async () => {
  try {
    getListBtn.disabled = true;
    getListBtn.textContent = '載入中...';
    
    const res = await fetch('http://localhost:3001/api/signup');
    const data = await res.json();

    resultEl.textContent = `目前清單：\n${JSON.stringify(data, null, 2)}`;
  } catch (error) {
    resultEl.textContent = `無法獲取清單：${error.message}`;
  } finally {
    getListBtn.disabled = false;
    getListBtn.textContent = '查看目前報名清單 (GET)';
  }
});