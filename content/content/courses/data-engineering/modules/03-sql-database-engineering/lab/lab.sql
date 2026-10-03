-- SQL Lab: answer the questions in order.
-- Use the Academy SQL Lab practice database.
SELECT d.department_name, COUNT(*) AS employee_count, ROUND(AVG(e.salary),2) AS avg_salary
FROM employees e
JOIN departments d ON d.id=e.department_id
GROUP BY d.department_name
ORDER BY avg_salary DESC;
