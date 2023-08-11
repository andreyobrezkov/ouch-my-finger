CREATE TABLE app_public.video (
                                  id uuid NOT NULL,
                                  collection_parent_id uuid NOT NULL,
                                  season_parent_id uuid,
                                  section_parent_id uuid,
                                  next_video_id uuid,
                                  title text NOT NULL
);

CREATE TABLE app_public.season (
                                   id uuid NOT NULL,
                                   collection_parent_id uuid NOT NULL,
                                   title text NOT NULL
);
CREATE TABLE app_public.collection (
                                       id uuid NOT NULL,
                                       title text NOT NULL
);