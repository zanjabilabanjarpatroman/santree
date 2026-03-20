# 🗄️ Database Schema — Santree

Schema database untuk Santree menggunakan Supabase (PostgreSQL).

## 📋 Tables Overview

```
users (profiles)
├── children (anak)
│   ├── child_quests (quest yang diambil anak)
│   └── child_progress (history progress)
├── tpq (lembaga TPQ)
│   ├── tpq_classes (kelas di TPQ)
│   └── tpq_members (ustadz & murid)
└── quests (library quest)
    ├── quest_categories
    └── quest_verifications
```

---

## 🧑 **users** (Supabase Auth)

Tabel bawaan Supabase untuk autentikasi.

| Column | Type | Description |
|--------|------|-------------|
| id | uuid | Primary key |
| email | text | Email user |
| created_at | timestamp | Waktu registrasi |

---

## 👤 **profiles**

Profil pengguna (orang tua atau ustadz).

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | uuid | PK, FK → users.id | User ID |
| full_name | text | NOT NULL | Nama lengkap |
| role | text | NOT NULL | 'parent' or 'ustadz' |
| phone | text | | Nomor WhatsApp |
| avatar_url | text | | URL foto profil |
| subscription_tier | text | DEFAULT 'free' | 'free', 'family_pro', 'tpq_pro' |
| subscription_expires_at | timestamp | | Tanggal berakhir subscription |
| created_at | timestamp | DEFAULT now() | Waktu dibuat |
| updated_at | timestamp | DEFAULT now() | Waktu update terakhir |

**Indexes:**
- `idx_profiles_role` on `role`

---

## 👶 **children**

Profil anak (yang main/ngaji).

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | uuid | PK, DEFAULT uuid_generate_v4() | Child ID |
| parent_id | uuid | FK → profiles.id | Orang tua anak ini |
| tpq_id | uuid | FK → tpq.id, NULLABLE | TPQ tempat anak ngaji (opsional) |
| full_name | text | NOT NULL | Nama anak |
| nickname | text | | Nama panggilan |
| birth_date | date | | Tanggal lahir |
| gender | text | | 'male' or 'female' |
| current_level | integer | DEFAULT 1 | Level saat ini (1-10) |
| current_tier | text | DEFAULT 'batu' | Tier permata (batu, bronze, silver, ..., diamond) |
| total_exp | integer | DEFAULT 0 | Total EXP yang dikumpulkan |
| current_streak | integer | DEFAULT 0 | Streak hari berturut-turut |
| longest_streak | integer | DEFAULT 0 | Streak terpanjang |
| avatar_seed | text | | Seed untuk generate avatar unik |
| created_at | timestamp | DEFAULT now() | Waktu dibuat |
| updated_at | timestamp | DEFAULT now() | Waktu update terakhir |

**Indexes:**
- `idx_children_parent` on `parent_id`
- `idx_children_tpq` on `tpq_id`
- `idx_children_level` on `current_level`

**Constraints:**
- `CHECK (current_level >= 1 AND current_level <= 10)`
- `CHECK (total_exp >= 0)`
- `CHECK (current_streak >= 0)`

---

## 🗂️ **quest_categories**

Kategori quest.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | uuid | PK | Category ID |
| name | text | NOT NULL, UNIQUE | Nama kategori |
| slug | text | NOT NULL, UNIQUE | Slug untuk URL |
| icon | text | | Emoji atau icon |
| color | text | | Hex color untuk UI |
| description | text | | Deskripsi kategori |
| order | integer | DEFAULT 0 | Urutan tampilan |

**Data awal:**
```sql
INSERT INTO quest_categories (name, slug, icon, color) VALUES
('Shalat & Ibadah', 'shalat', '🕌', '#3B82F6'),
('Hafalan Al-Qur''an', 'hafalan', '📖', '#10B981'),
('Doa Sehari-hari', 'doa', '🤲', '#8B5CF6'),
('Adab & Akhlak', 'adab', '💚', '#EC4899'),
('Materi Diniyyah', 'diniyyah', '📚', '#F59E0B'),
('Science', 'science', '🔬', '#14B8A6'),
('Life Skill', 'lifeskill', '🛠️', '#EF4444');
```

---

## 🎯 **quests**

Library quest yang tersedia.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | uuid | PK | Quest ID |
| category_id | uuid | FK → quest_categories.id | Kategori quest |
| title | text | NOT NULL | Judul quest |
| description | text | NOT NULL | Deskripsi lengkap |
| exp_reward | integer | NOT NULL | EXP yang didapat |
| verification_type | text | NOT NULL | 'manual', 'voice', 'photo', 'qr' |
| verification_prompt | text | | Instruksi verifikasi untuk orang tua |
| difficulty | text | DEFAULT 'easy' | 'easy', 'medium', 'hard' |
| min_age | integer | DEFAULT 8 | Umur minimal |
| max_age | integer | DEFAULT 12 | Umur maksimal |
| is_daily | boolean | DEFAULT true | Bisa diambil setiap hari? |
| is_seasonal | boolean | DEFAULT false | Quest seasonal (Ramadan, dll)? |
| seasonal_tag | text | | 'ramadan', 'syawal', 'muharram', dll |
| is_active | boolean | DEFAULT true | Aktif atau archived |
| created_by | uuid | FK → profiles.id, NULLABLE | Pembuat quest (null = official) |
| created_at | timestamp | DEFAULT now() | Waktu dibuat |

**Indexes:**
- `idx_quests_category` on `category_id`
- `idx_quests_active` on `is_active`
- `idx_quests_seasonal` on `is_seasonal, seasonal_tag`

**Constraints:**
- `CHECK (exp_reward > 0)`
- `CHECK (min_age >= 5 AND max_age <= 18)`

---

## ✅ **child_quests**

Quest yang diambil oleh anak (instance dari quest).

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | uuid | PK | Child quest ID |
| child_id | uuid | FK → children.id | Anak yang ambil quest |
| quest_id | uuid | FK → quests.id | Quest yang diambil |
| status | text | DEFAULT 'pending' | 'pending', 'completed', 'verified' |
| assigned_by | uuid | FK → profiles.id, NULLABLE | Siapa yang assign (orang tua/ustadz) |
| assigned_at | timestamp | DEFAULT now() | Kapan di-assign |
| completed_at | timestamp | | Kapan anak selesai (self-report) |
| verified_at | timestamp | | Kapan diverifikasi orang tua |
| verified_by | uuid | FK → profiles.id, NULLABLE | Siapa yang verifikasi |
| verification_note | text | | Catatan verifikasi |
| verification_media_url | text | | URL foto/voice memo |
| exp_earned | integer | | EXP yang didapat (copy dari quest) |

**Indexes:**
- `idx_child_quests_child` on `child_id`
- `idx_child_quests_status` on `status`
- `idx_child_quests_date` on `assigned_at`

**Constraints:**
- `CHECK (status IN ('pending', 'completed', 'verified'))`

---

## 📊 **child_progress**

History level naik, badge didapat, dll.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | uuid | PK | Progress ID |
| child_id | uuid | FK → children.id | Anak |
| event_type | text | NOT NULL | 'level_up', 'badge_earned', 'streak_milestone' |
| event_data | jsonb | | Data tambahan (badge name, dll) |
| created_at | timestamp | DEFAULT now() | Kapan event terjadi |

**Indexes:**
- `idx_progress_child` on `child_id`
- `idx_progress_type` on `event_type`

**Contoh data:**
```json
{
  "event_type": "level_up",
  "event_data": {
    "from_level": 1,
    "to_level": 2,
    "from_tier": "batu",
    "to_tier": "bronze",
    "total_exp": 150
  }
}
```

---

## 🕌 **tpq**

Lembaga TPQ yang terdaftar.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | uuid | PK | TPQ ID |
| name | text | NOT NULL | Nama TPQ |
| address | text | | Alamat lengkap |
| phone | text | | Nomor kontak |
| owner_id | uuid | FK → profiles.id | Ustadz pemilik/admin |
| subscription_tier | text | DEFAULT 'free' | 'free' or 'tpq_pro' |
| subscription_expires_at | timestamp | | Berakhir kapan |
| max_students | integer | DEFAULT 30 | Max murid (gratis = 30) |
| max_classes | integer | DEFAULT 3 | Max kelas (gratis = 3) |
| created_at | timestamp | DEFAULT now() | Waktu dibuat |

**Indexes:**
- `idx_tpq_owner` on `owner_id`

---

## 🎓 **tpq_classes**

Kelas di dalam TPQ.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | uuid | PK | Class ID |
| tpq_id | uuid | FK → tpq.id | TPQ induk |
| name | text | NOT NULL | Nama kelas (Iqro 1, Juz Amma, dll) |
| description | text | | Deskripsi kelas |
| teacher_id | uuid | FK → profiles.id | Ustadz pengajar |
| created_at | timestamp | DEFAULT now() | Waktu dibuat |

**Indexes:**
- `idx_classes_tpq` on `tpq_id`
- `idx_classes_teacher` on `teacher_id`

---

## 👥 **tpq_members**

Anggota TPQ (ustadz & murid).

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | uuid | PK | Member ID |
| tpq_id | uuid | FK → tpq.id | TPQ |
| class_id | uuid | FK → tpq_classes.id, NULLABLE | Kelas (hanya untuk murid) |
| profile_id | uuid | FK → profiles.id, NULLABLE | Profile (untuk ustadz) |
| child_id | uuid | FK → children.id, NULLABLE | Child (untuk murid) |
| role | text | NOT NULL | 'teacher' or 'student' |
| joined_at | timestamp | DEFAULT now() | Kapan join |

**Indexes:**
- `idx_members_tpq` on `tpq_id`
- `idx_members_class` on `class_id`
- `idx_members_role` on `role`

**Constraints:**
- `CHECK ((role = 'teacher' AND profile_id IS NOT NULL) OR (role = 'student' AND child_id IS NOT NULL))`

---

## 🔐 Row Level Security (RLS)

Semua tabel menggunakan RLS untuk keamanan.

### profiles
```sql
-- User hanya bisa read/update profil sendiri
CREATE POLICY "Users can view own profile"
  ON profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);
```

### children
```sql
-- Orang tua hanya bisa akses anak sendiri
CREATE POLICY "Parents can view own children"
  ON children FOR SELECT
  USING (parent_id = auth.uid());

CREATE POLICY "Parents can manage own children"
  ON children FOR ALL
  USING (parent_id = auth.uid());

-- Ustadz bisa lihat murid di TPQ-nya
CREATE POLICY "Teachers can view students in their TPQ"
  ON children FOR SELECT
  USING (
    tpq_id IN (
      SELECT tpq_id FROM tpq_members
      WHERE profile_id = auth.uid() AND role = 'teacher'
    )
  );
```

### quests
```sql
-- Semua user bisa lihat quest aktif
CREATE POLICY "Anyone can view active quests"
  ON quests FOR SELECT
  USING (is_active = true);

-- Hanya Family Pro & TPQ Pro bisa buat quest custom
CREATE POLICY "Premium users can create quests"
  ON quests FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid()
      AND subscription_tier IN ('family_pro', 'tpq_pro')
    )
  );
```

---

## 🔄 Triggers

### Auto-update timestamps
```sql
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER set_updated_at
  BEFORE UPDATE ON children
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();
```

### Auto-calculate level dari EXP
```sql
CREATE OR REPLACE FUNCTION calculate_level_from_exp()
RETURNS TRIGGER AS $$
DECLARE
  new_level integer;
  new_tier text;
BEGIN
  -- Formula: Level = floor(sqrt(total_exp / 100)) + 1
  -- Contoh: 0-99 EXP = Level 1, 100-399 = Level 2, dst
  new_level := LEAST(FLOOR(SQRT(NEW.total_exp / 100.0)) + 1, 10);

  -- Mapping level ke tier
  new_tier := CASE
    WHEN new_level = 1 THEN 'batu'
    WHEN new_level = 2 THEN 'bronze'
    WHEN new_level = 3 THEN 'silver'
    WHEN new_level = 4 THEN 'gold'
    WHEN new_level = 5 THEN 'emerald'
    WHEN new_level = 6 THEN 'sapphire'
    WHEN new_level = 7 THEN 'ruby'
    WHEN new_level = 8 THEN 'amethyst'
    WHEN new_level = 9 THEN 'platinum'
    ELSE 'diamond'
  END;

  -- Log level up jika naik
  IF new_level > OLD.current_level THEN
    INSERT INTO child_progress (child_id, event_type, event_data)
    VALUES (
      NEW.id,
      'level_up',
      jsonb_build_object(
        'from_level', OLD.current_level,
        'to_level', new_level,
        'from_tier', OLD.current_tier,
        'to_tier', new_tier,
        'total_exp', NEW.total_exp
      )
    );
  END IF;

  NEW.current_level := new_level;
  NEW.current_tier := new_tier;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_child_level
  BEFORE UPDATE OF total_exp ON children
  FOR EACH ROW
  EXECUTE FUNCTION calculate_level_from_exp();
```

---

## 📈 Views

### Leaderboard kelas
```sql
CREATE VIEW class_leaderboard AS
SELECT
  c.id,
  c.full_name,
  c.current_level,
  c.current_tier,
  c.total_exp,
  c.current_streak,
  tc.id AS class_id,
  tc.name AS class_name,
  RANK() OVER (PARTITION BY tc.id ORDER BY c.total_exp DESC) as rank
FROM children c
JOIN tpq_members tm ON tm.child_id = c.id
JOIN tpq_classes tc ON tc.id = tm.class_id
WHERE tm.role = 'student';
```

### Quest completion stats
```sql
CREATE VIEW quest_stats AS
SELECT
  q.id AS quest_id,
  q.title,
  qc.name AS category,
  COUNT(cq.id) AS total_attempts,
  COUNT(cq.id) FILTER (WHERE cq.status = 'verified') AS total_completed,
  AVG(cq.exp_earned) AS avg_exp
FROM quests q
LEFT JOIN child_quests cq ON cq.quest_id = q.id
JOIN quest_categories qc ON qc.id = q.category_id
WHERE q.is_active = true
GROUP BY q.id, q.title, qc.name;
```

---

## 🎨 Sample Data

Lihat file `seed_data.sql` untuk contoh data awal (20 quest, kategori, dll).

---

**Database ini siap untuk MVP!** 🚀
