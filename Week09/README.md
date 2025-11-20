# Week09 Lab：報名 API + 測試流程

這是資管 3C 網路程式設計 Week09 的作業繳交內容。

## 專案完成項目
- [x] 後端 API 開發 (Express + RESTful)  
- [x] 前端表單串接 (Fetch API)  
- [x] 防止重複送出與 Loading 狀態  
- [x] 建立測試流程 (Postman + PowerShell)  

---

## 目錄
1. 啟動後端 (Server)  
2. 啟動前端 (Client)  
3. API 端點文件與測試方式

---

## 1. 啟動後端 (Server)
請確保終端機位於 `server` 資料夾內：

```powershell
cd server
npm install
npm run dev
```

成功後終端機應顯示：
```
Server ready on http://localhost:3001
```

---

## 2. 啟動前端 (Client)
本專案使用 Live Server 啟動前端頁面：

1. 在 VS Code 中安裝 "Live Server" 擴充套件。  
2. 開啟 `client/signup_form.html` 檔案。  
3. 在編輯區按右鍵，選擇 "Open with Live Server"。  
4. 瀏覽器會自動開啟網頁。

---

## 3. API 端點文件與測試方式

### API 端點 (Endpoints)

| 方法 | 路徑 | 描述 | 備註 |
|------|------|------|------|
| POST | /api/signup | 提交報名資料 | 驗證欄位，失敗回傳 400 |
| GET  | /api/signup | 查看報名清單 | 回傳目前清單與總數 |

### 測試指令 (Windows PowerShell)
請開啟 PowerShell 執行以下指令來測試 API 功能：

1. 測試 POST (報名)
```powershell
Invoke-RestMethod -Uri http://localhost:3001/api/signup -Method POST -ContentType "application/json" -Body '{"name":"Test","email":"t@t.com","phone":"0912345678","password":"123","confirmPassword":"123","terms":true,"interests":["Backend"]}'
```

2. 測試 GET (查看清單)
```powershell
Invoke-RestMethod -Uri http://localhost:3001/api/signup
```

---

如需額外範例或 Postman 匯出檔，請告知以補上。
