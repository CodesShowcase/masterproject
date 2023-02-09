CREATE TABLE weekly (
  timeframe TIMESTAMP(0) WITH TIME ZONE PRIMARY KEY,
  e5high SMALLINT,
  e5avg SMALLINT,
  e5low SMALLINT,
  e10high SMALLINT,
  e10avg SMALLINT,
  e10low SMALLINT,
  dieselhigh SMALLINT,
  dieselavg SMALLINT,
  diesellow SMALLINT
);
