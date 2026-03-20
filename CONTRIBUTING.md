# 🤝 Panduan Kontribusi — Santree

Terima kasih sudah tertarik berkontribusi untuk Santree! 🌳

## Cara Berkontribusi

### 1. Fork & Clone

```bash
# Fork repo di GitHub, lalu clone
git clone https://github.com/USERNAME-KAMU/santree.git
cd santree

# Tambahkan upstream remote
git remote add upstream https://github.com/zanjabilabanjarpatroman/santree.git
```

### 2. Buat Branch Baru

```bash
# Selalu buat branch dari main yang terbaru
git checkout main
git pull upstream main

# Buat branch baru
git checkout -b feature/nama-fitur
# atau
git checkout -b fix/nama-bug
```

**Naming convention:**
- `feature/` — untuk fitur baru
- `fix/` — untuk bug fix
- `docs/` — untuk update dokumentasi
- `refactor/` — untuk refactoring kode

### 3. Lakukan Perubahan

Pastikan kode kamu:
- ✅ Mengikuti style guide yang ada
- ✅ Tidak ada typo atau error
- ✅ Sudah di-test secara manual
- ✅ Menambahkan comment jika logiknya kompleks

### 4. Commit

```bash
git add .
git commit -m "feat: tambah verifikasi voice memo untuk quest hafalan"
```

**Commit message format:**
- `feat:` — fitur baru
- `fix:` — bug fix
- `docs:` — update dokumentasi
- `style:` — formatting, missing semi colons, dll
- `refactor:` — refactoring kode
- `test:` — tambah testing
- `chore:` — maintenance task

### 5. Push & Pull Request

```bash
git push origin feature/nama-fitur
```

Lalu buat Pull Request di GitHub dengan deskripsi yang jelas:
- Apa yang diubah?
- Kenapa perubahan ini penting?
- Screenshot (jika ada perubahan UI)

---

## Yang Bisa Dikontribusi

### 🐛 Bug Fixes
Temukan bug? Buat issue dulu, lalu kirim PR dengan fix-nya.

### ✨ Fitur Baru
Punya ide fitur keren? Diskusikan di Issues dulu sebelum mulai coding — biar tidak bentrok dengan roadmap.

### 📝 Konten Quest
Ini yang paling mudah dikontribusi! Tambahkan quest baru ke file `seed_data.sql`:

```sql
INSERT INTO quests (category_id, title, description, exp_reward, verification_type, verification_prompt)
VALUES (
  (SELECT id FROM quest_categories WHERE slug = 'hafalan'),
  'Hafal Surat An-Nas',
  'Hafalkan surat An-Nas dengan lancar tanpa melihat mushaf',
  50,
  'voice',
  'Dengarkan bacaan anak dari awal sampai akhir surat An-Nas. Pastikan makhraj dan tajwidnya benar.'
);
```

### 🎨 Design & UI
- Perbaiki UI/UX yang kurang intuitif
- Buat ilustrasi kartu quest
- Design avatar atau badge baru

### 📖 Dokumentasi
- Perbaiki README
- Tambah tutorial setup untuk pemula
- Translate ke bahasa daerah

### 🌍 Lokalisasi
Bantu translate Santree ke bahasa daerah (Jawa, Sunda, Madura, dll).

---

## Code Style Guide

### JavaScript/React
- Pakai ES6+ syntax
- Functional components + hooks
- Nama variabel & fungsi yang jelas (bukan `x`, `temp`, `data`)
- Pisahkan logic dari UI

**Good:**
```jsx
function QuestCard({ quest, onVerify }) {
  const handleVerification = async () => {
    await onVerify(quest.id);
  };

  return (
    <div className="quest-card">
      <h3>{quest.title}</h3>
      <button onClick={handleVerification}>Verifikasi</button>
    </div>
  );
}
```

**Bad:**
```jsx
function Card({ q, f }) {
  return (
    <div>
      <h3>{q.t}</h3>
      <button onClick={() => f(q.i)}>V</button>
    </div>
  );
}
```

### CSS/Tailwind
- Gunakan Tailwind classes
- Hindari inline styles kecuali untuk dynamic values
- Group classes yang related

```jsx
// Good
<div className="flex items-center gap-4 p-6 bg-white rounded-lg shadow-md">

// Bad
<div className="flex p-6 bg-white items-center rounded-lg gap-4 shadow-md">
```

### SQL
- Gunakan uppercase untuk keywords
- Indent untuk readability
- Beri comment jika query kompleks

```sql
-- Good
SELECT
  c.full_name,
  COUNT(cq.id) AS total_quests
FROM children c
LEFT JOIN child_quests cq ON cq.child_id = c.id
WHERE c.parent_id = $1
GROUP BY c.id, c.full_name;

-- Bad
select c.full_name,count(cq.id) as total_quests from children c left join child_quests cq on cq.child_id=c.id where c.parent_id=$1 group by c.id,c.full_name;
```

---

## Testing

Sebelum submit PR, test manual:
1. **Auth flow** — Login/register bekerja?
2. **Quest flow** — Ambil quest → kerjakan → verifikasi → dapat EXP?
3. **UI responsive** — Coba di desktop & mobile
4. **Error handling** — Apa yang terjadi kalau API error?

---

## PR Review Process

1. **Automated checks** — GitHub Actions akan run tests otomatis
2. **Code review** — Maintainer akan review kode kamu
3. **Changes requested** (opsional) — Kamu diminta ubah beberapa hal
4. **Approved & merged** — PR kamu masuk! 🎉

**Average review time:** 1-3 hari kerja

---

## Hal yang TIDAK Boleh

❌ Push langsung ke `main` branch
❌ Commit file `.env` atau credentials
❌ Copy-paste kode dari project lain tanpa izin
❌ Mengubah banyak file sekaligus dalam satu PR (kecuali refactoring besar)
❌ Menggunakan library baru tanpa diskusi di Issues dulu

---

## Need Help?

- 💬 **Diskusi umum:** [GitHub Discussions](https://github.com/zanjabilabanjarpatroman/santree/discussions)
- 🐛 **Bug report:** [GitHub Issues](https://github.com/zanjabilabanjarpatroman/santree/issues)
- 📧 **Email:** hello@zanjabila.org

---

**Terima kasih sudah berkontribusi!** 💚

Setiap kontribusi, sekecil apapun, sangat berarti untuk anak-anak Indonesia. 🌳
