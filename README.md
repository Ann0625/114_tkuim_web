# 🚀 Week 12 報名系統：啟動與測試手冊

這是一個基於 **Node.js**、**Express** 與 **MongoDB** 開發的活動報名系統，具備 **JWT 身分驗證** 與 **RBAC 角色權限控管** 功能。

---

###  1. 快速啟動步驟

* **啟動資料庫容器**：在專案根目錄 (`Week12`) 執行 `docker compose up -d`。
* **安裝後端依賴套件**：進入 `server` 資料夾執行 `npm install`。
* **啟動後端伺服器**：在 `server` 資料夾執行 `node index.js`。
* **開啟前端介面**：使用瀏覽器直接開啟 `client/index.html`。

---

###  2. 測試帳號列表

| 角色 | Email | 密碼 | 說明 |
| :--- | :--- | :--- | :--- |
| **管理員 (Admin)** | `admin@example.com` | `qwe123rty456` | 具備最高權限，可查閱並刪除全數資料。 |
| **一般學員 (Student)** | (由前端註冊) | (自行設定) | 僅能操作個人資料，無法查閱他人報名紀錄。 |

---

###  3. 資料庫結構 (MongoDB)

1.  **Users 集合**：儲存 `email` (唯一帳號)、`passwordHash` (加密密碼)、`role` (身分標籤)。
2.  **Participants 集合**：儲存 `name`、`email`、`phone` 與關鍵的 `ownerId` (紀錄資料擁有者 ID)。

---

###  4. 必做任務功能驗證

* **註冊與登入系統**：`/auth/signup` 使用 `bcrypt` 雜湊加密存檔，`/auth/login` 驗證成功後回傳 **JWT Token**。
* **報名 API 保護**：所有 `/api/signup` 請求必須在 Header 帶上 `Authorization: Bearer <Token>`。
* **資料隔離 (GET)**：
    * **學生**：登入後僅能看到 `ownerId` 符合自身 ID 的報名紀錄。
    * **管理員**：可跨權限查閱全體報名清單。
* **歸屬紀錄 (POST)**：新增報名時，系統會自動將當前登入者的 ID 寫入 `ownerId` 欄位。
* **刪除限制 (DELETE)**：後端會檢查 `ownerId` 是否為本人或請求者是否為 `admin`，否則拒絕操作。
* **前端互動**：支援登入、顯示當前身分、新增報名、刪除報名、登出並清除緩存。

---

###  5. 核心代碼架構 (server/index.js)

```javascript
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRouter from './routes/auth.js';
import signupRouter from './routes/signup.js';

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use('/auth', authRouter);
app.use('/api/signup', signupRouter);

app.listen(3001, () => {
  console.log(' Server 成功啟動：http://localhost:3001');
});