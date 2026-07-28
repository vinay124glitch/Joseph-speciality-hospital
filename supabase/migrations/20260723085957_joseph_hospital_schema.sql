/*
# Joseph Speciality Hospital — Core Schema

## Overview
Creates the data tables that back the public website and admin dashboard for
Joseph Speciality Hospital (Srivilliputhur, TN). The public site runs without a
sign-in (anon key), while the admin dashboard signs in as an authenticated
user. Policies are split accordingly: public-facing reads and public
submissions allow `anon`, while management operations require `authenticated`.

## 1. New Tables

- `doctors` — hospital doctors shown on the public Doctors page and manageable
  from the admin panel. Columns: id, name, qualifications, specialization,
  experience (years), department, available_days, image_url, bio, created_at.
- `appointments` — appointment booking requests submitted by the public.
  Columns: id, patient_name, phone, email, age, gender, department, doctor,
  appointment_date, preferred_time, reason, status, admin_notes, created_at.
- `contact_messages` — messages submitted via the public Contact form.
  Columns: id, name, email, phone, subject, message, is_read, created_at.
- `blog_posts` — health blog articles shown publicly and managed by admin.
  Columns: id, title, slug (unique), excerpt, content, image_url, category,
  author, published, created_at.
- `newsletter_subscriptions` — email signups from the public newsletter form.
  Columns: id, email (unique), created_at.

## 2. Security (RLS)

- RLS enabled on every table.
- `doctors`: public read (anon+authenticated); admin write (authenticated).
- `appointments`: public INSERT; admin SELECT/UPDATE/DELETE (authenticated).
- `contact_messages`: public INSERT; admin SELECT/UPDATE/DELETE.
- `blog_posts`: public SELECT; admin INSERT/UPDATE/DELETE.
- `newsletter_subscriptions`: public INSERT; admin SELECT/DELETE.

## 3. Seed Data

- Inserts sample doctors across several departments.
- Inserts sample published blog posts covering common health topics.
*/

-- ============================
-- doctors
-- ============================
CREATE TABLE IF NOT EXISTS doctors (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  qualifications text NOT NULL,
  specialization text NOT NULL,
  experience int NOT NULL DEFAULT 0,
  department text NOT NULL,
  available_days text NOT NULL,
  image_url text,
  bio text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE doctors ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_read_doctors" ON doctors;
CREATE POLICY "public_read_doctors" ON doctors FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "admin_insert_doctors" ON doctors;
CREATE POLICY "admin_insert_doctors" ON doctors FOR INSERT
  TO authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "admin_update_doctors" ON doctors;
CREATE POLICY "admin_update_doctors" ON doctors FOR UPDATE
  TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "admin_delete_doctors" ON doctors;
CREATE POLICY "admin_delete_doctors" ON doctors FOR DELETE
  TO authenticated USING (true);

-- ============================
-- appointments
-- ============================
CREATE TABLE IF NOT EXISTS appointments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_name text NOT NULL,
  phone text NOT NULL,
  email text,
  age int,
  gender text,
  department text NOT NULL,
  doctor text,
  appointment_date date NOT NULL,
  preferred_time text NOT NULL,
  reason text,
  status text NOT NULL DEFAULT 'pending',
  admin_notes text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_insert_appointments" ON appointments;
CREATE POLICY "public_insert_appointments" ON appointments FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "admin_read_appointments" ON appointments;
CREATE POLICY "admin_read_appointments" ON appointments FOR SELECT
  TO authenticated USING (true);

DROP POLICY IF EXISTS "admin_update_appointments" ON appointments;
CREATE POLICY "admin_update_appointments" ON appointments FOR UPDATE
  TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "admin_delete_appointments" ON appointments;
CREATE POLICY "admin_delete_appointments" ON appointments FOR DELETE
  TO authenticated USING (true);

-- ============================
-- contact_messages
-- ============================
CREATE TABLE IF NOT EXISTS contact_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text,
  subject text NOT NULL,
  message text NOT NULL,
  is_read boolean NOT NULL DEFAULT false,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_insert_messages" ON contact_messages;
CREATE POLICY "public_insert_messages" ON contact_messages FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "admin_read_messages" ON contact_messages;
CREATE POLICY "admin_read_messages" ON contact_messages FOR SELECT
  TO authenticated USING (true);

DROP POLICY IF EXISTS "admin_update_messages" ON contact_messages;
CREATE POLICY "admin_update_messages" ON contact_messages FOR UPDATE
  TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "admin_delete_messages" ON contact_messages;
CREATE POLICY "admin_delete_messages" ON contact_messages FOR DELETE
  TO authenticated USING (true);

-- ============================
-- blog_posts
-- ============================
CREATE TABLE IF NOT EXISTS blog_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
  excerpt text NOT NULL,
  content text NOT NULL,
  image_url text,
  category text NOT NULL DEFAULT 'General Health',
  author text NOT NULL DEFAULT 'Joseph Speciality Hospital',
  published boolean NOT NULL DEFAULT true,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_read_blog" ON blog_posts;
CREATE POLICY "public_read_blog" ON blog_posts FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "admin_insert_blog" ON blog_posts;
CREATE POLICY "admin_insert_blog" ON blog_posts FOR INSERT
  TO authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "admin_update_blog" ON blog_posts;
CREATE POLICY "admin_update_blog" ON blog_posts FOR UPDATE
  TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "admin_delete_blog" ON blog_posts;
CREATE POLICY "admin_delete_blog" ON blog_posts FOR DELETE
  TO authenticated USING (true);

-- ============================
-- newsletter_subscriptions
-- ============================
CREATE TABLE IF NOT EXISTS newsletter_subscriptions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE newsletter_subscriptions ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_insert_newsletter" ON newsletter_subscriptions;
CREATE POLICY "public_insert_newsletter" ON newsletter_subscriptions FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "admin_read_newsletter" ON newsletter_subscriptions;
CREATE POLICY "admin_read_newsletter" ON newsletter_subscriptions FOR SELECT
  TO authenticated USING (true);

DROP POLICY IF EXISTS "admin_delete_newsletter" ON newsletter_subscriptions;
CREATE POLICY "admin_delete_newsletter" ON newsletter_subscriptions FOR DELETE
  TO authenticated USING (true);

-- ============================
-- Indexes
-- ============================
CREATE INDEX IF NOT EXISTS idx_appointments_status ON appointments(status);
CREATE INDEX IF NOT EXISTS idx_appointments_date ON appointments(appointment_date);
CREATE INDEX IF NOT EXISTS idx_messages_read ON contact_messages(is_read);
CREATE INDEX IF NOT EXISTS idx_blog_slug ON blog_posts(slug);
CREATE INDEX IF NOT EXISTS idx_blog_published ON blog_posts(published);

-- ============================
-- Seed: doctors
-- ============================
INSERT INTO doctors (name, qualifications, specialization, experience, department, available_days, image_url, bio) VALUES
  ('Dr. Joseph Selvakumar', 'MBBS, MD (General Medicine)', 'General Medicine', 18, 'General Medicine', 'Mon–Sat, 9:00 AM – 1:00 PM', 'https://images.pexels.com/photos/5407206/pexels-photo-5407206.jpeg?auto=compress&cs=tinysrgb&w=600', 'Senior physician with expertise in preventive care and chronic disease management.'),
  ('Dr. Mary Priya', 'MBBS, MS (General Surgery)', 'General Surgery', 15, 'General Surgery', 'Mon–Fri, 10:00 AM – 2:00 PM', 'https://images.pexels.com/photos/5214958/pexels-photo-5214958.jpeg?auto=compress&cs=tinysrgb&w=600', 'Experienced surgeon specialising in minimally invasive procedures.'),
  ('Dr. Arun Kumar', 'MBBS, MS (Ortho)', 'Orthopedics', 12, 'Orthopedics', 'Mon–Sat, 9:00 AM – 12:00 PM', 'https://images.pexels.com/photos/6234600/pexels-photo-6234600.jpeg?auto=compress&cs=tinysrgb&w=600', 'Orthopedic specialist in joint replacement and sports injury care.'),
  ('Dr. Lakshmi Devi', 'MBBS, MD (OBG)', 'Gynecology & Obstetrics', 16, 'Gynecology', 'Mon–Sat, 10:00 AM – 1:00 PM', 'https://images.pexels.com/photos/5452201/pexels-photo-5452201.jpeg?auto=compress&cs=tinysrgb&w=600', 'Dedicated to women''s health, prenatal and postnatal care.'),
  ('Dr. Suresh Babu', 'MBBS, MD (Paediatrics)', 'Pediatrics', 14, 'Pediatrics', 'Mon–Sat, 9:00 AM – 12:00 PM', 'https://images.pexels.com/photos/5215024/pexels-photo-5215024.jpeg?auto=compress&cs=tinysrgb&w=600', 'Compassionate pediatrician focused on child growth and immunisation.'),
  ('Dr. Anitha Raj', 'MBBS, MD (Cardiology)', 'Cardiology', 20, 'Cardiology', 'Tue, Thu, Sat, 11:00 AM – 1:00 PM', 'https://images.pexels.com/photos/6536606/pexels-photo-6536606.jpeg?auto=compress&cs=tinysrgb&w=600', 'Interventional cardiologist with advanced cardiac diagnostics experience.'),
  ('Dr. Ramesh Varma', 'MBBS, MD (Diabetology)', 'Diabetology', 13, 'Diabetology', 'Mon–Fri, 9:00 AM – 11:00 AM', 'https://images.pexels.com/photos/4173251/pexels-photo-4173251.jpeg?auto=compress&cs=tinysrgb&w=600', 'Diabetes care specialist emphasising lifestyle and diet management.'),
  ('Dr. Kavitha Nair', 'MBBS, MD (Dermatology)', 'Dermatology', 10, 'Dermatology', 'Wed, Fri, Sat, 10:00 AM – 1:00 PM', 'https://images.pexels.com/photos/5407116/pexels-photo-5407116.jpeg?auto=compress&cs=tinysrgb&w=600', 'Dermatologist treating skin, hair and cosmetic concerns.')
ON CONFLICT DO NOTHING;

-- ============================
-- Seed: blog posts
-- ============================
INSERT INTO blog_posts (title, slug, excerpt, content, image_url, category, author, published) VALUES
  ('How to Prevent Diabetes', 'how-to-prevent-diabetes',
   'Simple, evidence-based lifestyle changes that dramatically lower your risk of type 2 diabetes.',
   'Type 2 diabetes is one of the fastest-growing lifestyle diseases in India, yet it is largely preventable. The cornerstones of prevention are a balanced diet, regular physical activity, and routine screening.

1. Eat Smart: Choose whole grains, fresh vegetables, and lean proteins. Limit refined sugar and processed foods. A high-fibre diet slows sugar absorption and keeps blood glucose stable.

2. Stay Active: Aim for at least 30 minutes of moderate exercise — brisk walking, cycling, or swimming — five days a week. Muscle activity improves insulin sensitivity.

3. Know Your Numbers: Adults over 35, or anyone with a family history, should check fasting blood sugar and HbA1c annually. Early detection of prediabetes is reversible with lifestyle changes.

4. Manage Weight: Even a 5–7% reduction in body weight lowers diabetes risk significantly.

5. Sleep & Stress: Poor sleep and chronic stress raise cortisol, which increases blood sugar. Aim for 7–8 hours of restful sleep.

At Joseph Speciality Hospital, our Diabetology department offers personalised prevention plans. Book a screening today.',
   'https://images.pexels.com/photos/4386466/pexels-photo-4386466.jpeg?auto=compress&cs=tinysrgb&w=900', 'Diabetes', 'Dr. Ramesh Varma', true),
  ('Healthy Lifestyle Tips for Every Age', 'healthy-lifestyle-tips',
   'Practical habits for nutrition, movement, and mental wellness that benefit the whole family.',
   'A healthy lifestyle is built on small, consistent choices rather than dramatic overhauls. Here are habits that work across every age group.

Hydration: Start your day with a glass of water and aim for 2–3 litres daily. Proper hydration aids digestion, skin health, and energy.

Balanced Plate: Fill half your plate with vegetables, a quarter with protein, and a quarter with complex carbohydrates. Add a serving of fruit and a small amount of healthy fat.

Move Daily: You don''t need a gym. Take the stairs, walk after meals, and stretch every hour if you sit at a desk.

Mental Wellness: Practice 10 minutes of mindfulness or deep breathing. Maintain social connections — they are as important as physical health.

Limit Screen Time: Excessive screen time affects posture, sleep, and mood. Set boundaries, especially before bed.

Regular Checkups: Preventive health checks catch issues early when they are most treatable.',
   'https://images.pexels.com/photos/3768916/pexels-photo-3768916.jpeg?auto=compress&cs=tinysrgb&w=900', 'Wellness', 'Joseph Speciality Hospital', true),
  ('Protecting Your Heart Health', 'heart-health',
   'Understand the key risk factors for heart disease and the daily habits that protect your cardiovascular system.',
   'Heart disease remains the leading cause of death globally, but up to 80% of premature cases are preventable.

Know the Risks: High blood pressure, high cholesterol, smoking, diabetes, obesity, and a sedentary lifestyle are the major modifiable risk factors.

Diet Matters: A heart-friendly diet is low in saturated fat, trans fat, and sodium. Emphasise fruits, vegetables, whole grains, nuts, and oily fish rich in omega-3s.

Move Your Heart: At least 150 minutes of moderate aerobic activity per week strengthens the heart muscle and improves circulation.

Stop Smoking: Within a year of quitting, heart disease risk drops by half.

Check Regularly: After age 40, annual blood pressure, lipid profile, and ECG checks are essential. Our Cardiology department provides comprehensive cardiac screening.',
   'https://images.pexels.com/photos/4226119/pexels-photo-4226119.jpeg?auto=compress&cs=tinysrgb&w=900', 'Cardiology', 'Dr. Anitha Raj', true),
  ('The Importance of Regular Health Checkups', 'importance-of-regular-checkups',
   'Why preventive health screenings save lives and money — and what to check at every stage of life.',
   'Many serious illnesses develop silently. Regular health checkups detect them early, when treatment is simpler, cheaper, and far more effective.

In Your 20s & 30s: Baseline blood pressure, BMI, blood sugar, and lipid profile every 2–3 years. Women should have routine pap smears.

In Your 40s: Annual checkups become important. Add ECG, eye and dental exams, and for women, mammography discussions.

50 and Above: Colon cancer screening, bone density (especially for women), and more frequent cardiac assessment.

For Everyone: Don''t ignore warning signs — unexplained weight loss, persistent pain, or fatigue deserve a doctor''s attention.

Joseph Speciality Hospital offers comprehensive health checkup packages tailored to age and risk profile.',
   'https://images.pexels.com/photos/3987019/pexels-photo-3987019.jpeg?auto=compress&cs=tinysrgb&w=900', 'Preventive Care', 'Joseph Speciality Hospital', true),
  ('Child Healthcare: A Parent''s Guide', 'child-healthcare',
   'From immunisation schedules to nutrition, here''s what every parent should know about keeping children healthy.',
   'Children are not small adults — their healthcare needs change rapidly as they grow.

Immunisation: Follow the national immunisation schedule strictly. Vaccines protect against measles, polio, diphtheria, and more. Keep a vaccination card and never miss a dose.

Nutrition: Breastfeeding is recommended exclusively for the first six months. Introduce diverse, nutrient-rich solids thereafter. Avoid excess sugar and salt in young children.

Growth Monitoring: Regular height and weight checks track healthy development. Our Pediatrics department plots growth charts at every visit.

Common Illnesses: Fever, coughs, and stomach bugs are common. Stay calm, keep the child hydrated, and consult a doctor if fever persists beyond 3 days or breathing is laboured.

Safety: Childproof your home, use car seats, and supervise water activities.',
   'https://images.pexels.com/photos/3933252/pexels-photo-3933252.jpeg?auto=compress&cs=tinysrgb&w=900', 'Pediatrics', 'Dr. Suresh Babu', true),
  ('Women''s Health Across Every Stage', 'womens-health',
   'A guide to the screenings and self-care practices every woman should prioritise through her life.',
   'Women''s health needs are distinct and change with each life stage.

Adolescence: Establish healthy habits and menstrual health awareness. The HPV vaccine, given early, prevents cervical cancer later.

Reproductive Years: Annual gynaecological exams, pap smears, and prenatal care during pregnancy. Folic acid supplements before and during early pregnancy prevent neural tube defects.

Perimenopause & Menopause: Hormonal changes affect mood, sleep, and bone density. Calcium, vitamin D, and weight-bearing exercise protect against osteoporosis.

Mental Health: Women are twice as likely to experience anxiety and depression. Seeking help early is a sign of strength, not weakness.

Our Gynecology & Obstetrics department provides compassionate, confidential care at every stage.',
   'https://images.pexels.com/photos/4173239/pexels-photo-4173239.jpeg?auto=compress&cs=tinysrgb&w=900', 'Women''s Health', 'Dr. Lakshmi Devi', true),
  ('Beating Seasonal Diseases', 'seasonal-diseases',
   'From monsoon fevers to winter colds — how to prevent and manage the illnesses that arrive with each season.',
   'Each season in Tamil Nadu brings its own health challenges.

Monsoon (June–September): Dengue, malaria, and waterborne infections rise. Prevent mosquito breeding by clearing stagnant water, use repellents, and drink only safe water. Eat freshly cooked food.

Summer (March–May): Heatstroke and dehydration are risks. Drink plenty of fluids, avoid outdoor activity during peak heat, and wear light clothing.

Winter (December–February): Respiratory infections and asthma flare-ups increase. Cover your mouth in cold air, get your flu vaccine, and maintain hand hygiene.

All Seasons: Handwashing remains the single most effective way to prevent infections. Maintain a strong immune system through sleep, nutrition, and exercise.

Visit our hospital promptly if you develop high fever, persistent vomiting, or breathing difficulty.',
   'https://images.pexels.com/photos/3933058/pexels-photo-3933058.jpeg?auto=compress&cs=tinysrgb&w=900', 'Seasonal Health', 'Joseph Speciality Hospital', true)
ON CONFLICT (slug) DO NOTHING;
