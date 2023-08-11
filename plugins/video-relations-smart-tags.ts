import { gql, makeExtendSchemaPlugin } from "postgraphile/utils";

export const videoRelationsSmartTagsPlugin = makeExtendSchemaPlugin((build) => {
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
      extend type Video {
        nextVideo: Video
      }
    `,
    plans: {
      // sections: VideoSectionsConnection
      // VideoSectionsConnection:{
      //   sections($video) {
      //     const $sections = video.find({
      //       section_parent_id: $video.get("id"),
      //     });
      //     return connection($sections);
      //   },
      // },
      Video: { // Plan Key must match the type name
        nextVideo($video) {
          return video.get({
            id: $video.get("next_video_id"),
          });
        },
      },
    },
  };
});
