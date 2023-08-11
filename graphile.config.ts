// @ts-check
import { makePgService } from "@dataplan/pg/adaptors/pg";
import AmberPreset from "postgraphile/presets/amber";
import { makeV4Preset } from "postgraphile/presets/v4";
import { PostGraphileConnectionFilterPreset } from "postgraphile-plugin-connection-filter";
import { PgAggregatesPreset } from "@graphile/pg-aggregates";
import { PgManyToManyPreset } from "@graphile-contrib/pg-many-to-many";
import { PgSimplifyInflectionPreset } from "@graphile/simplify-inflection";
import {
  PgConnectionTotalCountPlugin,
  PgConnectionArgOrderByDefaultValuePlugin,
} from "postgraphile/graphile-build-pg";

import {
  collectionRelationsSmartTagsPlugin
} from './plugins/collection-relations-smart-tags.js';

import {seasonRelationsSmartTagsPlugin} from './plugins/season-relations-smart-tags.js';
import {videoRelationsSmartTagsPlugin} from './plugins/video-relations-smart-tags.js';


//import { PgAggregatesAddConnectionGroupedAggregatesPlugin } from "@graphile/pg-aggregates/dist/AddConnectionGroupedAggregatesPlugin";
//import { PgAggregatesAddConnectionAggregatesPlugin } from "@graphile/pg-aggregates/dist/AddConnectionAggregatesPlugin";
import { NodePlugin } from "graphile-build";
import path from "path";
// For configuration file details, see: https://postgraphile.org/postgraphile/next/config

/** @satisfies {GraphileConfig.Preset} */
const preset = {
  extends: [
    AmberPreset,
    makeV4Preset({
      /* Enter your V4 options here */
      graphiql: true,
      dynamicJson: true,
      exportGqlSchemaPath: "schema.graphql",
      graphiqlRoute: "/",
      simpleCollections: "omit",
      ignoreIndexes: false,
      allowExplain: true,
      skipPlugins: [
        PgConnectionArgOrderByDefaultValuePlugin,
        PgConnectionTotalCountPlugin,
        NodePlugin,
      ],
    }),
    PostGraphileConnectionFilterPreset,
    PgManyToManyPreset,
    PgAggregatesPreset,
    PgSimplifyInflectionPreset,
  ],
  pgServices: [
    makePgService({
      // Database connection string:
      connectionString:
          "postgres://postgres:postgres@localhost:5432/ouch_db",
      schemas: ["app_public"],
      pubsub: true,
    }),
  ],
  plugins: [
    collectionRelationsSmartTagsPlugin,
    seasonRelationsSmartTagsPlugin,
    videoRelationsSmartTagsPlugin
  ],
  grafserv: {
    port: 5678,
    websockets: true,
  },
  grafast: {
    explain: true,
  },
};

export default preset;
