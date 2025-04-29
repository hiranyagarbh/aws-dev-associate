CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE public.answers (
    uuid UUID DEFAULT uuid_generate_v4 () PRIMARY KEY,
    question_uuid UUID NOT NULL,
    option CHAR(1) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
);

CREATE TABLE public.questions (
    uuid UUID DEFAULT uuid_generate_v4 () PRIMARY KEY,
    question TEXT NOT NULL,
    option_a TEXT NOT NULL,
    option_b TEXT NOT NULL,
    option_c TEXT NOT NULL,
    option_d TEXT NOT NULL,
    correct_option CHAR(1) NOT NULL
);
