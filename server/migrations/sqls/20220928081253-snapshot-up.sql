CREATE TABLE snapshot (
  id INTEGER PRIMARY KEY,
  batchid VARCHAR(4),
  stid UUID,
  e5 SMALLINT,
  e10 SMALLINT,
  diesel SMALLINT,
  date TIMESTAMP(0) WITH TIME ZONE,
  CONSTRAINT fk_gasstation FOREIGN KEY(stid) REFERENCES gasstations(id)
);
