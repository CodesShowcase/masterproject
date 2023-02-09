CREATE TYPE usertype AS ENUM ('admin', 'user');

CREATE TABLE secure (
  id SERIAL PRIMARY KEY,
  userid INTEGER NOT NULL UNIQUE,
  userlevel usertype NOT NULL default 'user',
  created TIMESTAMP(0) WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
  pending BOOLEAN NOT NULL DEFAULT true,
  suspended BOOLEAN NOT NULL DEFAULT false,
  CONSTRAINT fk_user FOREIGN KEY(userid) REFERENCES users(id)
);

INSERT INTO secure VALUES (1, 1, 'admin', '2022-12-01 00:00:01+01', false, false);

ALTER SEQUENCE secure_id_seq RESTART WITH 2;
