-- Migration: change artwork_id and painting_id columns from integer to text
-- Required for UUID artwork references after migrating from hardcoded numeric IDs to Supabase UUIDs
--
-- Run this in your Supabase SQL editor before deploying the frontend migration.

ALTER TABLE saves ALTER COLUMN artwork_id TYPE text USING artwork_id::text;
ALTER TABLE downloads ALTER COLUMN painting_id TYPE text USING painting_id::text;
