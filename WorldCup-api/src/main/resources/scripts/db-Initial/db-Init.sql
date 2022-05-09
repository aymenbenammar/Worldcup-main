--liquibase formatted sql
--changeset b2m:Init-01
INSERT INTO public.utilisateur(
    id, activated,code_pin, email, first_name, last_name, username, pwd_hash)
VALUES (1, true,false, 'admin@admin.com', 'Administrateur', 'Administrateur', 'admin', '$2a$10$mxEbGpgXxIyClLll/xQWX.5tOEq.BlOKMAAhRUqFUL5uNFjBF992u');