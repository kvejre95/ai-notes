import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
    users: defineTable({
        userName:v.string(),
        email:v.string(), 
        imageUrl:v.string(),
    }),
    filesData: defineTable({
        fileId:v.string(),
        storageId:v.string(),
        fileName:v.string(),
        fileUrl:v.string(),
        userId:v.string(),
    }),
    documents: defineTable({
        embedding: v.array(v.float64()),
        text: v.string(),
        metadata: v.optional(v.any()),
      }).vectorIndex("byEmbedding", {
        vectorField: "embedding",
        dimensions: 768,
      }),
      notes: defineTable({
        fileId: v.string(),
        notes: v.any(),
        userId: v.string()
      })
});