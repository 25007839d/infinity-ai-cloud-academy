# Student Login + Course View Tracking V1

- Registration now requires a unique 10-digit mobile number.
- Admin > Students lists registered student details.
- Student detail shows mobile, email, registration/last login and courses viewed.
- Course detail views are recorded after authenticated login.
- Student Login button is available in the public navbar and mobile menu.

Run `db/STUDENT_COURSE_VIEW_MIGRATION.sql` once in the Academy MySQL database before testing course-view tracking. Existing users with NULL phone can remain; new registrations require phone.
