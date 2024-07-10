import { v } from "convex/values";
import { action, query } from "./_generated/server";
import { embed } from "./notes";
import { api, internal } from "./_generated/api";
import { Doc } from "./_generated/dataModel";
import { hasOrgAccess } from "./documents";

export const searchAction = action({
  args: {
    search: v.string(),
    orgId: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const userId = (await ctx.auth.getUserIdentity())?.tokenIdentifier;
    if (!userId) {
      return null;
    }

    if (args.orgId) {
      const hasAccess = await ctx.runQuery(
        internal.memberships.hasOrgAccessQuery,
        {
          orgId: args.orgId,
        }
      );
      if (!hasAccess) {
        return null;
      }
    }

    const filter = args.orgId
      ? (q: any) => q.eq("orgId", args.orgId)
      : (q: any) => q.eq("tokenIdentifier", userId);

    const embedding = await embed(args.search);
    const noteResults = await ctx.vectorSearch("notes", "by_embedding", {
      vector: embedding,
      limit: 5,
      filter,
    });

    const documentResults = await ctx.vectorSearch(
      "documents",
      "by_embedding",
      {
        vector: embedding,
        limit: 5,
        filter,
      }
    );

    const records: (
      | { type: "notes"; score: number; record: Doc<"notes"> }
      | { type: "documents"; score: number; record: Doc<"documents"> }
    )[] = [];

    await Promise.all(
      noteResults
        .map(async (res) => {
          const note = await ctx.runQuery(api.notes.getNote, {
            noteId: res._id,
          });
          if (!note) {
            return;
          }
          records.push({
            record: note,
            score: res._score,
            type: "notes",
          });
          return records;
        })
        .filter(Boolean)
    );

    await Promise.all(
      documentResults
        .map(async (res) => {
          const document = await ctx.runQuery(api.documents.getDocument, {
            documentId: res._id,
          });
          if (!document) {
            return;
          }
          records.push({
            record: document,
            score: res._score,
            type: "documents",
          });
          return records;
        })
        .filter(Boolean)
    );

    records.sort((a, b) => b.score - a.score);

    return records;
  },
});
