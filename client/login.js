async function login() {
    console.log("登入按鈕已點擊");
    const email = document.getElementById('le').value;
    const password = document.getElementById('lp').value;

    try {
        const res = await fetch('http://localhost:3001/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });

        const data = await res.json();
        console.log("後端回應：", data);

        if (res.ok) {
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));
            alert('登入成功');
            location.reload();
        } else {
            alert(data.error || '登入失敗');
        }
    } catch (err) {
        console.error("連線發生錯誤：", err);
        alert('無法連線到伺服器，請檢查後端是否啟動');
    }
}