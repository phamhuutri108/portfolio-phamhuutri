# Dad, Don't Lie Invitation D1 Setup

The invitation dashboard now reads and writes message visibility through:

```text
/api/invitation-message-visibility
```

Production needs a Cloudflare D1 binding named:

```text
DB
```

The API creates these tables automatically on first request:

```sql
CREATE TABLE IF NOT EXISTS invitation_message_settings (
    id INTEGER PRIMARY KEY CHECK (id = 1),
    default_show_real_message INTEGER NOT NULL DEFAULT 0,
    sample_message TEXT NOT NULL,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS invitation_message_overrides (
    slug TEXT PRIMARY KEY,
    show_real_message INTEGER NOT NULL CHECK (show_real_message IN (0, 1)),
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);
```

Optional environment variable:

```text
DASHBOARD_PASSWORD_HASH
```

If this is not set, the API uses the same password hash as the current dashboard.
