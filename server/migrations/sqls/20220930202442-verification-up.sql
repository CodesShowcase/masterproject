CREATE TYPE type AS ENUM ('email', 'password');

CREATE TABLE verification (
  id SERIAL PRIMARY KEY,
  userid INTEGER NOT NULL,
  type type NOT NULL,
  secret VARCHAR(120) NOT NULL,
  expires TIMESTAMP(0) WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP + INTERVAL '1' DAY,
  CONSTRAINT fk_userid FOREIGN KEY(userid) REFERENCES users(id)
);