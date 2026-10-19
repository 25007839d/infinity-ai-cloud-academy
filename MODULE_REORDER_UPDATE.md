# Module Reordering Update

## Admin Course CMS

The Curriculum Builder now supports module sequence reordering without changing the existing course/module/lesson save model.

### Reorder methods
- Drag a module using the grip handle on the left of the module header.
- Use the **↑** and **↓** buttons for precise one-position moves.
- The current open module remains selected after a reorder.
- The changed order is persisted when **Save Course** is clicked.

### Backend compatibility
No database migration is required. The existing course save endpoint already writes each module's `display_order` from its position in the `curriculum` array. The frontend now changes that array order before the existing save request is submitted.

### Existing functionality preserved
- Add module
- Edit module name/description
- Delete module
- Add/edit/delete lessons
- Existing content, labs, assignments and SEO fields
- Existing Save Course flow

No `node_modules`, build output, or generated dependency directories are included in this source package.
