# VC Gold Collection — Mandalay

GitHub Pages အတွက် static jewelry shop website။

## ပါဝင်တာ
- `index.html` — Customer shop
- `admin.html` — Admin panel
- `styles.css` — Responsive luxury/gold UI
- `app.js` — Product search/filter + product detail + Telegram order
- `admin.js` — Add/Edit/Delete, image upload, color, stock
- `assets/` — User ပေးထားတဲ့ jewelry display photos ၅ ပုံ

## Admin
- Username: `admin`
- Password: `admin1234`

## Contact
- Telegram: https://t.me/vcafemm
- Phone: 09458988516
- Location: Mandalay, Myanmar

## အရေးကြီးတဲ့ technical limitation
ဒီ build က backend မပါသေးတဲ့ GitHub Pages/static version ဖြစ်လို့ admin data ကို browser `localStorage` ထဲသိမ်းထားပါတယ်။ အဲဒါကြောင့် admin browser မှာထည့်လိုက်တဲ့ stock/item ကို အခြား customer ဖုန်းတွေက အလိုအလျောက်မမြင်နိုင်ပါ။

Live store အဖြစ်အသုံးပြုမယ်ဆိုရင် Firebase/Supabase (သို့) custom API backend ချိတ်ပြီး:
1. Admin login ကို server-side authentication ပြုလုပ်ရန်
2. Product image ကို storage ထဲ upload ရန်
3. Product/color/stock ကို database ထဲသိမ်းရန်
4. Customer တွေအားလုံးကို တူညီတဲ့ live stock ပြရန်
5. Order တင်တဲ့အခါ Telegram bot/API သို့ notification ပို့ရန်

ဆိုတဲ့ production version ကို ဆက်တည်ဆောက်ရပါမယ်။
