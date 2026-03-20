# Setup Santree MVP

## 🚀 Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Setup Supabase

#### Create Supabase Project

1. Buka [https://supabase.com](https://supabase.com)
2. Klik "New Project"
3. Isi detail project:
   - **Name:** santree
   - **Database Password:** (simpan password ini!)
   - **Region:** Southeast Asia (Singapore)

#### Create Waitlist Table

Di Supabase Dashboard, buka **SQL Editor** dan jalankan query ini:

```sql
-- Create waitlist table
CREATE TABLE waitlist (
  id BIGSERIAL PRIMARY KEY,
  nama TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  whatsapp TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create index for faster email lookups
CREATE INDEX waitlist_email_idx ON waitlist(email);

-- Optional: Create index for created_at (for sorting)
CREATE INDEX waitlist_created_at_idx ON waitlist(created_at DESC);
```

#### Get API Keys

1. Di Supabase Dashboard, buka **Settings** → **API**
2. Copy 3 values ini:
   - **Project URL** (contoh: `https://xxxxx.supabase.co`)
   - **anon public** key
   - **service_role** key (klik "Reveal" untuk melihat)

### 3. Setup Environment Variables

```bash
# Copy .env.example ke .env
cp .env.example .env
```

Lalu edit `.env` dan isi dengan credentials dari Supabase:

```env
PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
```

**⚠️ PENTING:**
- Jangan commit file `.env` ke git!
- `service_role` key hanya dipakai di server-side (API routes), NEVER exposed ke client

### 4. Run Development Server

```bash
npm run dev
```

Buka http://localhost:4321 di browser!

## 📦 Build untuk Production

```bash
npm run build
npm run preview
```

## 🚀 Deploy ke Vercel

### 1. Push ke GitHub

```bash
git add .
git commit -m "Setup Astro + Supabase waitlist"
git push origin main
```

### 2. Deploy di Vercel

1. Buka [https://vercel.com](https://vercel.com)
2. Import repository dari GitHub
3. **Environment Variables** - Tambahkan 3 variables:
   - `PUBLIC_SUPABASE_URL`
   - `PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
4. Deploy!

## 🗄️ Lihat Data Waitlist

Buka Supabase Dashboard → **Table Editor** → **waitlist**

Atau query manual di SQL Editor:

```sql
SELECT * FROM waitlist ORDER BY created_at DESC;
```

## 📊 Export Data Waitlist

```sql
-- Export to CSV
SELECT * FROM waitlist ORDER BY created_at DESC;
```

Lalu klik **Download CSV** di Supabase dashboard.

## 🔧 Troubleshooting

### Form submit tapi tidak tersimpan

1. Cek Supabase credentials di `.env`
2. Cek di browser console ada error nggak
3. Cek Supabase Dashboard → **Logs** untuk lihat error

### Error "relation waitlist does not exist"

Berarti table belum dibuat. Jalankan SQL create table di atas.

### Error 401 Unauthorized

API key salah. Double check `.env` file.

## 📚 Tech Stack

- **Framework:** Astro 4
- **Styling:** Tailwind CSS
- **Database:** Supabase (PostgreSQL)
- **Deploy:** Vercel

---

**Need help?** Contact: hello@zanjabila.org
