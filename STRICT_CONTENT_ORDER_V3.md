# Strict Lesson Content Order V3

The student lesson content sequence is fixed and must remain exactly:

1. What You’ll Learn
2. Video
3. PPT/PDF
4. Custom Material
5. Hands-on Lab
6. Test (5 topic-wise MCQs)
7. Assignment

Implementation:
- `WhatYouLearn` renders first.
- Video embed supports YouTube now and Google Drive video later.
- PPT/PDF uses the admin-controlled Google Drive embed.
- Custom Material follows the PPT/PDF section.
- Existing SQL / Colab / GitHub / Text Code labs are preserved and render next.
- The learning-experience renderer now exposes only the Test and Assignment stages after the labs. Legacy Visuals/Practice data may still be returned by the API but is not rendered in the strict student sequence.
- Lesson progress/completion remains below the learning sequence.
