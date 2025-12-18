const token = localStorage.getItem('token');
const user = JSON.parse(localStorage.getItem('user'));

if (token) {
    document.getElementById('auth-box').classList.add('hidden');
    document.getElementById('main-box').classList.remove('hidden');
    document.getElementById('uinfo').innerText = `${user.email} (${user.role})`;
    loadData();
}

document.getElementById('sign-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const payload = {
        name: document.getElementById('n').value,
        email: document.getElementById('e').value,
        phone: document.getElementById('p').value
    };
    await fetch('http://localhost:3001/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify(payload)
    });
    loadData();
});

async function loadData() {
    const res = await fetch('http://localhost:3001/api/signup', {
        headers: { 'Authorization': `Bearer ${token}` }
    });
    const data = await res.json();
    document.getElementById('list').innerHTML = data.map(i => `
        <li>${i.name} - ${i.phone} <button onclick="del('${i._id}')">刪除</button></li>
    `).join('');
}

window.del = async (id) => {
    const res = await fetch(`http://localhost:3001/api/signup/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
    });
    if (res.ok) loadData(); else alert((await res.json()).error);
};