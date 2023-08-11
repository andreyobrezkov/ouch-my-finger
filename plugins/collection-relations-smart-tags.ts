import { gql, makeExtendSchemaPlugin } from "postgraphile/utils";

export const collectionRelationsSmartTagsPlugin = makeExtendSchemaPlugin(
  (build) => {
    const {
      sql,
      grafast: { connection },
      input: { pgRegistry },
    } = build;
    const {
      video,
    } = pgRegistry.pgResources;
    if (!sql) throw new Error("sql is required");
    return {
      typeDefs: gql`
        extend type Collection {
          episodes: VideosConnection
        }
        
      `,
      plans: {
        Collection: {
          episodes($collection) {
            const $videos = video.find({
              collection_parent_id: $collection.get("id"),
            });
            return connection($videos);
          },

        },

      },
    };
  },
);
