-- Migration: Remover category, tags, level do código
-- Executar no SQL Editor do Supabase

-- 1. Remover tabelas junction (FK constraints first, drop table depois)
DROP TABLE IF EXISTS event_tags CASCADE;
DROP TABLE IF EXISTS course_tags CASCADE;

-- 2. Remover tabelas de categoria e tags (sem FK de outras tabelas)
DROP TABLE IF EXISTS categories CASCADE;
DROP TABLE IF EXISTS tags CASCADE;

-- 3. Adicionar instructor_name em courses e popular com dados existentes
ALTER TABLE courses ADD COLUMN IF NOT EXISTS instructor_name varchar(300);
UPDATE courses
  SET instructor_name = authors.name
  FROM authors
  WHERE authors.id = courses.instructor_id;

-- 4. Remover colunas obsoletas de events
ALTER TABLE events DROP COLUMN IF EXISTS category_id;

-- 5. Remover colunas obsoletas de courses
ALTER TABLE courses DROP COLUMN IF EXISTS category_id;
ALTER TABLE courses DROP COLUMN IF EXISTS level;
ALTER TABLE courses DROP COLUMN IF EXISTS instructor_id;
