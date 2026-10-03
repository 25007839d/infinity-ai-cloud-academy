-- Databricks / Delta Lake practice
CREATE TABLE IF NOT EXISTS silver_employees
USING DELTA
AS SELECT * FROM bronze_employees WHERE 1=0;

-- Practice MERGE pattern
-- MERGE INTO silver_employees t USING updates s ON t.employee_id=s.employee_id ...
