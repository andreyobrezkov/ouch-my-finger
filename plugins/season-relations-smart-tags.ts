import { gql, makeExtendSchemaPlugin } from "postgraphile/utils";
export const seasonRelationsSmartTagsPlugin = makeExtendSchemaPlugin((build) => {
  const {
    sql,
    grafast: { connection },
    input: { pgRegistry },
  } = build;
  const { video } = pgRegistry.pgResources;
  if (!sql) throw new Error("sql is required");
  return {
    typeDefs: gql`
      extend type Season {
        episodes: VideosConnection
      }
    `,
    plans: {
      Season: {
        episodes($season) {
          const $videos = video.find({
            season_parent_id: $season.get("id"),
          });
          return connection($videos);
        },
      },
    },
  };
});
