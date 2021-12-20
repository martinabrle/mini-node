CREATE TABLE IF NOT EXISTS word (
    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY NOT NULL, 
    "term" VARCHAR(50) NOT NULL, 
    "explanation" TEXT NOT NULL,
    "formClass" VARCHAR(10),
    "createdAt" DATE DEFAULT NOW()::date,
    "updatedAt" DATE DEFAULT NOW()::date
);

CREATE TABLE IF NOT EXISTS inventory (
    "id" INT GENERATED ALWAYS AS IDENTITY NOT NULL PRIMARY KEY, 
    "wordId" INT NOT NULL, 
    "qty" DECIMAL NOT NULL,
    "createdAt" DATE DEFAULT NOW()::date,
    "updatedAt" DATE DEFAULT NOW()::date,
    CONSTRAINT fk_word_inventory FOREIGN KEY("wordId") REFERENCES word("id")
);

CREATE TABLE IF NOT EXISTS basket_line (
    "id" INT GENERATED ALWAYS AS IDENTITY NOT NULL PRIMARY KEY,
    "userId" VARCHAR(350) NOT NULL, 
    "wordId" INT NOT NULL, 
    "qty" DECIMAL NOT NULL,
    "createdAt" DATE DEFAULT NOW()::date,
    "updatedAt" DATE DEFAULT NOW()::date,
    CONSTRAINT fk_word_basket_line FOREIGN KEY("wordId") REFERENCES word("id")
);

INSERT INTO word ("term", "explanation", "formClass") VALUES ('absquatulate','to leave somewhere abruptly','verb') ON CONFLICT DO NOTHING;
INSERT INTO word ("term", "explanation", "formClass") VALUES ('canorous','melodious or resonant','adjective') ON CONFLICT DO NOTHING;
INSERT INTO word ("term", "explanation", "formClass") VALUES ('hallux','Anatomy: the big toe','noun') ON CONFLICT DO NOTHING;
INSERT INTO word ("term", "explanation", "formClass") VALUES ('kylie','Australien: a boomerang','noun') ON CONFLICT DO NOTHING;
INSERT INTO word ("term", "explanation", "formClass") VALUES ('omophagy','the eating of raw food, especially meat','') ON CONFLICT DO NOTHING;
INSERT INTO word ("term", "explanation", "formClass") VALUES ('rawky','foggy, damp, and cold','adjective') ON CONFLICT DO NOTHING;
INSERT INTO word ("term", "explanation", "formClass") VALUES ('serendipity','happy and unexpected discovery','noun') ON CONFLICT DO NOTHING;
INSERT INTO word ("term", "explanation", "formClass") VALUES ('gobbledygook','text riddled with official jargon and overly complicated sentence structures','noun') ON CONFLICT DO NOTHING;

INSERT INTO inventory ("wordId", "qty") VALUES (1,100) ON CONFLICT DO NOTHING;
INSERT INTO inventory ("wordId", "qty") VALUES (2,200) ON CONFLICT DO NOTHING;
INSERT INTO inventory ("wordId", "qty") VALUES (3,300) ON CONFLICT DO NOTHING;
INSERT INTO inventory ("wordId", "qty") VALUES (4,400) ON CONFLICT DO NOTHING;
INSERT INTO inventory ("wordId", "qty") VALUES (5,500) ON CONFLICT DO NOTHING;
INSERT INTO inventory ("wordId", "qty") VALUES (6,600) ON CONFLICT DO NOTHING;
INSERT INTO inventory ("wordId", "qty") VALUES (7,700) ON CONFLICT DO NOTHING;
INSERT INTO inventory ("wordId", "qty") VALUES (8,800) ON CONFLICT DO NOTHING;
